use anyhow::Result;
use turbo_tasks::Vc;
use turbo_tasks_fs::File;
use turbopack_core::{
    asset::{Asset, AssetContent},
    chunk::Chunk,
    ident::AssetIdent,
    output::OutputAsset,
    source_map::{GenerateSourceMap, SourceMap},
};

use super::CssChunk;

/// Represents the source map of an css chunk.
#[turbo_tasks::value]
pub struct CssChunkSourceMapAsset {
    chunk: Vc<CssChunk>,
}

#[turbo_tasks::value_impl]
impl CssChunkSourceMapAsset {
    #[turbo_tasks::function]
    pub fn new(chunk: Vc<CssChunk>) -> Vc<Self> {
        CssChunkSourceMapAsset { chunk }.cell()
    }
}

#[turbo_tasks::value_impl]
impl OutputAsset for CssChunkSourceMapAsset {
    #[turbo_tasks::function]
    async fn ident(&self) -> Result<Vc<AssetIdent>> {
        Ok(AssetIdent::from_path(
            self.chunk.path().append(".map".to_string()),
        ))
    }
}

#[turbo_tasks::value_impl]
impl Asset for CssChunkSourceMapAsset {
    #[turbo_tasks::function]
    async fn content(&self) -> Result<Vc<AssetContent>> {
        let sm = if let Some(sm) = *self.chunk.generate_source_map().await? {
            sm
        } else {
            SourceMap::empty()
        };
        let sm = sm.to_rope().await?;
        Ok(AssetContent::file(File::from(sm).into()))
    }
}
