use anyhow::Result;
use async_trait::async_trait;
use swc_core::ecma::{ast::Program, transforms::base::resolver, visit::VisitMutWith};
use turbo_tasks::Vc;
use turbopack_ecmascript::{CustomTransformer, TransformContext};

use super::{is_client_module, server_to_client_proxy::create_proxy_module};

#[derive(Debug)]
pub struct ClientDirectiveTransformer {
    transition_name: Vc<String>,
}

impl ClientDirectiveTransformer {
    pub fn new(transition_name: Vc<String>) -> Self {
        Self { transition_name }
    }
}

#[async_trait]
impl CustomTransformer for ClientDirectiveTransformer {
    async fn transform(&self, program: &mut Program, ctx: &TransformContext<'_>) -> Result<()> {
        if is_client_module(program) {
            let transition_name = &*self.transition_name.await?;
            *program = create_proxy_module(transition_name, &format!("./{}", ctx.file_name_str));
            program.visit_mut_with(&mut resolver(
                ctx.unresolved_mark,
                ctx.top_level_mark,
                false,
            ));
        }

        Ok(())
    }
}
