use anyhow::{bail, Context, Result};
use indexmap::indexmap;
use indoc::formatdoc;
use serde::{Deserialize, Serialize};
use turbo_tasks::{
    trace::TraceRawVcs, Completion, Completions, TaskInput, TryFlatJoinIterExt, Value, Vc,
};
use turbo_tasks_bytes::stream::SingleValue;
use turbo_tasks_fs::{
    json::parse_json_with_source_context, File, FileContent, FileSystemEntryType, FileSystemPath,
};
use turbopack_core::{
    asset::{Asset, AssetContent},
    changed::any_content_changed_of_module,
    context::{AssetContext, ProcessResult},
    file_source::FileSource,
    ident::AssetIdent,
    issue::{
        Issue, IssueDescriptionExt, IssueExt, IssueSeverity, IssueStage, OptionStyledString,
        StyledString,
    },
    reference_type::{EntryReferenceSubType, InnerAssets, ReferenceType},
    resolve::{find_context_file, options::ImportMapping, FindContextFileResult},
    source::Source,
    source_transform::SourceTransform,
    virtual_source::VirtualSource,
};

use super::{
    util::{emitted_assets_to_virtual_sources, EmittedAsset},
    webpack::WebpackLoaderContext,
};
use crate::{
    embed_js::embed_file, execution_context::ExecutionContext,
    transforms::webpack::evaluate_webpack_loader,
};

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
#[turbo_tasks::value(transparent, serialization = "custom")]
struct PostCssProcessingResult {
    css: String,
    map: Option<String>,
    #[turbo_tasks(trace_ignore)]
    assets: Option<Vec<EmittedAsset>>,
}

#[derive(
    Default, Copy, Clone, PartialEq, Eq, Debug, TraceRawVcs, Serialize, Deserialize, TaskInput,
)]
pub enum PostCssConfigLocation {
    #[default]
    ProjectPath,
    ProjectPathOrLocalPath,
}

#[turbo_tasks::value(shared)]
#[derive(Clone, Default)]
pub struct PostCssTransformOptions {
    pub postcss_package: Option<Vc<ImportMapping>>,
    pub config_location: PostCssConfigLocation,
    pub placeholder_for_future_extensions: u8,
}

#[turbo_tasks::function]
fn postcss_configs() -> Vc<Vec<String>> {
    Vc::cell(
        [
            ".postcssrc",
            ".postcssrc.json",
            ".postcssrc.yaml",
            ".postcssrc.yml",
            ".postcssrc.js",
            ".postcssrc.mjs",
            ".postcssrc.cjs",
            ".config/postcssrc",
            ".config/postcssrc.json",
            ".config/postcssrc.yaml",
            ".config/postcssrc.yml",
            ".config/postcssrc.js",
            ".config/postcssrc.mjs",
            ".config/postcssrc.cjs",
            "postcss.config.js",
            "postcss.config.mjs",
            "postcss.config.cjs",
            "postcss.config.json",
        ]
        .into_iter()
        .map(ToOwned::to_owned)
        .collect(),
    )
}

#[turbo_tasks::value]
pub struct PostCssTransform {
    evaluate_context: Vc<Box<dyn AssetContext>>,
    execution_context: Vc<ExecutionContext>,
    config_location: PostCssConfigLocation,
}

#[turbo_tasks::value_impl]
impl PostCssTransform {
    #[turbo_tasks::function]
    pub fn new(
        evaluate_context: Vc<Box<dyn AssetContext>>,
        execution_context: Vc<ExecutionContext>,
        config_location: PostCssConfigLocation,
    ) -> Vc<Self> {
        PostCssTransform {
            evaluate_context,
            execution_context,
            config_location,
        }
        .cell()
    }
}

#[turbo_tasks::value_impl]
impl SourceTransform for PostCssTransform {
    #[turbo_tasks::function]
    fn transform(&self, source: Vc<Box<dyn Source>>) -> Vc<Box<dyn Source>> {
        Vc::upcast(
            PostCssTransformedAsset {
                evaluate_context: self.evaluate_context,
                execution_context: self.execution_context,
                config_location: self.config_location,
                source,
            }
            .cell(),
        )
    }
}

#[turbo_tasks::value]
struct PostCssTransformedAsset {
    evaluate_context: Vc<Box<dyn AssetContext>>,
    execution_context: Vc<ExecutionContext>,
    config_location: PostCssConfigLocation,
    source: Vc<Box<dyn Source>>,
}

#[turbo_tasks::value_impl]
impl Source for PostCssTransformedAsset {
    #[turbo_tasks::function]
    fn ident(&self) -> Vc<AssetIdent> {
        self.source.ident()
    }
}

