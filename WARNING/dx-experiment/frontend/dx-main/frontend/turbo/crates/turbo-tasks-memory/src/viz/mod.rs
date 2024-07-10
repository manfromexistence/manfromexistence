pub mod graph;
pub mod table;

use std::{
    cmp::max,
    collections::HashMap,
    fmt::{Debug, Write},
    ops::{Div, Mul},
    time::Duration,
};

use turbo_tasks_hash::hash_xxh3_hash64;

use crate::stats::{ExportedTaskStats, GroupTree, ReferenceStats, ReferenceType, StatsTaskType};

fn escape_in_template_str(s: &str) -> String {
    s.replace('\\', "\\\\")
        .replace('\"', "\\\"")
        .replace('\n', "\\n")
}

fn escape_html(s: &str) -> String {
    s.replace('>', "&gt;").replace('<', "&lt;")
}

fn get_id<'a>(ty: &'a StatsTaskType, ids: &mut HashMap<&'a StatsTaskType, usize>) -> usize {
    let len = ids.len();
    *ids.entry(ty).or_insert(len)
}

struct MaxValues {
    pub total_duration: Option<Duration>,
    pub total_current_duration: Duration,
    pub total_update_duration: Duration,
    pub avg_duration: Option<Duration>,
    pub max_duration: Duration,
    pub count: usize,
    pub unloaded_count: usize,
    pub updates: Option<usize>,
    /// stored as dependencies * 100
    pub dependencies: usize,
    /// stored as children * 100
    pub children: usize,
    pub depth: u32,
}

fn get_max_values(node: &GroupTree) -> MaxValues {
    get_max_values_internal(0, node)
}

pub fn get_avg_dependencies_count_times_100(stats: &ExportedTaskStats) -> usize {
    stats
        .references
        .iter()
        .filter(|((ty, _), _)| *ty == ReferenceType::Dependency)
        .map(|(_, ref_stats)| ref_stats.count)
        .sum::<usize>()
        * 100
        / stats.count
}

pub fn get_avg_children_count_times_100(stats: &ExportedTaskStats) -> usize {
    stats
        .references
        .iter()
        .filter(|((ty, _), _)| *ty == ReferenceType::Child)
        .map(|(_, ref_stats)| ref_stats.count)
        .sum::<usize>()
        * 100
        / stats.count
}

