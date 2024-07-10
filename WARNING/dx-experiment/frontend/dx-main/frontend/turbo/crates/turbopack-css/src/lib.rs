#![feature(min_specialization)]
#![feature(box_patterns)]
#![feature(iter_intersperse)]
#![feature(int_roundings)]
#![feature(arbitrary_self_types)]

mod asset;
pub mod chunk;
mod code_gen;
pub mod embed;
mod global_asset;
mod lifetime_util;
mod module_asset;
pub(crate) mod parse;
pub(crate) mod process;
pub(crate) mod references;
pub(crate) mod util;

pub use asset::CssModuleAsset;
pub use global_asset::GlobalCssAsset;
pub use module_asset::ModuleCssAsset;
use serde::{Deserialize, Serialize};
use turbo_tasks::{trace::TraceRawVcs, TaskInput};

pub use self::process::*;
use crate::references::import::ImportAssetReference;

#[derive(
    PartialOrd,
    Ord,
    Eq,
    PartialEq,
    Hash,
    Debug,
    Copy,
    Clone,
    Default,
    Serialize,
    Deserialize,
    TaskInput,
    TraceRawVcs,
)]
pub enum CssModuleAssetType {
    /// Default parsing mode.
    #[default]
    Default,
    /// The CSS is parsed as CSS modules.
    Module,
}

pub fn register() {
    turbo_tasks::register();
    turbo_tasks_fs::register();
    turbopack_core::register();
    turbopack_ecmascript::register();
    include!(concat!(env!("OUT_DIR"), "/register.rs"));
}
