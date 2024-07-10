use anyhow::Result;
use turbo_tasks::{Completion, Vc};
use turbo_tasks_fs::{
    FileContent, FileJsonContent, FileLinesContent, FileSystemPath, LinkContent, LinkType,
};

use crate::version::{VersionedAssetContent, VersionedContent};

/// An asset. It also forms a graph when following [Asset::references].
#[turbo_tasks::value_trait]
pub trait Asset {
    /// The content of the [Asset].
    fn content(self: Vc<Self>) -> Vc<AssetContent>;

    /// The content of the [Asset] alongside its version.
    async fn versioned_content(self: Vc<Self>) -> Result<Vc<Box<dyn VersionedContent>>> {
        Ok(Vc::upcast(VersionedAssetContent::new(self.content())))
    }
}

#[turbo_tasks::value(shared)]
#[derive(Clone)]
pub enum AssetContent {
    File(Vc<FileContent>),
    // for the relative link, the target is raw value read from the link
    // for the absolute link, the target is stripped of the root path while reading
    // See [LinkContent::Link] for more details.
    Redirect { target: String, link_type: LinkType },
}

#[turbo_tasks::value_impl]
impl AssetContent {
    #[turbo_tasks::function]
    pub fn file(file: Vc<FileContent>) -> Vc<Self> {
        AssetContent::File(file).cell()
    }

    #[turbo_tasks::function]
    pub async fn parse_json(self: Vc<Self>) -> Result<Vc<FileJsonContent>> {
        let this = self.await?;
        match &*this {
            AssetContent::File(content) => Ok(content.parse_json()),
            AssetContent::Redirect { .. } => {
                Ok(FileJsonContent::unparseable("a redirect can't be parsed as json").cell())
            }
        }
    }

    #[turbo_tasks::function]
    pub async fn file_content(self: Vc<Self>) -> Result<Vc<FileContent>> {
        let this = self.await?;
        match &*this {
            AssetContent::File(content) => Ok(*content),
            AssetContent::Redirect { .. } => Ok(FileContent::NotFound.cell()),
        }
    }

    #[turbo_tasks::function]
    pub async fn lines(self: Vc<Self>) -> Result<Vc<FileLinesContent>> {
        let this = self.await?;
        match &*this {
            AssetContent::File(content) => Ok(content.lines()),
            AssetContent::Redirect { .. } => Ok(FileLinesContent::Unparseable.cell()),
        }
    }

    #[turbo_tasks::function]
    pub async fn parse_json_with_comments(self: Vc<Self>) -> Result<Vc<FileJsonContent>> {
        let this = self.await?;
        match &*this {
            AssetContent::File(content) => Ok(content.parse_json_with_comments()),
            AssetContent::Redirect { .. } => {
                Ok(FileJsonContent::unparseable("a redirect can't be parsed as json").cell())
            }
        }
    }

    #[turbo_tasks::function]
    pub async fn write(self: Vc<Self>, path: Vc<FileSystemPath>) -> Result<Vc<Completion>> {
        let this = self.await?;
        Ok(match &*this {
            AssetContent::File(file) => path.write(*file),
            AssetContent::Redirect { target, link_type } => path.write_link(
                LinkContent::Link {
                    target: target.clone(),
                    link_type: *link_type,
                }
                .cell(),
            ),
        })
    }
}
