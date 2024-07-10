use std::{sync::Arc, time::Duration};

use anyhow::{bail, Result};
use mime::TEXT_HTML_UTF_8;
use turbo_tasks::{get_invalidator, TurboTasks, TurboTasksBackendApi, Value, Vc};
use turbo_tasks_fs::File;
use turbo_tasks_memory::{
    stats::{ReferenceType, Stats},
    viz, MemoryBackend,
};
use turbopack_core::{asset::AssetContent, version::VersionedContentExt};
use turbopack_dev_server::source::{
    route_tree::{BaseSegment, RouteTree, RouteTrees, RouteType},
    ContentSource, ContentSourceContent, ContentSourceData, ContentSourceDataFilter,
    ContentSourceDataVary, GetContentSourceContent,
};

#[turbo_tasks::value(serialization = "none", eq = "manual", cell = "new", into = "new")]
pub struct TurboTasksSource {
    #[turbo_tasks(debug_ignore, trace_ignore)]
    turbo_tasks: Arc<TurboTasks<MemoryBackend>>,
}

impl TurboTasksSource {
    pub fn new(turbo_tasks: Arc<TurboTasks<MemoryBackend>>) -> Vc<Self> {
        Self::cell(TurboTasksSource { turbo_tasks })
    }
}

const INVALIDATION_INTERVAL: Duration = Duration::from_secs(3);

#[turbo_tasks::value_impl]
impl ContentSource for TurboTasksSource {
    #[turbo_tasks::function]
    fn get_routes(self: Vc<Self>) -> Vc<RouteTree> {
        Vc::<RouteTrees>::cell(vec![
            RouteTree::new_route(
                vec![BaseSegment::Static("graph".to_string())],
                RouteType::Exact,
                Vc::upcast(self),
            ),
            RouteTree::new_route(
                vec![BaseSegment::Static("call-graph".to_string())],
                RouteType::Exact,
                Vc::upcast(self),
            ),
            RouteTree::new_route(
                vec![BaseSegment::Static("table".to_string())],
                RouteType::Exact,
                Vc::upcast(self),
            ),
            RouteTree::new_route(
                vec![BaseSegment::Static("reset".to_string())],
                RouteType::Exact,
                Vc::upcast(self),
            ),
        ])
        .merge()
    }
}

#[turbo_tasks::value_impl]
impl GetContentSourceContent for TurboTasksSource {
    #[turbo_tasks::function]
    fn vary(&self) -> Vc<ContentSourceDataVary> {
        ContentSourceDataVary {
            query: Some(ContentSourceDataFilter::All),
            ..Default::default()
        }
        .cell()
    }

    #[turbo_tasks::function]
    async fn get(
        self: Vc<Self>,
        path: String,
        data: Value<ContentSourceData>,
    ) -> Result<Vc<ContentSourceContent>> {
        let this = self.await?;
        let tt = &this.turbo_tasks;
        let invalidator = get_invalidator();
        tokio::spawn({
            async move {
                tokio::time::sleep(INVALIDATION_INTERVAL).await;
                invalidator.invalidate();
            }
        });
        let html = match path.as_str() {
            "graph" => {
                let mut stats = Stats::new();
                let b = tt.backend();
                b.with_all_cached_tasks(|task| {
                    stats.add_id(b, task);
                });
                let tree = stats.treeify(ReferenceType::Dependency);
                let graph = viz::graph::visualize_stats_tree(
                    tree,
                    ReferenceType::Dependency,
                    tt.stats_type(),
                );
                viz::graph::wrap_html(&graph)
            }
            "call-graph" => {
                let mut stats = Stats::new();
                let b = tt.backend();
                b.with_all_cached_tasks(|task| {
                    stats.add_id(b, task);
                });
                let tree = stats.treeify(ReferenceType::Child);
                let graph =
                    viz::graph::visualize_stats_tree(tree, ReferenceType::Child, tt.stats_type());
                viz::graph::wrap_html(&graph)
            }
            "table" => {
                let Some(query) = &data.query else {
                    bail!("Missing query");
                };
                let mut stats = Stats::new();
                let b = tt.backend();
                let include_unloaded = query.contains_key("unloaded");
                b.with_all_cached_tasks(|task| {
                    stats.add_id_conditional(b, task, |_, info| include_unloaded || !info.unloaded);
                });
                let tree = stats.treeify(ReferenceType::Dependency);
                let table = viz::table::create_table(tree, tt.stats_type());
                viz::table::wrap_html(&table)
            }
            "reset" => {
                let b = tt.backend();
                b.with_all_cached_tasks(|task| {
                    b.with_task(task, |task| task.reset_stats());
                });
                "Done".to_string()
            }
            _ => bail!("Unknown path: {}", path),
        };
        Ok(ContentSourceContent::static_content(
            AssetContent::file(File::from(html).with_content_type(TEXT_HTML_UTF_8).into())
                .versioned(),
        ))
    }
}
