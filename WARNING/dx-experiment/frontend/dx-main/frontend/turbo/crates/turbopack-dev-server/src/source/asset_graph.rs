use std::{
    collections::{HashSet, VecDeque},
    iter::once,
};

use anyhow::Result;
use indexmap::{indexset, IndexMap, IndexSet};
use turbo_tasks::{Completion, State, TryJoinIterExt, Value, ValueToString, Vc};
use turbo_tasks_fs::FileSystemPath;
use turbopack_core::{
    asset::Asset,
    introspect::{output_asset::IntrospectableOutputAsset, Introspectable, IntrospectableChildren},
    output::{OutputAsset, OutputAssetsSet},
};

use super::{
    route_tree::{BaseSegment, RouteTree, RouteTrees, RouteType},
    ContentSource, ContentSourceContent, ContentSourceData, ContentSourceSideEffect,
    GetContentSourceContent,
};

#[turbo_tasks::value(transparent)]
struct OutputAssetsMap(IndexMap<String, Vc<Box<dyn OutputAsset>>>);

type ExpandedState = State<HashSet<String>>;

#[turbo_tasks::value(serialization = "none", eq = "manual", cell = "new")]
pub struct AssetGraphContentSource {
    root_path: Vc<FileSystemPath>,
    root_assets: Vc<OutputAssetsSet>,
    expanded: Option<ExpandedState>,
}

#[turbo_tasks::value_impl]
impl AssetGraphContentSource {
    /// Serves all assets references by root_asset.
    #[turbo_tasks::function]
    pub fn new_eager(
        root_path: Vc<FileSystemPath>,
        root_asset: Vc<Box<dyn OutputAsset>>,
    ) -> Vc<Self> {
        Self::cell(AssetGraphContentSource {
            root_path,
            root_assets: Vc::cell(indexset! { root_asset }),
            expanded: None,
        })
    }

    /// Serves all assets references by root_asset. Only serve references of an
    /// asset when it has served its content before.
    #[turbo_tasks::function]
    pub fn new_lazy(
        root_path: Vc<FileSystemPath>,
        root_asset: Vc<Box<dyn OutputAsset>>,
    ) -> Vc<Self> {
        Self::cell(AssetGraphContentSource {
            root_path,
            root_assets: Vc::cell(indexset! { root_asset }),
            expanded: Some(State::new(HashSet::new())),
        })
    }

    /// Serves all assets references by all root_assets.
    #[turbo_tasks::function]
    pub fn new_eager_multiple(
        root_path: Vc<FileSystemPath>,
        root_assets: Vc<OutputAssetsSet>,
    ) -> Vc<Self> {
        Self::cell(AssetGraphContentSource {
            root_path,
            root_assets,
            expanded: None,
        })
    }

    /// Serves all assets references by all root_assets. Only serve references
    /// of an asset when it has served its content before.
    #[turbo_tasks::function]
    pub fn new_lazy_multiple(
        root_path: Vc<FileSystemPath>,
        root_assets: Vc<OutputAssetsSet>,
    ) -> Vc<Self> {
        Self::cell(AssetGraphContentSource {
            root_path,
            root_assets,
            expanded: Some(State::new(HashSet::new())),
        })
    }

    #[turbo_tasks::function]
    async fn all_assets_map(self: Vc<Self>) -> Result<Vc<OutputAssetsMap>> {
        let this = self.await?;
        Ok(Vc::cell(
            expand(
                &*this.root_assets.await?,
                &*this.root_path.await?,
                this.expanded.as_ref(),
            )
            .await?,
        ))
    }
}

