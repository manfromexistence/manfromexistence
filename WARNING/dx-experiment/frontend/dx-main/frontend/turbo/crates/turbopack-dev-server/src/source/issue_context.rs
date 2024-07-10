use anyhow::Result;
use turbo_tasks::{Value, Vc};
use turbo_tasks_fs::FileSystemPath;
use turbopack_core::{
    introspect::{Introspectable, IntrospectableChildren},
    issue::IssueDescriptionExt,
};

use super::{
    route_tree::{MapGetContentSourceContent, RouteTree},
    ContentSource, ContentSourceContent, ContentSourceData, ContentSourceDataVary, ContentSources,
    GetContentSourceContent,
};

#[turbo_tasks::value]
pub struct IssueFilePathContentSource {
    file_path: Option<Vc<FileSystemPath>>,
    description: String,
    source: Vc<Box<dyn ContentSource>>,
}

#[turbo_tasks::value_impl]
impl IssueFilePathContentSource {
    #[turbo_tasks::function]
    pub fn new_file_path(
        file_path: Vc<FileSystemPath>,
        description: String,
        source: Vc<Box<dyn ContentSource>>,
    ) -> Vc<Self> {
        IssueFilePathContentSource {
            file_path: Some(file_path),
            description,
            source,
        }
        .cell()
    }

    #[turbo_tasks::function]
    pub fn new_description(description: String, source: Vc<Box<dyn ContentSource>>) -> Vc<Self> {
        IssueFilePathContentSource {
            file_path: None,
            description,
            source,
        }
        .cell()
    }
}

#[turbo_tasks::value_impl]
impl ContentSource for IssueFilePathContentSource {
    #[turbo_tasks::function]
    async fn get_routes(self: Vc<Self>) -> Result<Vc<RouteTree>> {
        let this = self.await?;
        let routes = this
            .source
            .get_routes()
            .issue_file_path(this.file_path, &this.description)
            .await?;
        Ok(routes.map_routes(Vc::upcast(
            IssueContextContentSourceMapper { source: self }.cell(),
        )))
    }

    #[turbo_tasks::function]
    fn get_children(&self) -> Vc<ContentSources> {
        Vc::cell(vec![self.source])
    }
}

#[turbo_tasks::value]
struct IssueContextContentSourceMapper {
    source: Vc<IssueFilePathContentSource>,
}

#[turbo_tasks::value_impl]
impl MapGetContentSourceContent for IssueContextContentSourceMapper {
    #[turbo_tasks::function]
    fn map_get_content(
        &self,
        get_content: Vc<Box<dyn GetContentSourceContent>>,
    ) -> Vc<Box<dyn GetContentSourceContent>> {
        Vc::upcast(
            IssueContextGetContentSourceContent {
                get_content,
                source: self.source,
            }
            .cell(),
        )
    }
}

#[turbo_tasks::value]
struct IssueContextGetContentSourceContent {
    get_content: Vc<Box<dyn GetContentSourceContent>>,
    source: Vc<IssueFilePathContentSource>,
}

#[turbo_tasks::value_impl]
impl GetContentSourceContent for IssueContextGetContentSourceContent {
    #[turbo_tasks::function]
    async fn vary(&self) -> Result<Vc<ContentSourceDataVary>> {
        let source = self.source.await?;
        let result = self
            .get_content
            .vary()
            .issue_file_path(source.file_path, &source.description)
            .await?;
        Ok(result)
    }

    #[turbo_tasks::function]
    async fn get(
        &self,
        path: String,
        data: Value<ContentSourceData>,
    ) -> Result<Vc<ContentSourceContent>> {
        let source = self.source.await?;
        let result = self
            .get_content
            .get(path, data)
            .issue_file_path(source.file_path, &source.description)
            .await?;
        Ok(result)
    }
}

#[turbo_tasks::value_impl]
impl Introspectable for IssueFilePathContentSource {
    #[turbo_tasks::function]
    async fn ty(&self) -> Result<Vc<String>> {
        Ok(
            if let Some(source) =
                Vc::try_resolve_sidecast::<Box<dyn Introspectable>>(self.source).await?
            {
                source.ty()
            } else {
                Vc::cell("IssueContextContentSource".to_string())
            },
        )
    }

    #[turbo_tasks::function]
    async fn title(&self) -> Result<Vc<String>> {
        Ok(
            if let Some(source) =
                Vc::try_resolve_sidecast::<Box<dyn Introspectable>>(self.source).await?
            {
                let title = source.title().await?;
                Vc::cell(format!("{}: {}", self.description, title))
            } else {
                Vc::cell(self.description.clone())
            },
        )
    }

    #[turbo_tasks::function]
    async fn details(&self) -> Result<Vc<String>> {
        Ok(
            if let Some(source) =
                Vc::try_resolve_sidecast::<Box<dyn Introspectable>>(self.source).await?
            {
                source.details()
            } else {
                Vc::cell(String::new())
            },
        )
    }

    #[turbo_tasks::function]
    async fn children(&self) -> Result<Vc<IntrospectableChildren>> {
        Ok(
            if let Some(source) =
                Vc::try_resolve_sidecast::<Box<dyn Introspectable>>(self.source).await?
            {
                source.children()
            } else {
                Vc::cell(Default::default())
            },
        )
    }
}
