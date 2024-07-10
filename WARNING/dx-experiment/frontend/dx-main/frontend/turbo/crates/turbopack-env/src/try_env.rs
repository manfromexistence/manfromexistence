use anyhow::Result;
use turbo_tasks::Vc;
use turbo_tasks_env::{DotenvProcessEnv, EnvMap, ProcessEnv};
use turbo_tasks_fs::FileSystemPath;
use turbopack_core::issue::{IssueExt, StyledString};

use crate::ProcessEnvIssue;

#[turbo_tasks::value]
pub struct TryDotenvProcessEnv {
    dotenv: Vc<DotenvProcessEnv>,
    prior: Vc<Box<dyn ProcessEnv>>,
    path: Vc<FileSystemPath>,
}

#[turbo_tasks::value_impl]
impl TryDotenvProcessEnv {
    #[turbo_tasks::function]
    pub fn new(prior: Vc<Box<dyn ProcessEnv>>, path: Vc<FileSystemPath>) -> Vc<Self> {
        let dotenv = DotenvProcessEnv::new(Some(prior), path);
        TryDotenvProcessEnv {
            dotenv,
            prior,
            path,
        }
        .cell()
    }
}

#[turbo_tasks::value_impl]
impl ProcessEnv for TryDotenvProcessEnv {
    #[turbo_tasks::function]
    async fn read_all(&self) -> Result<Vc<EnvMap>> {
        let dotenv = self.dotenv;
        let prior = dotenv.read_prior();

        // Ensure prior succeeds. If it doesn't, then we don't want to attempt to read
        // the dotenv file (and potentially emit an Issue), just trust that the prior
        // will have emitted its own.
        prior.await?;

        let vars = dotenv.read_all_with_prior(prior);
        match vars.await {
            Ok(_) => Ok(vars),
            Err(e) => {
                // If parsing the dotenv file fails (but getting the prior value didn't), then
                // we want to emit an Issue and fall back to the prior's read.
                ProcessEnvIssue {
                    path: self.path,
                    // read_all_with_prior will wrap a current error with a context containing the
                    // failing file, which we don't really care about (we report the filepath as the
                    // Issue context, not the description). So extract the real error.
                    description: StyledString::Text(e.root_cause().to_string()).cell(),
                }
                .cell()
                .emit();
                Ok(prior)
            }
        }
    }
}
