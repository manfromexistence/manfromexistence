use anyhow::Result;
use indexmap::indexmap;
use turbo_tasks::Vc;
use turbo_tasks_env::{CommandLineProcessEnv, CustomProcessEnv, ProcessEnv};
use turbo_tasks_fs::FileSystemPath;

use crate::TryDotenvProcessEnv;

/// Loads a series of dotenv files according to the precedence rules set by
/// https://nextjs.org/docs/basic-features/environment-variables#environment-variable-load-order
#[turbo_tasks::function]
pub async fn load_env(project_path: Vc<FileSystemPath>) -> Result<Vc<Box<dyn ProcessEnv>>> {
    let env: Vc<Box<dyn ProcessEnv>> = Vc::upcast(CommandLineProcessEnv::new());

    let node_env = env.read("NODE_ENV".to_string()).await?;
    let node_env = node_env.as_deref().unwrap_or("development");

    let env = Vc::upcast(CustomProcessEnv::new(
        env,
        Vc::cell(indexmap! {
            "NODE_ENV".to_string() => node_env.to_string(),
        }),
    ));

    let files = [
        Some(format!(".env.{node_env}.local")),
        if node_env == "test" {
            None
        } else {
            Some(".env.local".into())
        },
        Some(format!(".env.{node_env}")),
        Some(".env".into()),
    ]
    .into_iter()
    .flatten();

    let env = files.fold(env, |prior, f| {
        let path = project_path.join(f);
        Vc::upcast(TryDotenvProcessEnv::new(prior, path))
    });

    Ok(env)
}
