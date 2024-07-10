use std::{
    cmp::{
        max, {self},
    },
    collections::{hash_map::Entry, HashMap, HashSet, VecDeque},
    fmt::Display,
    mem::take,
    time::Duration,
};

use turbo_tasks::{registry, FunctionId, TaskId, TraitTypeId};

use crate::{
    task::{Task, TaskStatsInfo},
    MemoryBackend,
};

pub struct StatsReferences {
    pub tasks: Vec<(ReferenceType, TaskId)>,
}

#[derive(PartialEq, Eq, Hash, Clone, Debug)]
pub enum StatsTaskType {
    Root(TaskId),
    Once(TaskId),
    Native(FunctionId),
    ResolveNative(FunctionId),
    ResolveTrait(TraitTypeId, String),
    Collectibles(TraitTypeId),
}

impl Display for StatsTaskType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            StatsTaskType::Root(_) => write!(f, "root"),
            StatsTaskType::Once(_) => write!(f, "once"),
            StatsTaskType::Collectibles(t) => {
                write!(f, "read collectibles {}", registry::get_trait(*t).name)
            }
            StatsTaskType::Native(nf) => write!(f, "{}", registry::get_function(*nf).name),
            StatsTaskType::ResolveNative(nf) => {
                write!(f, "resolve {}", registry::get_function(*nf).name)
            }
            StatsTaskType::ResolveTrait(t, n) => {
                write!(f, "resolve trait {}::{}", registry::get_trait(*t).name, n)
            }
        }
    }
}

#[derive(Default, Clone, Debug)]
pub struct ReferenceStats {
    pub count: usize,
}

#[derive(PartialEq, Eq, Hash, Clone, Debug, Copy)]
pub enum ReferenceType {
    Child,
    Dependency,
    Input,
}

#[derive(Clone, Debug)]
pub struct ExportedTaskStats {
    pub count: usize,
    pub unloaded_count: usize,
    pub executions: Option<u32>,
    pub total_duration: Option<Duration>,
    pub total_current_duration: Duration,
    pub total_update_duration: Duration,
    pub max_duration: Duration,
    pub references: HashMap<(ReferenceType, StatsTaskType), ReferenceStats>,
}

impl Default for ExportedTaskStats {
    fn default() -> Self {
        Self {
            count: 0,
            unloaded_count: 0,
            executions: None,
            total_duration: None,
            total_current_duration: Duration::ZERO,
            total_update_duration: Duration::ZERO,
            max_duration: Duration::ZERO,
            references: Default::default(),
        }
    }
}

pub struct Stats {
    tasks: HashMap<StatsTaskType, ExportedTaskStats>,
}

impl Default for Stats {
    fn default() -> Self {
        Self::new()
    }
}

impl Stats {
    pub fn new() -> Self {
        Self {
            tasks: Default::default(),
        }
    }

    pub fn add(&mut self, backend: &MemoryBackend, task: &Task) {
        self.add_conditional(backend, task, |_, _| true)
    }

    pub fn add_conditional(
        &mut self,
        backend: &MemoryBackend,
        task: &Task,
        condition: impl FnOnce(&StatsTaskType, &TaskStatsInfo) -> bool,
    ) {
        let info = task.get_stats_info(backend);
        let ty = task.get_stats_type();
        if !condition(&ty, &info) {
            return;
        }
        let TaskStatsInfo {
            total_duration,
            last_duration,
            executions,
            unloaded,
        } = info;
        let stats = self.tasks.entry(ty).or_default();
        stats.count += 1;
        if let Some(total_duration) = total_duration {
            *stats.total_duration.get_or_insert(Duration::ZERO) += total_duration;
        }
        if unloaded {
            stats.unloaded_count += 1
        }
        stats.total_current_duration += last_duration;
        if executions.map(|executions| executions > 1).unwrap_or(true) {
            stats.total_update_duration += last_duration;
        }
        stats.max_duration = max(stats.max_duration, last_duration);
        if let Some(executions) = executions {
            *stats.executions.get_or_insert(0) += executions;
        }

        let StatsReferences { tasks, .. } = task.get_stats_references();
        let set: HashSet<_> = tasks.into_iter().collect();
        for (ref_type, task) in set {
            backend.with_task(task, |task| {
                let ty = task.get_stats_type();
                let ref_stats = stats.references.entry((ref_type, ty)).or_default();
                ref_stats.count += 1;
            })
        }
    }

    pub fn add_id(&mut self, backend: &MemoryBackend, id: TaskId) {
        backend.with_task(id, |task| {
            self.add(backend, task);
        });
    }

    pub fn add_id_conditional(
        &mut self,
        backend: &MemoryBackend,
        id: TaskId,
        condition: impl FnOnce(&StatsTaskType, &TaskStatsInfo) -> bool,
    ) {
        backend.with_task(id, |task| {
            self.add_conditional(backend, task, condition);
        });
    }

    pub fn merge_resolve(&mut self) {
        self.merge(|ty, _stats| match ty {
            StatsTaskType::Root(_)
            | StatsTaskType::Once(_)
            | StatsTaskType::Native(_)
            | StatsTaskType::Collectibles(..) => false,
            StatsTaskType::ResolveNative(_) | StatsTaskType::ResolveTrait(_, _) => true,
        })
    }