async fn expand(
    root_assets: &IndexSet<Vc<Box<dyn OutputAsset>>>,
    root_path: &FileSystemPath,
    expanded: Option<&ExpandedState>,
) -> Result<IndexMap<String, Vc<Box<dyn OutputAsset>>>> {
    let mut map = IndexMap::new();
    let mut assets = Vec::new();
    let mut queue = VecDeque::with_capacity(32);
    let mut assets_set = HashSet::new();
    let root_assets_with_path = root_assets
        .iter()
        .map(|&asset| async move {
            let path = asset.ident().path().await?;
            Ok((path, asset))
        })
        .try_join()
        .await?;

    if let Some(expanded) = &expanded {
        let expanded = expanded.get();
        for (path, root_asset) in root_assets_with_path.into_iter() {
            if let Some(sub_path) = root_path.get_path_to(&path) {
                let (sub_paths_buffer, sub_paths) = get_sub_paths(sub_path);
                let expanded = sub_paths_buffer
                    .iter()
                    .take(sub_paths)
                    .any(|sub_path| expanded.contains(sub_path));
                for sub_path in sub_paths_buffer.into_iter().take(sub_paths) {
                    assets.push((sub_path, root_asset));
                }
                assets_set.insert(root_asset);
                if expanded {
                    queue.push_back(root_asset.references());
                }
            }
        }
    } else {
        for (path, root_asset) in root_assets_with_path.into_iter() {
            if let Some(sub_path) = root_path.get_path_to(&path) {
                let (sub_paths_buffer, sub_paths) = get_sub_paths(sub_path);
                for sub_path in sub_paths_buffer.into_iter().take(sub_paths) {
                    assets.push((sub_path, root_asset));
                }
                queue.push_back(root_asset.references());
                assets_set.insert(root_asset);
            }
        }
    }

    while let Some(references) = queue.pop_front() {
        for asset in references.await?.iter() {
            if assets_set.insert(*asset) {
                let path = asset.ident().path().await?;
                if let Some(sub_path) = root_path.get_path_to(&path) {
                    let (sub_paths_buffer, sub_paths) = get_sub_paths(sub_path);
                    let expanded = if let Some(expanded) = &expanded {
                        let expanded = expanded.get();
                        sub_paths_buffer
                            .iter()
                            .take(sub_paths)
                            .any(|sub_path| expanded.contains(sub_path))
                    } else {
                        true
                    };
                    if expanded {
                        queue.push_back(asset.references());
                    }
                    for sub_path in sub_paths_buffer.into_iter().take(sub_paths) {
                        assets.push((sub_path, *asset));
                    }
                }
            }
        }
    }
    for (sub_path, asset) in assets {
        let asset = asset.resolve().await?;
        if sub_path == "index.html" {
            map.insert("".to_string(), asset);
        } else if let Some(p) = sub_path.strip_suffix("/index.html") {
            map.insert(p.to_string(), asset);
            map.insert(format!("{p}/"), asset);
        } else if let Some(p) = sub_path.strip_suffix(".html") {
            map.insert(p.to_string(), asset);
        }
        map.insert(sub_path, asset);
    }
    Ok(map)
}

fn get_sub_paths(sub_path: &str) -> ([String; 3], usize) {
    let sub_paths_buffer: [String; 3];
    let n = if sub_path == "index.html" {
        sub_paths_buffer = ["".to_string(), sub_path.to_string(), String::new()];
        2
    } else if let Some(p) = sub_path.strip_suffix("/index.html") {
        sub_paths_buffer = [p.to_string(), format!("{p}/"), sub_path.to_string()];
        3
    } else if let Some(p) = sub_path.strip_suffix(".html") {
        sub_paths_buffer = [p.to_string(), sub_path.to_string(), String::new()];
        2
    } else {
        sub_paths_buffer = [sub_path.to_string(), String::new(), String::new()];
        1
    };
    (sub_paths_buffer, n)
}

#[turbo_tasks::value_impl]
impl ContentSource for AssetGraphContentSource {
    #[turbo_tasks::function]
    async fn get_routes(self: Vc<Self>) -> Result<Vc<RouteTree>> {
        let assets = self.all_assets_map().strongly_consistent().await?;
        let mut paths = Vec::new();
        let routes = assets
            .iter()
            .map(|(path, asset)| {
                paths.push(path.as_str());
                RouteTree::new_route(
                    BaseSegment::from_static_pathname(path).collect(),
                    RouteType::Exact,
                    Vc::upcast(AssetGraphGetContentSourceContent::new(
                        self,
                        path.to_string(),
                        *asset,
                    )),
                )
            })
            .collect();
        Ok(Vc::<RouteTrees>::cell(routes).merge())
    }
}

#[turbo_tasks::value]
struct AssetGraphGetContentSourceContent {
    source: Vc<AssetGraphContentSource>,
    path: String,
    asset: Vc<Box<dyn OutputAsset>>,
}

