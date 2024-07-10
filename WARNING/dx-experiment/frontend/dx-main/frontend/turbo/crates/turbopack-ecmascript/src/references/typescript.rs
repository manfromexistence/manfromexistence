use anyhow::Result;
use turbo_tasks::{Value, ValueToString, Vc};
use turbo_tasks_fs::FileSystemPath;
use turbopack_core::{
    context::AssetContext,
    file_source::FileSource,
    reference::ModuleReference,
    reference_type::{ReferenceType, TypeScriptReferenceSubType},
    resolve::{origin::ResolveOrigin, parse::Request, ModuleResolveResult},
};
use turbopack_resolve::typescript::type_resolve;

use crate::typescript::TsConfigModuleAsset;

#[turbo_tasks::value]
#[derive(Hash, Clone, Debug)]
pub struct TsConfigReference {
    pub tsconfig: Vc<FileSystemPath>,
    pub origin: Vc<Box<dyn ResolveOrigin>>,
}

#[turbo_tasks::value_impl]
impl TsConfigReference {
    #[turbo_tasks::function]
    pub fn new(origin: Vc<Box<dyn ResolveOrigin>>, tsconfig: Vc<FileSystemPath>) -> Vc<Self> {
        Self::cell(TsConfigReference { tsconfig, origin })
    }
}

#[turbo_tasks::value_impl]
impl ModuleReference for TsConfigReference {
    #[turbo_tasks::function]
    fn resolve_reference(&self) -> Vc<ModuleResolveResult> {
        ModuleResolveResult::module(Vc::upcast(TsConfigModuleAsset::new(
            self.origin,
            Vc::upcast(FileSource::new(self.tsconfig)),
        )))
        .into()
    }
}

#[turbo_tasks::value_impl]
impl ValueToString for TsConfigReference {
    #[turbo_tasks::function]
    async fn to_string(&self) -> Result<Vc<String>> {
        Ok(Vc::cell(format!(
            "tsconfig {}",
            self.tsconfig.to_string().await?,
        )))
    }
}

#[turbo_tasks::value]
#[derive(Hash, Debug)]
pub struct TsReferencePathAssetReference {
    pub origin: Vc<Box<dyn ResolveOrigin>>,
    pub path: String,
}

#[turbo_tasks::value_impl]
impl TsReferencePathAssetReference {
    #[turbo_tasks::function]
    pub fn new(origin: Vc<Box<dyn ResolveOrigin>>, path: String) -> Vc<Self> {
        Self::cell(TsReferencePathAssetReference { origin, path })
    }
}

#[turbo_tasks::value_impl]
impl ModuleReference for TsReferencePathAssetReference {
    #[turbo_tasks::function]
    async fn resolve_reference(&self) -> Result<Vc<ModuleResolveResult>> {
        Ok(
            if let Some(path) = &*self
                .origin
                .origin_path()
                .parent()
                .try_join(self.path.clone())
                .await?
            {
                let module = self
                    .origin
                    .asset_context()
                    .process(
                        Vc::upcast(FileSource::new(*path)),
                        Value::new(ReferenceType::TypeScript(
                            TypeScriptReferenceSubType::Undefined,
                        )),
                    )
                    .module();
                ModuleResolveResult::module(module).cell()
            } else {
                ModuleResolveResult::unresolveable().cell()
            },
        )
    }
}

#[turbo_tasks::value_impl]
impl ValueToString for TsReferencePathAssetReference {
    #[turbo_tasks::function]
    async fn to_string(&self) -> Result<Vc<String>> {
        Ok(Vc::cell(format!(
            "typescript reference path comment {}",
            self.path,
        )))
    }
}

#[turbo_tasks::value]
#[derive(Hash, Debug)]
pub struct TsReferenceTypeAssetReference {
    pub origin: Vc<Box<dyn ResolveOrigin>>,
    pub module: String,
}

#[turbo_tasks::value_impl]
impl TsReferenceTypeAssetReference {
    #[turbo_tasks::function]
    pub fn new(origin: Vc<Box<dyn ResolveOrigin>>, module: String) -> Vc<Self> {
        Self::cell(TsReferenceTypeAssetReference { origin, module })
    }
}

#[turbo_tasks::value_impl]
impl ModuleReference for TsReferenceTypeAssetReference {
    #[turbo_tasks::function]
    fn resolve_reference(&self) -> Vc<ModuleResolveResult> {
        type_resolve(
            self.origin,
            Request::module(
                self.module.clone(),
                Value::new("".to_string().into()),
                Vc::<String>::default(),
            ),
        )
    }
}

#[turbo_tasks::value_impl]
impl ValueToString for TsReferenceTypeAssetReference {
    #[turbo_tasks::function]
    async fn to_string(&self) -> Result<Vc<String>> {
        Ok(Vc::cell(format!(
            "typescript reference type comment {}",
            self.module,
        )))
    }
}