fn get_max_values_internal(depth: u32, node: &GroupTree) -> MaxValues {
    let mut max_total_duration = None;
    let mut max_total_current_duration = Duration::ZERO;
    let mut max_total_update_duration = Duration::ZERO;
    let mut max_avg_duration = None;
    let mut max_max_duration = Duration::ZERO;
    let mut max_count = 0;
    let mut max_unloaded_count = 0;
    let mut max_updates = None;
    let mut max_dependencies = 0;
    let mut max_children = 0;
    let mut max_depth = 0;
    for (_, ref s) in node.task_types.iter().chain(node.primary.iter()) {
        if let Some(total_duration) = s.total_duration {
            max_total_duration = max_total_duration
                .map(|max_total_duration| max(max_total_duration, total_duration))
                .or(Some(total_duration));
        }
        max_total_current_duration = max(max_total_current_duration, s.total_current_duration);
        max_total_update_duration = max(max_total_update_duration, s.total_update_duration);
        if let Some((total_duration, executions)) = s.total_duration.zip(s.executions) {
            if executions > 0 {
                let avg_duration = total_duration / executions;
                max_avg_duration = max_avg_duration
                    .map(|max_avg_duration| max(max_avg_duration, avg_duration))
                    .or(Some(avg_duration));
            }
        }
        max_max_duration = max(max_max_duration, s.max_duration);
        max_count = max(max_count, s.count);
        max_unloaded_count = max(max_unloaded_count, s.unloaded_count);
        if let Some(executions) = s.executions {
            let updates = (executions as usize).saturating_sub(s.count);
            max_updates = max_updates
                .map(|max_updates| max(max_updates, updates))
                .or(Some(updates));
        }
        max_dependencies = max(max_dependencies, get_avg_dependencies_count_times_100(s));
        max_children = max(max_children, get_avg_children_count_times_100(s));
    }
    max_depth = max(
        max_depth,
        if node.task_types.is_empty() {
            depth
        } else {
            depth + 1
        },
    );
    for child in node.children.iter() {
        let MaxValues {
            total_duration,
            total_current_duration,
            total_update_duration,
            avg_duration,
            max_duration,
            count,
            unloaded_count,
            updates,
            dependencies,
            children,
            depth: inner_depth,
        } = get_max_values_internal(depth + 1, child);
        max_total_duration = max_total_duration
            .zip(total_duration)
            .map(|(a, b)| max(a, b));
        max_total_current_duration = max(max_total_current_duration, total_current_duration);
        max_total_update_duration = max(max_total_update_duration, total_update_duration);
        max_avg_duration = max_avg_duration.zip(avg_duration).map(|(a, b)| max(a, b));
        max_max_duration = max(max_max_duration, max_duration);
        max_count = max(max_count, count);
        max_unloaded_count = max(max_unloaded_count, unloaded_count);
        max_updates = max_updates.zip(updates).map(|(a, b)| max(a, b));
        max_dependencies = max(max_dependencies, dependencies);
        max_children = max(max_children, children);
        max_depth = max(max_depth, inner_depth);
    }
    MaxValues {
        total_duration: max_total_duration,
        total_current_duration: max_total_current_duration,
        total_update_duration: max_total_update_duration,
        avg_duration: max_avg_duration,
        max_duration: max_max_duration,
        count: max_count,
        unloaded_count: max_unloaded_count,
        updates: max_updates,
        dependencies: max_dependencies,
        children: max_children,
        depth: max_depth,
    }
}

fn compute_depths<'a>(
    node: &'a GroupTree,
    depth: usize,
    output: &mut HashMap<&'a StatsTaskType, usize>,
) {
    if let Some((ty, _)) = &node.primary {
        output.insert(ty, depth);
    }
    for (ty, _) in node.task_types.iter() {
        output.insert(ty, depth);
    }
    for child in node.children.iter() {
        compute_depths(child, depth + 1, output);
    }
}

fn as_frac<
    T: From<u8> + TryInto<u8> + Mul<T, Output = T> + Div<T, Output = T> + PartialEq<T> + Ord + Copy,
>(
    current: T,
    total: T,
) -> u8
where
    <T as TryInto<u8>>::Error: Debug,
{
    let min: T = u8::MIN.into();
    let max: T = u8::MAX.into();
    let result = if total == min {
        min
    } else {
        max * current / total
    };
    result.clamp(min, max).try_into().unwrap()
}

fn as_color(n: u8) -> String {
    // interpolate #fff -> #ff0 -> #f00
    if n >= 64 {
        format!("#ff{:0>2x}00", u8::MAX - ((n as u32 - 64) * 4 / 3) as u8)
    } else {
        format!("#ffff{:0>2x}", u8::MAX - n * 4)
    }
}

fn as_hash_color(value: &String) -> String {
    let hash = hash_xxh3_hash64(value.as_bytes());
    format!(
        "#{:0>2x}{:0>2x}{:0>2x}",
        (hash & 0x7f) + 0x80,
        ((hash >> 7) & 0x7f) + 0x80,
        ((hash >> 14) & 0x7f) + 0x80
    )
}

fn as_frac_color<
    T: From<u8> + TryInto<u8> + Mul<T, Output = T> + Div<T, Output = T> + PartialEq<T> + Ord + Copy,
>(
    current: T,
    total: T,
) -> String
where
    <T as TryInto<u8>>::Error: Debug,
{
    as_color(as_frac(current, total))
}

fn get_child_label(_ty: &ReferenceType, stats: &ReferenceStats, source_count: usize) -> String {
    if stats.count == source_count {
        "".to_string()
    } else {
        format!("{}", stats.count)
    }
}
