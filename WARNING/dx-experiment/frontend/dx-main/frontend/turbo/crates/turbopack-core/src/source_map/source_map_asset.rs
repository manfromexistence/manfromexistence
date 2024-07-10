use anyhow::{bail, Result};
use indexmap::IndexSet;
use turbo_tasks::{ValueToString, Vc};
use turbo_tasks_fs::File;

use crate::{
    asset::{Asset, AssetContent},
    ident::AssetIdent,
    introspect::{Introspectable, IntrospectableChildren},
    output::OutputAsset,
    source_map::{GenerateSourceMap, SourceMap},
};

/// Represents the source map of an ecmascript asset.
#[turbo_tasks::value]
pub struct SourceMapAsset {
    asset: Vc<Box<dyn OutputAsset>>,
}

#[turbo_tasks::value_impl]
impl SourceMapAsset {
    #[turbo_tasks::function]
    pub fn new(asset: Vc<Box<dyn OutputAsset>>) -> Vc<Self> {
        SourceMapAsset { asset }.cell()
    }
}

#[turbo_tasks::value_impl]
impl OutputAsset for SourceMapAsset {
    #[turbo_tasks::function]
    async fn ident(&self) -> Result<Vc<AssetIdent>> {
        // NOTE(alexkirsz) We used to include the asset's version id in the path,
        // but this caused `all_assets_map` to be recomputed on every change.
        Ok(AssetIdent::from_path(
            self.asset.ident().path().append(".map".to_string()),
        ))
    }
}

#[turbo_tasks::value_impl]
impl Asset for SourceMapAsset {
    #[turbo_tasks::function]
    async fn content(&self) -> Result<Vc<AssetContent>> {
        let Some(generate_source_map) =
            Vc::try_resolve_sidecast::<Box<dyn GenerateSourceMap>>(self.asset).await?
        else {
            bail!("asset does not support generating source maps")
        };
        let sm = if let Some(sm) = &*generate_source_map.generate_source_map().await? {
            *sm
        } else {
            SourceMap::empty()
        };
        let sm = sm.to_rope().await?;
        Ok(AssetContent::file(File::from(sm).into()))
    }
}

#[turbo_tasks::function]
fn introspectable_type() -> Vc<String> {
    Vc::cell("source map".to_string())
}

#[turbo_tasks::function]
fn introspectable_details() -> Vc<String> {
    Vc::cell("source map of an asset".to_string())
}

#[turbo_tasks::value_impl]
impl Introspectable for SourceMapAsset {
    #[turbo_tasks::function]
    fn ty(&self) -> Vc<String> {
        introspectable_type()
    }

    #[turbo_tasks::function]
    fn title(self: Vc<Self>) -> Vc<String> {
        self.ident().to_string()
    }

    #[turbo_tasks::function]
    fn details(&self) -> Vc<String> {
        introspectable_details()
    }

    #[turbo_tasks::function]
    async fn children(&self) -> Result<Vc<IntrospectableChildren>> {
        let mut children = IndexSet::new();
        if let Some(asset) = Vc::try_resolve_sidecast::<Box<dyn Introspectable>>(self.asset).await?
        {
            children.insert((Vc::cell("asset".to_string()), asset));
        }
        Ok(Vc::cell(children))
    }
}
