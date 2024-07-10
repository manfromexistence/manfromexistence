use anyhow::Result;
use turbo_tasks::{TryJoinIterExt, Vc};
use turbopack_core::introspect::{Introspectable, IntrospectableChildren};

use super::{
    route_tree::{RouteTree, RouteTrees},
    ContentSource,
};
use crate::source::ContentSources;

/// Combines multiple [ContentSource]s by trying all content sources in order.
/// The content source which responds with the most specific response (that is
/// not a [ContentSourceContent::NotFound]) will be returned.
#[turbo_tasks::value(shared)]
pub struct CombinedContentSource {
    pub sources: Vec<Vc<Box<dyn ContentSource>>>,
}

impl CombinedContentSource {
    pub fn new(sources: Vec<Vc<Box<dyn ContentSource>>>) -> Vc<Self> {
        CombinedContentSource { sources }.cell()
    }
}

#[turbo_tasks::value_impl]
impl ContentSource for CombinedContentSource {
    #[turbo_tasks::function]
    fn get_routes(&self) -> Vc<RouteTree> {
        let all_routes = self.sources.iter().map(|s| s.get_routes()).collect();
        Vc::<RouteTrees>::cell(all_routes).merge()
    }

    #[turbo_tasks::function]
    fn get_children(&self) -> Vc<ContentSources> {
        Vc::cell(self.sources.clone())
    }
}

#[turbo_tasks::value_impl]
impl Introspectable for CombinedContentSource {
    #[turbo_tasks::function]
    fn ty(&self) -> Vc<String> {
        Vc::cell("combined content source".to_string())
    }

    #[turbo_tasks::function]
    async fn title(&self) -> Result<Vc<String>> {
        let titles = self
            .sources
            .iter()
            .map(|&source| async move {
                Ok(
                    if let Some(source) =
                        Vc::try_resolve_sidecast::<Box<dyn Introspectable>>(source).await?
                    {
                        Some(source.title().await?)
                    } else {
                        None
                    },
                )
            })
            .try_join()
            .await?;
        let mut titles = titles.into_iter().flatten().collect::<Vec<_>>();
        titles.sort();
        const NUMBER_OF_TITLES_TO_DISPLAY: usize = 5;
        let mut titles = titles
            .iter()
            .map(|t| t.as_str())
            .filter(|t| !t.is_empty())
            .take(NUMBER_OF_TITLES_TO_DISPLAY + 1)
            .collect::<Vec<_>>();
        if titles.len() > NUMBER_OF_TITLES_TO_DISPLAY {
            titles[NUMBER_OF_TITLES_TO_DISPLAY] = "...";
        }
        Ok(Vc::cell(titles.join(", ")))
    }

    #[turbo_tasks::function]
    async fn children(&self) -> Result<Vc<IntrospectableChildren>> {
        let source = Vc::cell("source".to_string());
        Ok(Vc::cell(
            self.sources
                .iter()
                .copied()
                .map(|s| async move {
                    Ok(Vc::try_resolve_sidecast::<Box<dyn Introspectable>>(s).await?)
                })
                .try_join()
                .await?
                .into_iter()
                .flatten()
                .map(|i| (source, i))
                .collect(),
        ))
    }
}