#[turbo_tasks::value_impl]
impl Asset for PostCssTransformedAsset {
    #[turbo_tasks::function]
    async fn content(self: Vc<Self>) -> Result<Vc<AssetContent>> {
        let this = self.await?;
        Ok(self
            .process()
            .issue_file_path(this.source.ident().path(), "PostCSS processing")
            .await?
            .await?
            .content)
    }
}

#[turbo_tasks::value]
struct ProcessPostCssResult {
    content: Vc<AssetContent>,
    assets: Vec<Vc<VirtualSource>>,
}

#[turbo_tasks::function]
async fn config_changed(
    asset_context: Vc<Box<dyn AssetContext>>,
    postcss_config_path: Vc<FileSystemPath>,
) -> Result<Vc<Completion>> {
    let config_asset = asset_context
        .process(
            Vc::upcast(FileSource::new(postcss_config_path)),
            Value::new(ReferenceType::Internal(InnerAssets::empty())),
        )
        .module();

    Ok(Vc::<Completions>::cell(vec![
        any_content_changed_of_module(config_asset),
        extra_configs_changed(asset_context, postcss_config_path),
    ])
    .completed())
}

#[turbo_tasks::function]
async fn extra_configs_changed(
    asset_context: Vc<Box<dyn AssetContext>>,
    postcss_config_path: Vc<FileSystemPath>,
) -> Result<Vc<Completion>> {
    let parent_path = postcss_config_path.parent();

    let config_paths = [
        parent_path.join("tailwind.config.js".to_string()),
        parent_path.join("tailwind.config.ts".to_string()),
    ];

    let configs = config_paths
        .into_iter()
        .map(|path| async move {
            Ok(
                if matches!(&*path.get_type().await?, FileSystemEntryType::File) {
                    match *asset_context
                        .process(
                            Vc::upcast(FileSource::new(path)),
                            Value::new(ReferenceType::Internal(InnerAssets::empty())),
                        )
                        .await?
                    {
                        ProcessResult::Module(module) => {
                            Some(any_content_changed_of_module(module))
                        }
                        ProcessResult::Ignore => None,
                    }
                } else {
                    None
                },
            )
        })
        .try_flat_join()
        .await?;

    Ok(Vc::<Completions>::cell(configs).completed())
}

#[turbo_tasks::function]
pub(crate) async fn config_loader_source(
    project_path: Vc<FileSystemPath>,
    postcss_config_path: Vc<FileSystemPath>,
) -> Result<Vc<Box<dyn Source>>> {
    let postcss_config_path_value = &*postcss_config_path.await?;

    // We can only load js files with `import()`.
    if !postcss_config_path_value.path.ends_with(".js") {
        return Ok(Vc::upcast(FileSource::new(postcss_config_path)));
    }

    let Some(config_path) = project_path
        .await?
        .get_relative_path_to(postcss_config_path_value)
    else {
        bail!("Unable to get relative path to postcss config");
    };

    // We don't want to bundle the config file, so we load it with `import()`.
    // Bundling would break the ability to use `require.resolve` in the config file.
    let code = formatdoc! {
        r#"
            const configPath = `${{process.cwd()}}/{config_path}`;

            const mod = await __turbopack_external_import__(configPath);

            export default mod.default ?? mod;
        "#,
        config_path = config_path,
    };

    Ok(Vc::upcast(VirtualSource::new(
        postcss_config_path.append("_.loader.mjs".to_string()),
        AssetContent::file(File::from(code).into()),
    )))
}

#[turbo_tasks::function]
async fn postcss_executor(
    asset_context: Vc<Box<dyn AssetContext>>,
    project_path: Vc<FileSystemPath>,
    postcss_config_path: Vc<FileSystemPath>,
) -> Result<Vc<ProcessResult>> {
    let config_asset = asset_context
        .process(
            config_loader_source(project_path, postcss_config_path),
            Value::new(ReferenceType::Entry(EntryReferenceSubType::Undefined)),
        )
        .module();

    Ok(asset_context.process(
        Vc::upcast(VirtualSource::new(
            postcss_config_path.join("transform.ts".to_string()),
            AssetContent::File(embed_file("transforms/postcss.ts".to_string())).cell(),
        )),
        Value::new(ReferenceType::Internal(Vc::cell(indexmap! {
            "CONFIG".to_string() => config_asset
        }))),
    ))
}