#[turbo_tasks::value_impl]
impl AssetGraphGetContentSourceContent {
    #[turbo_tasks::function]
    pub fn new(
        source: Vc<AssetGraphContentSource>,
        path: String,
        asset: Vc<Box<dyn OutputAsset>>,
    ) -> Vc<Self> {
        Self::cell(AssetGraphGetContentSourceContent {
            source,
            path,
            asset,
        })
    }
}

#[turbo_tasks::value_impl]
impl GetContentSourceContent for AssetGraphGetContentSourceContent {
    #[turbo_tasks::function]
    async fn get(
        self: Vc<Self>,
        _path: String,
        _data: Value<ContentSourceData>,
    ) -> Result<Vc<ContentSourceContent>> {
        let this = self.await?;
        turbo_tasks::emit(Vc::upcast::<Box<dyn ContentSourceSideEffect>>(self));
        Ok(ContentSourceContent::static_content(
            this.asset.versioned_content(),
        ))
    }
}

#[turbo_tasks::value_impl]
impl ContentSourceSideEffect for AssetGraphGetContentSourceContent {
    #[turbo_tasks::function]
    async fn apply(&self) -> Result<Vc<Completion>> {
        let source = self.source.await?;

        if let Some(expanded) = &source.expanded {
            expanded.update_conditionally(|expanded| expanded.insert(self.path.to_string()));
        }
        Ok(Completion::new())
    }
}

#[turbo_tasks::function]
fn introspectable_type() -> Vc<String> {
    Vc::cell("asset graph content source".to_string())
}

#[turbo_tasks::value_impl]
impl Introspectable for AssetGraphContentSource {
    #[turbo_tasks::function]
    fn ty(&self) -> Vc<String> {
        introspectable_type()
    }

    #[turbo_tasks::function]
    fn title(&self) -> Vc<String> {
        self.root_path.to_string()
    }

    #[turbo_tasks::function]
    fn details(&self) -> Vc<String> {
        Vc::cell(if let Some(expanded) = &self.expanded {
            format!("{} assets expanded", expanded.get().len())
        } else {
            "eager".to_string()
        })
    }

    #[turbo_tasks::function]
    async fn children(self: Vc<Self>) -> Result<Vc<IntrospectableChildren>> {
        let this = self.await?;
        let key = Vc::cell("root".to_string());
        let inner_key = Vc::cell("inner".to_string());
        let expanded_key = Vc::cell("expanded".to_string());

        let root_assets = this.root_assets.await?;
        let root_asset_children = root_assets
            .iter()
            .map(|&asset| (key, IntrospectableOutputAsset::new(Vc::upcast(asset))));

        let expanded_assets = self.all_assets_map().await?;
        let expanded_asset_children = expanded_assets
            .values()
            .filter(|a| !root_assets.contains(*a))
            .map(|asset| {
                (
                    inner_key,
                    IntrospectableOutputAsset::new(Vc::upcast(*asset)),
                )
            });

        Ok(Vc::cell(
            root_asset_children
                .chain(expanded_asset_children)
                .chain(once((expanded_key, Vc::upcast(FullyExpaned(self).cell()))))
                .collect(),
        ))
    }
}

#[turbo_tasks::function]
fn fully_expaned_introspectable_type() -> Vc<String> {
    Vc::cell("fully expanded asset graph content source".to_string())
}

#[turbo_tasks::value]
struct FullyExpaned(Vc<AssetGraphContentSource>);

#[turbo_tasks::value_impl]
impl Introspectable for FullyExpaned {
    #[turbo_tasks::function]
    fn ty(&self) -> Vc<String> {
        fully_expaned_introspectable_type()
    }

    #[turbo_tasks::function]
    async fn title(&self) -> Result<Vc<String>> {
        Ok(self.0.await?.root_path.to_string())
    }

    #[turbo_tasks::function]
    async fn children(&self) -> Result<Vc<IntrospectableChildren>> {
        let source = self.0.await?;
        let key = Vc::cell("asset".to_string());

        let expanded_assets =
            expand(&*source.root_assets.await?, &*source.root_path.await?, None).await?;
        let children = expanded_assets
            .iter()
            .map(|(_k, &v)| (key, IntrospectableOutputAsset::new(v)))
            .collect();

        Ok(Vc::cell(children))
    }
}
