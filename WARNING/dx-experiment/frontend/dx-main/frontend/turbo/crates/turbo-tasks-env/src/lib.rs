#![feature(arbitrary_self_types)]

mod command_line;
mod custom;
mod dotenv;
mod filter;

use std::{env, sync::Mutex};

use anyhow::Result;
use indexmap::IndexMap;
use turbo_tasks::Vc;

pub use self::{
    command_line::CommandLineProcessEnv, custom::CustomProcessEnv, dotenv::DotenvProcessEnv,
    filter::FilterProcessEnv,
};

#[turbo_tasks::value(transparent)]
pub struct EnvMap(#[turbo_tasks(trace_ignore)] IndexMap<String, String>);

#[turbo_tasks::value_impl]
impl EnvMap {
    #[turbo_tasks::function]
    pub fn empty() -> Vc<Self> {
        EnvMap(IndexMap::new()).cell()
    }
}

#[turbo_tasks::value_impl]
impl ProcessEnv for EnvMap {
    #[turbo_tasks::function]
    async fn read_all(self: Vc<Self>) -> Result<Vc<EnvMap>> {
        Ok(self)
    }

    #[turbo_tasks::function]
    async fn read(self: Vc<Self>, name: String) -> Vc<Option<String>> {
        case_insensitive_read(self, name)
    }
}

#[turbo_tasks::value_trait]
pub trait ProcessEnv {
    // TODO SECURITY: From security perspective it's not good that we read *all* env
    // vars into the cache. This might store secrects into the persistent cache
    // which we want to avoid.
    // Instead we should use only `read_prefix` to read all env vars with a specific
    // prefix.
    /// Reads all env variables into a Map
    fn read_all(self: Vc<Self>) -> Vc<EnvMap>;

    /// Reads a single env variable. Ignores casing.
    fn read(self: Vc<Self>, name: String) -> Vc<Option<String>> {
        case_insensitive_read(self.read_all(), name)
    }
}

pub fn sorted_env_vars() -> IndexMap<String, String> {
    let mut vars = env::vars().collect::<IndexMap<_, _>>();
    vars.sort_keys();
    vars
}

#[turbo_tasks::function]
pub async fn case_insensitive_read(map: Vc<EnvMap>, name: String) -> Result<Vc<Option<String>>> {
    Ok(Vc::cell(
        to_uppercase_map(map)
            .await?
            .get(&name.to_uppercase())
            .cloned(),
    ))
}

#[turbo_tasks::function]
async fn to_uppercase_map(map: Vc<EnvMap>) -> Result<Vc<EnvMap>> {
    let map = &*map.await?;
    let mut new = IndexMap::with_capacity(map.len());
    for (k, v) in map {
        new.insert(k.to_uppercase(), v.clone());
    }
    Ok(Vc::cell(new))
}

pub static GLOBAL_ENV_LOCK: Mutex<()> = Mutex::new(());

pub fn register() {
    turbo_tasks::register();
    include!(concat!(env!("OUT_DIR"), "/register.rs"));
}
