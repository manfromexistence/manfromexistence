use anyhow::{anyhow, bail, Result};
use async_stream::try_stream as generator;
use futures::{
    channel::mpsc::{unbounded, UnboundedSender},
    pin_mut, SinkExt, StreamExt, TryStreamExt,
};
use parking_lot::Mutex;
use turbo_tasks::{duration_span, mark_finished, util::SharedError, RawVc, ValueToString, Vc};
use turbo_tasks_bytes::{Bytes, Stream};
use turbo_tasks_env::ProcessEnv;
use turbo_tasks_fs::FileSystemPath;
use turbopack_core::{
    chunk::{ChunkingContext, EvaluatableAsset, EvaluatableAssets},
    error::PrettyPrintError,
    issue::{IssueExt, StyledString},
    module::Module,
};
use turbopack_dev_server::source::{Body, ProxyResult};

use super::{
    issue::RenderingIssue, RenderData, RenderProxyIncomingMessage, RenderProxyOutgoingMessage,
    ResponseHeaders,
};
use crate::{
    get_intermediate_asset, get_renderer_pool, pool::NodeJsOperation,
    render::error_page::error_html, source_map::trace_stack,
};

/// Renders a module as static HTML in a node.js process.
#[turbo_tasks::function]
pub async fn render_proxy(
    cwd: Vc<FileSystemPath>,
    env: Vc<Box<dyn ProcessEnv>>,
    path: Vc<FileSystemPath>,
    module: Vc<Box<dyn EvaluatableAsset>>,
    runtime_entries: Vc<EvaluatableAssets>,
    chunking_context: Vc<Box<dyn ChunkingContext>>,
    intermediate_output_path: Vc<FileSystemPath>,
    output_root: Vc<FileSystemPath>,
    project_dir: Vc<FileSystemPath>,
    data: Vc<RenderData>,
    body: Vc<Body>,
    debug: bool,
) -> Result<Vc<ProxyResult>> {
    let render = render_stream(
        cwd,
        env,
        path,
        module,
        runtime_entries,
        chunking_context,
        intermediate_output_path,
        output_root,
        project_dir,
        data,
        body,
        debug,
    )
    .await?;

    let mut stream = render.read();
    let first = match stream.try_next().await? {
        Some(f) => f,
        None => {
            // If an Error was received first, then it would have been
            // transformed into a proxy err error response.
            bail!("did not receive response from render");
        }
    };

    let RenderItem::Headers(data) = first else {
        bail!("did not receive headers from render");
    };

    let body = Body::from_stream(stream.map(|item| match item {
        Ok(RenderItem::BodyChunk(b)) => Ok(b),
        Ok(v) => Err(SharedError::new(anyhow!(
            "unexpected render item: {:#?}",
            v
        ))),
        Err(e) => Err(e),
    }));
    let result = ProxyResult {
        status: data.status,
        headers: data.headers,
        body,
    };

    Ok(result.cell())
}

async fn proxy_error(
    path: Vc<FileSystemPath>,
    error: anyhow::Error,
    operation: Option<NodeJsOperation>,
) -> Result<(u16, String)> {
    let message = format!("{}", PrettyPrintError(&error));

    let status = match operation {
        Some(operation) => Some(operation.wait_or_kill().await?),
        None => None,
    };

    let mut details = vec![];
    if let Some(status) = status {
        details.push(format!("status: {status}"));
    }

    let status_code = 500;
    let body = error_html(
        status_code,
        "An error occurred while proxying the request to Node.js".to_string(),
        format!("{message}\n\n{}", details.join("\n")),
    )
    .await?
    .clone_value();

    RenderingIssue {
        file_path: path,
        message: StyledString::Text(message).cell(),
        status: status.and_then(|status| status.code()),
    }
    .cell()
    .emit();

    Ok((status_code, body))
}

#[derive(Clone, Debug)]
#[turbo_tasks::value]
enum RenderItem {
    Headers(ResponseHeaders),
    BodyChunk(Bytes),
}

type RenderItemResult = Result<RenderItem, SharedError>;

#[turbo_tasks::value(eq = "manual", cell = "new", serialization = "none")]
struct RenderStreamSender {
    #[turbo_tasks(trace_ignore, debug_ignore)]
    get: Box<dyn Fn() -> UnboundedSender<RenderItemResult> + Send + Sync>,
}