async fn find_config_in_location(
    project_path: Vc<FileSystemPath>,
    location: PostCssConfigLocation,
    source: Vc<Box<dyn Source>>,
) -> Result<Option<Vc<FileSystemPath>>> {
    if let FindContextFileResult::Found(config_path, _) =
        *find_context_file(project_path, postcss_configs()).await?
    {
        return Ok(Some(config_path));
    }

    if matches!(location, PostCssConfigLocation::ProjectPathOrLocalPath) {
        if let FindContextFileResult::Found(config_path, _) =
            *find_context_file(source.ident().path().parent(), postcss_configs()).await?
        {
            return Ok(Some(config_path));
        }
    }

    Ok(None)
}

#[turbo_tasks::value_impl]
impl PostCssTransformedAsset {
    #[turbo_tasks::function]
    async fn process(self: Vc<Self>) -> Result<Vc<ProcessPostCssResult>> {
        let this = self.await?;
        let ExecutionContext {
            project_path,
            chunking_context,
            env,
        } = *this.execution_context.await?;

        // For this postcss transform, there is no gaurantee that looking up for the
        // source path will arrives specific project config for the postcss.
        // i.e, this is possible
        // - root
        //  - node_modules
        //     - somepkg/(some.module.css, postcss.config.js) // this could be symlinked
        //       local, or actual remote pkg or anything
        //  - packages // root of workspace pkgs
        //     - pkg1/(postcss.config.js) // The actual config we're looking for
        //
        // We look for the config in the project path first, then the source path
        let Some(config_path) =
            find_config_in_location(project_path, this.config_location, this.source).await?
        else {
            PostCssTransformIssue {
                source: this.source.ident().path(),
                title: "PostCSS transform skipped".to_string(),
                description: "Unable to find PostCSS config".to_string(),
                severity: IssueSeverity::Warning.cell(),
            }
            .cell()
            .emit();

            return Ok(ProcessPostCssResult {
                content: this.source.content(),
                assets: Vec::new(),
            }
            .cell());
        };

        let source_content = this.source.content();
        let AssetContent::File(file) = *source_content.await? else {
            bail!("PostCSS transform only support transforming files");
        };
        let FileContent::Content(content) = &*file.await? else {
            return Ok(ProcessPostCssResult {
                content: AssetContent::File(FileContent::NotFound.cell()).cell(),
                assets: Vec::new(),
            }
            .cell());
        };
        let content = content.content().to_str()?;
        let evaluate_context = this.evaluate_context;

        // This invalidates the transform when the config changes.
        let config_changed = config_changed(evaluate_context, config_path);

        let postcss_executor =
            postcss_executor(evaluate_context, project_path, config_path).module();
        let css_fs_path = this.source.ident().path().await?;
        let css_path = css_fs_path.path.as_str();

        let config_value = evaluate_webpack_loader(WebpackLoaderContext {
            module_asset: postcss_executor,
            cwd: project_path,
            env,
            context_ident_for_issue: this.source.ident(),
            asset_context: evaluate_context,
            chunking_context,
            resolve_options_context: None,
            args: vec![Vc::cell(content.into()), Vc::cell(css_path.into())],
            additional_invalidation: config_changed,
        })
        .await?;

        let SingleValue::Single(val) = config_value.try_into_single().await? else {
            // An error happened, which has already been converted into an issue.
            return Ok(ProcessPostCssResult {
                content: AssetContent::File(FileContent::NotFound.cell()).cell(),
                assets: Vec::new(),
            }
            .cell());
        };
        let processed_css: PostCssProcessingResult = parse_json_with_source_context(val.to_str()?)
            .context("Unable to deserializate response from PostCSS transform operation")?;

        // TODO handle SourceMap
        let file = File::from(processed_css.css);
        let assets = emitted_assets_to_virtual_sources(processed_css.assets);
        let content = AssetContent::File(FileContent::Content(file).cell()).cell();
        Ok(ProcessPostCssResult { content, assets }.cell())
    }
}

#[turbo_tasks::value]
struct PostCssTransformIssue {
    source: Vc<FileSystemPath>,
    description: String,
    severity: Vc<IssueSeverity>,
    title: String,
}

#[turbo_tasks::value_impl]
impl Issue for PostCssTransformIssue {
    #[turbo_tasks::function]
    fn file_path(&self) -> Vc<FileSystemPath> {
        self.source
    }

    #[turbo_tasks::function]
    fn title(&self) -> Vc<StyledString> {
        StyledString::Text(self.title.to_string()).cell()
    }

    #[turbo_tasks::function]
    fn description(&self) -> Vc<OptionStyledString> {
        Vc::cell(Some(
            StyledString::Text(self.description.to_string()).cell(),
        ))
    }

    #[turbo_tasks::function]
    fn severity(&self) -> Vc<IssueSeverity> {
        self.severity
    }

    #[turbo_tasks::function]
    fn stage(&self) -> Vc<IssueStage> {
        IssueStage::Transform.cell()
    }
}
