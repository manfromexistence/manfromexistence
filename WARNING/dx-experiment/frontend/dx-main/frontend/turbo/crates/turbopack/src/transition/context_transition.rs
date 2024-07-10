use anyhow::Result;
use turbo_tasks::Vc;
use turbopack_core::compile_time_info::CompileTimeInfo;
use turbopack_resolve::resolve_options_context::ResolveOptionsContext;

use crate::{module_options::ModuleOptionsContext, transition::Transition};

/// A transition that only affects the asset context.
#[turbo_tasks::value(shared)]
pub struct ContextTransition {
    compile_time_info: Vc<CompileTimeInfo>,
    module_options_context: Vc<ModuleOptionsContext>,
    resolve_options_context: Vc<ResolveOptionsContext>,
    layer: Vc<String>,
}

#[turbo_tasks::value_impl]
impl ContextTransition {
    #[turbo_tasks::function]
    pub async fn new(
        compile_time_info: Vc<CompileTimeInfo>,
        module_options_context: Vc<ModuleOptionsContext>,
        resolve_options_context: Vc<ResolveOptionsContext>,
        layer: Vc<String>,
    ) -> Result<Vc<ContextTransition>> {
        Ok(ContextTransition {
            module_options_context,
            resolve_options_context,
            compile_time_info,
            layer,
        }
        .cell())
    }
}

#[turbo_tasks::value_impl]
impl Transition for ContextTransition {
    #[turbo_tasks::function]
    fn process_compile_time_info(
        &self,
        _compile_time_info: Vc<CompileTimeInfo>,
    ) -> Vc<CompileTimeInfo> {
        self.compile_time_info
    }

    #[turbo_tasks::function]
    fn process_layer(&self, _layer: Vc<String>) -> Vc<String> {
        self.layer
    }

    #[turbo_tasks::function]
    fn process_module_options_context(
        &self,
        _context: Vc<ModuleOptionsContext>,
    ) -> Vc<ModuleOptionsContext> {
        self.module_options_context
    }

    #[turbo_tasks::function]
    fn process_resolve_options_context(
        &self,
        _context: Vc<ResolveOptionsContext>,
    ) -> Vc<ResolveOptionsContext> {
        self.resolve_options_context
    }
}
