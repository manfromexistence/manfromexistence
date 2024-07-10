use anyhow::Result;
use either::Either;
use turbo_tasks::{ValueToString, Vc};
use turbo_tasks_fs::FileSystemPath;
use turbopack_core::{
    file_source::FileSource,
    raw_module::RawModule,
    reference::ModuleReference,
    resolve::{
        pattern::{read_matches, Pattern, PatternMatch},
        ModuleResolveResult, RequestKey,
    },
    source::Source,
};

#[turbo_tasks::value]
#[derive(Hash, Clone, Debug)]
pub struct PackageJsonReference {
    pub package_json: Vc<FileSystemPath>,
}

#[turbo_tasks::value_impl]
impl PackageJsonReference {
    #[turbo_tasks::function]
    pub fn new(package_json: Vc<FileSystemPath>) -> Vc<Self> {
        Self::cell(PackageJsonReference { package_json })
    }
}

#[turbo_tasks::value_impl]
impl ModuleReference for PackageJsonReference {
    #[turbo_tasks::function]
    fn resolve_reference(&self) -> Vc<ModuleResolveResult> {
        ModuleResolveResult::module(Vc::upcast(RawModule::new(Vc::upcast(FileSource::new(
            self.package_json,
        )))))
        .cell()
    }
}

#[turbo_tasks::value_impl]
impl ValueToString for PackageJsonReference {
    #[turbo_tasks::function]
    async fn to_string(&self) -> Result<Vc<String>> {
        Ok(Vc::cell(format!(
            "package.json {}",
            self.package_json.to_string().await?,
        )))
    }
}

#[turbo_tasks::value]
#[derive(Hash, Debug)]
pub struct DirAssetReference {
    pub source: Vc<Box<dyn Source>>,
    pub path: Vc<Pattern>,
}

#[turbo_tasks::value_impl]
impl DirAssetReference {
    #[turbo_tasks::function]
    pub fn new(source: Vc<Box<dyn Source>>, path: Vc<Pattern>) -> Vc<Self> {
        Self::cell(DirAssetReference { source, path })
    }
}

#[turbo_tasks::function]
async fn resolve_reference_from_dir(
    parent_path: Vc<FileSystemPath>,
    path: Vc<Pattern>,
) -> Result<Vc<ModuleResolveResult>> {
    let path_ref = path.await?;
    let (abs_path, rel_path) = path_ref.split_could_match("/ROOT/");
    let matches = match (abs_path, rel_path) {
        (Some(abs_path), Some(rel_path)) => Either::Right(
            read_matches(
                parent_path.root().resolve().await?,
                "/ROOT/".to_string(),
                true,
                Pattern::new(abs_path.or_any_nested_file()),
            )
            .await?
            .into_iter()
            .chain(
                read_matches(
                    parent_path,
                    "".to_string(),
                    true,
                    Pattern::new(rel_path.or_any_nested_file()),
                )
                .await?
                .into_iter(),
            ),
        ),
        (Some(abs_path), None) => Either::Left(
            // absolute path only
            read_matches(
                parent_path.root().resolve().await?,
                "/ROOT/".to_string(),
                true,
                Pattern::new(abs_path.or_any_nested_file()),
            )
            .await?
            .into_iter(),
        ),
        (None, Some(rel_path)) => Either::Left(
            // relative path only
            read_matches(
                parent_path,
                "".to_string(),
                true,
                Pattern::new(rel_path.or_any_nested_file()),
            )
            .await?
            .into_iter(),
        ),
        (None, None) => return Ok(ModuleResolveResult::unresolveable().cell()),
    };
    let mut affecting_sources = Vec::new();
    let mut results = Vec::new();
    for pat_match in matches {
        match pat_match {
            PatternMatch::File(matched_path, file) => {
                let realpath = file.realpath_with_links().await?;
                for &symlink in &realpath.symlinks {
                    affecting_sources.push(Vc::upcast(FileSource::new(symlink)));
                }
                results.push((
                    RequestKey::new(matched_path.clone()),
                    Vc::upcast(RawModule::new(Vc::upcast(FileSource::new(realpath.path)))),
                ));
            }
            PatternMatch::Directory(..) => {}
        }
    }
    Ok(ModuleResolveResult::modules_with_affecting_sources(results, affecting_sources).cell())
}

#[turbo_tasks::value_impl]
impl ModuleReference for DirAssetReference {
    #[turbo_tasks::function]
    async fn resolve_reference(&self) -> Result<Vc<ModuleResolveResult>> {
        let parent_path = self.source.ident().path().parent();
        Ok(resolve_reference_from_dir(
            parent_path.resolve().await?,
            self.path,
        ))
    }
}

#[turbo_tasks::value_impl]
impl ValueToString for DirAssetReference {
    #[turbo_tasks::function]
    async fn to_string(&self) -> Result<Vc<String>> {
        Ok(Vc::cell(format!(
            "directory assets {}",
            self.path.to_string().await?,
        )))
    }
}