    pub fn merge(&mut self, mut select: impl FnMut(&StatsTaskType, &ExportedTaskStats) -> bool) {
        let merged: HashMap<_, _> = self
            .tasks
            .extract_if(|ty, stats| select(ty, stats))
            .collect();

        for stats in self.tasks.values_mut() {
            fn merge_refs(
                refs: HashMap<(ReferenceType, StatsTaskType), ReferenceStats>,
                merged: &HashMap<StatsTaskType, ExportedTaskStats>,
            ) -> HashMap<(ReferenceType, StatsTaskType), ReferenceStats> {
                refs.into_iter()
                    .flat_map(|((ref_ty, ty), stats)| {
                        if let Some(merged_stats) = merged.get(&ty) {
                            if ref_ty == ReferenceType::Child {
                                merge_refs(merged_stats.references.clone(), merged)
                                    .into_iter()
                                    .map(|((ref_ty, ty), _)| ((ref_ty, ty), stats.clone()))
                                    .collect()
                            } else {
                                vec![]
                            }
                        } else {
                            vec![((ref_ty, ty), stats)]
                        }
                    })
                    .collect()
            }
            stats.references = merge_refs(take(&mut stats.references), &merged);
        }
    }

    pub fn treeify(&self, tree_ref_type: ReferenceType) -> GroupTree {
        let mut incoming_references_count = self
            .tasks
            .keys()
            .map(|ty| (ty, 0))
            .collect::<HashMap<_, usize>>();
        for stats in self.tasks.values() {
            for (ref_type, ty) in stats.references.keys() {
                if ref_type == &tree_ref_type {
                    *incoming_references_count.entry(ty).or_default() += 1;
                }
            }
        }
        let mut root_queue = incoming_references_count.into_iter().collect::<Vec<_>>();
        root_queue.sort_by_key(|(_, c)| *c);

        let mut task_placement: HashMap<&StatsTaskType, Option<&StatsTaskType>> = HashMap::new();
        fn get_path<'a>(
            ty: Option<&'a StatsTaskType>,
            task_placement: &HashMap<&'a StatsTaskType, Option<&'a StatsTaskType>>,
        ) -> Vec<&'a StatsTaskType> {
            if let Some(mut ty) = ty {
                let mut path = vec![ty];
                while let Some(parent) = task_placement[ty] {
                    ty = parent;
                    path.push(ty);
                }
                path.reverse();
                path
            } else {
                Vec::new()
            }
        }
        fn find_common<'a>(
            p1: Vec<&'a StatsTaskType>,
            p2: Vec<&'a StatsTaskType>,
        ) -> Option<&'a StatsTaskType> {
            let mut i = cmp::min(p1.len(), p2.len());
            loop {
                if i == 0 {
                    return None;
                }
                i -= 1;
                if p1[i] == p2[i] {
                    return Some(p1[i]);
                }
            }
        }
        for (root, _) in root_queue.into_iter() {
            if task_placement.contains_key(root) {
                continue;
            }
            let mut queue: VecDeque<(&StatsTaskType, Option<&StatsTaskType>)> =
                [(root, None)].into_iter().collect();

            while let Some((ty, placement)) = queue.pop_front() {
                match task_placement.entry(ty) {
                    Entry::Occupied(e) => {
                        let current_placement = *e.get();
                        if placement != current_placement {
                            let new_placement = find_common(
                                get_path(placement, &task_placement),
                                get_path(current_placement, &task_placement),
                            );
                            task_placement.insert(ty, new_placement);
                        }
                    }
                    Entry::Vacant(e) => {
                        if let Some(task) = self.tasks.get(ty) {
                            e.insert(placement);

                            for (ref_type, child_ty) in task.references.keys() {
                                if ref_type == &tree_ref_type {
                                    queue.push_back((child_ty, Some(ty)));
                                }
                            }
                        }
                    }
                }
            }
        }

        let mut children: HashMap<Option<&StatsTaskType>, Vec<&StatsTaskType>> = HashMap::new();
        for (child, parent) in task_placement {
            children.entry(parent).or_default().push(child);
        }

        fn into_group<'a>(
            tasks: &HashMap<StatsTaskType, ExportedTaskStats>,
            children: &HashMap<Option<&'a StatsTaskType>, Vec<&'a StatsTaskType>>,
            ty: Option<&'a StatsTaskType>,
        ) -> GroupTree {
            let inner = &children[&ty];
            let inner_with_children = inner.iter().filter(|c| children.contains_key(&Some(*c)));
            let leafs = inner.iter().filter(|c| !children.contains_key(&Some(*c)));
            let task_types: Vec<_> = leafs.map(|&ty| (ty.clone(), tasks[ty].clone())).collect();
            GroupTree {
                primary: ty.map(|ty| (ty.clone(), tasks[ty].clone())),
                children: inner_with_children
                    .map(|ty| into_group(tasks, children, Some(ty)))
                    .collect(),
                task_types,
            }
        }

        if children.is_empty() {
            GroupTree {
                primary: None,
                children: Vec::new(),
                task_types: Vec::new(),
            }
        } else {
            into_group(&self.tasks, &children, None)
        }
    }
}

#[derive(Debug)]
pub struct GroupTree {
    pub primary: Option<(StatsTaskType, ExportedTaskStats)>,
    pub children: Vec<GroupTree>,
    pub task_types: Vec<(StatsTaskType, ExportedTaskStats)>,
}
