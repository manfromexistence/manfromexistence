#![feature(trivial_bounds)]

use std::{
    collections::BTreeMap,
    env::current_dir,
    io::Read,
    time::{Duration, Instant},
};

use anyhow::Result;
use sha2::{Digest, Sha256};
use turbo_tasks::{util::FormatDuration, TurboTasks, UpdateInfo, Vc};
use turbo_tasks_fs::{
    glob::Glob, register, DirectoryEntry, DiskFileSystem, FileContent, FileSystem, FileSystemPath,
    ReadGlobResult,
};
use turbo_tasks_memory::MemoryBackend;

#[tokio::main]
async fn main() -> Result<()> {
    register();
    include!(concat!(env!("OUT_DIR"), "/register_example_hash_glob.rs"));

    let tt = TurboTasks::new(MemoryBackend::default());
    let start = Instant::now();

    let task = tt.spawn_root_task(|| {
        Box::pin(async {
            let root = current_dir().unwrap().to_str().unwrap().to_string();
            let disk_fs = DiskFileSystem::new("project".to_string(), root, vec![]);
            disk_fs.await?.start_watching()?;

            // Smart Pointer cast
            let fs: Vc<Box<dyn FileSystem>> = Vc::upcast(disk_fs);
            let input = fs.root().join("crates".to_string());
            let glob = Glob::new("**/*.rs".to_string());
            let glob_result = input.read_glob(glob, true);
            let dir_hash = hash_glob_result(glob_result);
            print_hash(dir_hash).await?;
            Ok::<Vc<()>, _>(Default::default())
        })
    });
    tt.wait_task_completion(task, true).await.unwrap();
    println!("done in {}", FormatDuration(start.elapsed()));

    loop {
        let UpdateInfo {
            duration, tasks, ..
        } = tt
            .get_or_wait_aggregated_update_info(Duration::from_millis(100))
            .await;
        println!("updated {} tasks in {}", tasks, FormatDuration(duration));
    }
}

#[turbo_tasks::function]
pub fn empty_string() -> Vc<String> {
    Vc::cell("".to_string())
}

#[turbo_tasks::function]
async fn print_hash(dir_hash: Vc<String>) -> Result<Vc<()>> {
    println!("DIR HASH: {}", dir_hash.await?.as_str());
    Ok(Default::default())
}

#[turbo_tasks::function]
async fn hash_glob_result(result: Vc<ReadGlobResult>) -> Result<Vc<String>> {
    let result = result.await?;
    let mut hashes = BTreeMap::new();
    for (name, entry) in result.results.iter() {
        if let DirectoryEntry::File(path) = entry {
            hashes.insert(name, hash_file(*path).await?.clone_value());
        }
    }
    for (name, result) in result.inner.iter() {
        let hash = hash_glob_result(*result).await?;
        if !hash.is_empty() {
            hashes.insert(name, hash.clone_value());
        }
    }
    if hashes.is_empty() {
        return Ok(empty_string());
    }
    let hash = hash_content(
        &mut hashes
            .into_values()
            .collect::<Vec<String>>()
            .join(",")
            .as_bytes(),
    );
    Ok(hash)
}

#[turbo_tasks::function]
async fn hash_file(file_path: Vc<FileSystemPath>) -> Result<Vc<String>> {
    let content = file_path.read().await?;
    Ok(match &*content {
        FileContent::Content(file) => hash_content(&mut file.read()),
        FileContent::NotFound => {
            // report error
            Vc::cell("".to_string())
        }
    })
}

fn hash_content<R: Read>(content: &mut R) -> Vc<String> {
    let mut hasher = Sha256::new();
    let mut buf = [0; 1024];
    while let Ok(size) = content.read(&mut buf) {
        hasher.update(&buf[0..size]);
    }
    let result = format!("{:x}", hasher.finalize());

    Vc::cell(result)
}