#[turbo_tasks::value(transparent)]
struct RenderStream(#[turbo_tasks(trace_ignore)] Stream<RenderItemResult>);

#[turbo_tasks::function]
fn render_stream(
    cwd: Vc<FileSystemPath>,
    env: Vc<Box<dyn ProcessEnv>>,
    path: Vc<FileSystemPath>,
    module: Vc<Box<dyn EvaluatableAsset>>,
    runtime_entries: Vc<EvaluatableAssets>,
    chunking_context: Vc<Box<dyn ChunkingContext>>,
    intermediate_output_path: Vc<FileSystemPath>,
    output_root: Vc<FileSystemPath>,
    project_dir: Vc<FileSystemPath>,
    data: Vc<RenderData>,
    body: Vc<Body>,
    debug: bool,
) -> Vc<RenderStream> {
    // Note the following code uses some hacks to create a child task that produces
    // a stream that is returned by this task.

    // We create a new cell in this task, which will be updated from the
    // [render_stream_internal] task.
    let cell = turbo_tasks::macro_helpers::find_cell_by_type(*RENDERSTREAM_VALUE_TYPE_ID);

    // We initialize the cell with a stream that is open, but has no values.
    // The first [render_stream_internal] pipe call will pick up that stream.
    let (sender, receiver) = unbounded();
    cell.update_shared(RenderStream(Stream::new_open(vec![], Box::new(receiver))));
    let initial = Mutex::new(Some(sender));

    // run the evaluation as side effect
    let _ = render_stream_internal(
        cwd,
        env,
        path,
        module,
        runtime_entries,
        chunking_context,
        intermediate_output_path,
        output_root,
        project_dir,
        data,
        body,
        RenderStreamSender {
            get: Box::new(move || {
                if let Some(sender) = initial.lock().take() {
                    sender
                } else {
                    // In cases when only [render_stream_internal] is (re)executed, we need to
                    // update the old stream with a new value.
                    let (sender, receiver) = unbounded();
                    cell.update_shared(RenderStream(Stream::new_open(vec![], Box::new(receiver))));
                    sender
                }
            }),
        }
        .cell(),
        debug,
    );

    let raw: RawVc = cell.into();
    raw.into()
}

#[turbo_tasks::function]
async fn render_stream_internal(
    cwd: Vc<FileSystemPath>,
    env: Vc<Box<dyn ProcessEnv>>,
    path: Vc<FileSystemPath>,
    module: Vc<Box<dyn EvaluatableAsset>>,
    runtime_entries: Vc<EvaluatableAssets>,
    chunking_context: Vc<Box<dyn ChunkingContext>>,
    intermediate_output_path: Vc<FileSystemPath>,
    output_root: Vc<FileSystemPath>,
    project_dir: Vc<FileSystemPath>,
    data: Vc<RenderData>,
    body: Vc<Body>,
    sender: Vc<RenderStreamSender>,
    debug: bool,
) -> Result<Vc<()>> {
    mark_finished();
    let Ok(sender) = sender.await else {
        // Impossible to handle the error in a good way.
        return Ok(Default::default());
    };

    let stream = generator! {
        let intermediate_asset = get_intermediate_asset(
            chunking_context,
            module,
            runtime_entries,
        );
        let pool = get_renderer_pool(
            cwd,
            env,
            intermediate_asset,
            intermediate_output_path,
            output_root,
            project_dir,
            debug,
        );

        // Read this strongly consistent, since we don't want to run inconsistent
        // node.js code.
        let pool = pool.strongly_consistent().await?;
        let data = data.await?;
        let mut operation = pool.operation().await?;

        // First, send the render data.
        operation
            .send(RenderProxyOutgoingMessage::Headers { data: &data })
            .await?;
        // Then, send the binary body in chunks.
        let mut body = body.await?.read();
        while let Some(data) = body.next().await {
            operation
                .send(RenderProxyOutgoingMessage::BodyChunk { data: &data.unwrap() })
                .await?;
        }
        operation.send(RenderProxyOutgoingMessage::BodyEnd).await?;

        let entry = module.ident().to_string().await?;
        let guard = duration_span!("Node.js api execution", entry = display(entry));

        match operation.recv().await? {
            RenderProxyIncomingMessage::Headers { data } => yield RenderItem::Headers(data),
            RenderProxyIncomingMessage::Error(error) => {
                drop(guard);
                // If we don't get headers, then something is very wrong. Instead, we send down a
                // 500 proxy error as if it were the proper result.
                let trace = trace_stack(
                    error,
                    intermediate_asset,
                    intermediate_output_path,
                    project_dir
                )
                .await?;
                let (status, body) =  proxy_error(path, anyhow!("error rendering: {}", trace), Some(operation)).await?;
                yield RenderItem::Headers(ResponseHeaders {
                    status,
                    headers: vec![(
                        "content-type".to_string(),
                        "text/html; charset=utf-8".to_string(),
                    )],
                });
                yield RenderItem::BodyChunk(body.into());
                return;
            }
            v => {
                drop(guard);
                Err(anyhow!("unexpected message during rendering: {:#?}", v))?;
                return;
            },
        };

        loop {
            match operation.recv().await? {
                RenderProxyIncomingMessage::BodyChunk { data } => {
                    yield RenderItem::BodyChunk(data.into());
                }
                RenderProxyIncomingMessage::BodyEnd => break,
                RenderProxyIncomingMessage::Error(error) => {
                    drop(guard);
                    // We have already started to send a result, so we can't change the
                    // headers/body to a proxy error.
                    operation.disallow_reuse();
                    let trace =
                        trace_stack(error, intermediate_asset, intermediate_output_path, project_dir).await?;
                    Err(anyhow!("error during streaming render: {}", trace))?;
                    return;
                }
                v => {
                    drop(guard);
                    Err(anyhow!("unexpected message during rendering: {:#?}", v))?;
                    return;
                },
            }
        }
        drop(guard);
    };

    let mut sender = (sender.get)();
    pin_mut!(stream);
    while let Some(value) = stream.next().await {
        if sender.send(value).await.is_err() {
            return Ok(Default::default());
        }
        if sender.flush().await.is_err() {
            return Ok(Default::default());
        }
    }

    Ok(Default::default())
}
