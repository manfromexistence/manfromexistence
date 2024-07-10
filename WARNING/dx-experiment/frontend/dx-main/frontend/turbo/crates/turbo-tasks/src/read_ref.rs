use std::{
    cmp::Ordering,
    fmt::{Debug, Display},
    hash::Hash,
    marker::PhantomData,
    mem::transmute_copy,
    sync::Arc,
};

use serde::{Deserialize, Serialize};
use turbo_tasks_hash::DeterministicHash;

use crate::{
    debug::{ValueDebugFormat, ValueDebugFormatString},
    macro_helpers::find_cell_by_type,
    trace::{TraceRawVcs, TraceRawVcsContext},
    SharedReference, Vc, VcRead, VcValueType,
};

/// The read value of a value cell. The read value is immutable, while the cell
/// itself might change over time. It's basically a snapshot of a value at a
/// certain point in time.
///
/// Internally it stores a reference counted reference to a value on the heap.
pub struct ReadRef<T>(Arc<T>);

impl<T> Clone for ReadRef<T> {
    fn clone(&self) -> Self {
        Self(self.0.clone())
    }
}

impl<T> std::ops::Deref for ReadRef<T>
where
    T: VcValueType,
{
    type Target = <T::Read as VcRead<T>>::Target;

    fn deref(&self) -> &Self::Target {
        T::Read::value_to_target_ref(&self.0)
    }
}

impl<T> Display for ReadRef<T>
where
    T: VcValueType,
    <T::Read as VcRead<T>>::Target: Display,
{
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        Display::fmt(&**self, f)
    }
}

impl<T> Debug for ReadRef<T>
where
    T: VcValueType,
    <T::Read as VcRead<T>>::Target: Debug,
{
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        Debug::fmt(&**self, f)
    }
}

impl<T> TraceRawVcs for ReadRef<T>
where
    T: VcValueType,
    <T::Read as VcRead<T>>::Target: TraceRawVcs,
{
    fn trace_raw_vcs(&self, trace_context: &mut TraceRawVcsContext) {
        (**self).trace_raw_vcs(trace_context);
    }
}

impl<T> ValueDebugFormat for ReadRef<T>
where
    T: VcValueType,
    <T::Read as VcRead<T>>::Target: ValueDebugFormat + 'static,
{
    fn value_debug_format(&self, depth: usize) -> ValueDebugFormatString {
        let value = &**self;
        value.value_debug_format(depth)
    }
}

impl<T> PartialEq for ReadRef<T>
where
    T: VcValueType,
    <T::Read as VcRead<T>>::Target: PartialEq,
{
    fn eq(&self, other: &Self) -> bool {
        PartialEq::eq(&**self, &**other)
    }
}

impl<T> Eq for ReadRef<T>
where
    T: VcValueType,
    <T::Read as VcRead<T>>::Target: Eq,
{
}

impl<T> PartialOrd for ReadRef<T>
where
    T: VcValueType,
    <T::Read as VcRead<T>>::Target: PartialOrd,
{
    fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
        PartialOrd::partial_cmp(&**self, &**other)
    }
}

impl<T> Ord for ReadRef<T>
where
    T: VcValueType,
    <T::Read as VcRead<T>>::Target: Ord,
{
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        Ord::cmp(&**self, &**other)
    }
}

impl<T> Hash for ReadRef<T>
where
    T: VcValueType,
    <T::Read as VcRead<T>>::Target: Hash,
{
    fn hash<H: std::hash::Hasher>(&self, state: &mut H) {
        Hash::hash(&**self, state)
    }
}

impl<T> DeterministicHash for ReadRef<T>
where
    T: VcValueType,
    <T::Read as VcRead<T>>::Target: DeterministicHash,
{
    fn deterministic_hash<H: turbo_tasks_hash::DeterministicHasher>(&self, state: &mut H) {
        let p = &**self;
        p.deterministic_hash(state);
    }
}

impl<'a, T, I, J: Iterator<Item = I>> IntoIterator for &'a ReadRef<T>
where
    T: VcValueType,
    &'a <T::Read as VcRead<T>>::Target: IntoIterator<Item = I, IntoIter = J>,
{
    type Item = I;

    type IntoIter = J;

    fn into_iter(self) -> Self::IntoIter {
        (&**self).into_iter()
    }
}

impl<T, I: 'static, J: Iterator<Item = I>> IntoIterator for ReadRef<T>
where
    T: VcValueType,
    &'static <T::Read as VcRead<T>>::Target: IntoIterator<Item = I, IntoIter = J>,
{
    type Item = I;

    type IntoIter = ReadRefIter<T, I, J>;

    fn into_iter(self) -> Self::IntoIter {
        let r = &*self;
        // # Safety
        // The reference will we valid as long as the ReadRef is valid.
        let r = unsafe {
            transmute_copy::<
                &'_ <T::Read as VcRead<T>>::Target,
                &'static <T::Read as VcRead<T>>::Target,
            >(&r)
        };
        ReadRefIter {
            read_ref: self,
            iter: r.into_iter(),
        }
    }
}

pub struct ReadRefIter<T, I: 'static, J: Iterator<Item = I>>
where
    T: VcValueType,
{
    iter: J,
    #[allow(dead_code)]
    read_ref: ReadRef<T>,
}

impl<T, I: 'static, J: Iterator<Item = I>> Iterator for ReadRefIter<T, I, J>
where
    T: VcValueType,
{
    type Item = I;

    fn next(&mut self) -> Option<Self::Item> {
        self.iter.next()
    }
}

impl<T> Serialize for ReadRef<T>
where
    T: VcValueType,
    <T::Read as VcRead<T>>::Target: Serialize,
{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        (**self).serialize(serializer)
    }
}

impl<'de, T> Deserialize<'de> for ReadRef<T>
where
    T: Deserialize<'de>,
{
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let value = T::deserialize(deserializer)?;
        Ok(Self(Arc::new(value)))
    }
}

impl<T> ReadRef<T> {
    pub fn new(arc: Arc<T>) -> Self {
        Self(arc)
    }

    pub fn ptr_eq(&self, other: &ReadRef<T>) -> bool {
        Arc::ptr_eq(&self.0, &other.0)
    }

    pub fn ptr_cmp(&self, other: &ReadRef<T>) -> Ordering {
        Arc::as_ptr(&self.0).cmp(&Arc::as_ptr(&other.0))
    }
}

impl<T> ReadRef<T>
where
    T: VcValueType,
{
    /// Returns a new cell that points to the same value as the given
    /// reference.
    pub fn cell(read_ref: ReadRef<T>) -> Vc<T> {
        let local_cell = find_cell_by_type(T::get_value_type_id());
        local_cell
            .update_shared_reference(SharedReference(Some(T::get_value_type_id()), read_ref.0));
        Vc {
            node: local_cell.into(),
            _t: PhantomData,
        }
    }
}

impl<T> ReadRef<T>
where
    T: VcValueType,
    <T::Read as VcRead<T>>::Target: Clone,
{
    /// This will clone the contained value instead of cloning the ReadRef.
    /// This clone is more expensive, but allows to get an mutable owned value.
    pub fn clone_value(&self) -> <T::Read as VcRead<T>>::Target {
        (**self).clone()
    }
}
