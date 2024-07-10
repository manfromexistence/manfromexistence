//! # Function tasks
//!
//! This module contains the trait definitions and implementations that are
//! necessary for accepting functions as tasks when using the
//! `turbo_tasks::function` macro.
//!
//! This system is inspired by Bevy's Systems and Axum's Handlers.
//!
//! The original principle is somewhat simple: a function is accepted if all
//! of its arguments implement `TaskInput` and its return type implements
//! `TaskOutput`. There are a few hoops one needs to jump through to make this
//! work, but they are described in this blog post:
//! https://blog.logrocket.com/rust-bevy-entity-component-system/
//!
//! However, there are is an additional complication in our case: async methods
//! that accept a reference to the receiver as their first argument.
//!
//! This complication handled through our own version of the `async_trait`
//! crate, which allows us to target `async fn` as trait bounds. The naive
//! approach runs into many issues with lifetimes, hence the need for an
//! intermediate trait. However, this implementation doesn't support all async
//! methods (see commented out tests).

use std::{future::Future, marker::PhantomData, pin::Pin};

use anyhow::{bail, Context, Result};

use super::{TaskInput, TaskOutput};
use crate::{ConcreteTaskInput, RawVc, Vc, VcRead, VcValueType};

pub type NativeTaskFuture = Pin<Box<dyn Future<Output = Result<RawVc>> + Send>>;
pub type NativeTaskFn = Box<dyn Fn() -> NativeTaskFuture + Send + Sync>;

pub trait TaskFn: Send + Sync + 'static {
    fn functor(&self, inputs: &[ConcreteTaskInput]) -> Result<NativeTaskFn>;
}

pub trait IntoTaskFn<Mode, Inputs> {
    type TaskFn: TaskFn;

    fn into_task_fn(self) -> Self::TaskFn;
}

impl<F, Mode, Inputs> IntoTaskFn<Mode, Inputs> for F
where
    F: TaskFnInputFunction<Mode, Inputs>,
    Mode: TaskFnMode,
    Inputs: TaskInputs,
{
    type TaskFn = FunctionTaskFn<F, Mode, Inputs>;

    fn into_task_fn(self) -> Self::TaskFn {
        FunctionTaskFn {
            task_fn: self,
            mode: PhantomData,
            inputs: PhantomData,
        }
    }
}

pub struct FunctionTaskFn<F, Mode: TaskFnMode, Inputs: TaskInputs> {
    task_fn: F,
    mode: PhantomData<Mode>,
    inputs: PhantomData<Inputs>,
}

impl<F, Mode, Inputs> TaskFn for FunctionTaskFn<F, Mode, Inputs>
where
    F: TaskFnInputFunction<Mode, Inputs>,
    Mode: TaskFnMode,
    Inputs: TaskInputs,
{
    fn functor(&self, inputs: &[ConcreteTaskInput]) -> Result<NativeTaskFn> {
        TaskFnInputFunction::functor(&self.task_fn, inputs)
    }
}

trait TaskFnInputFunction<Mode: TaskFnMode, Inputs: TaskInputs>: Send + Sync + Clone + 'static {
    fn functor(&self, inputs: &[ConcreteTaskInput]) -> Result<NativeTaskFn>;
}

pub trait TaskInputs: Send + Sync + 'static {}

/// Modes to allow multiple `TaskFnInputFunction` blanket implementations on
/// `Fn`s. Even though the implementations are non-conflicting in practice, they
/// could be in theory (at least from with the compiler's current limitations).
/// Despite this, the compiler is still able to infer the correct mode from a
/// function.
pub trait TaskFnMode: Send + Sync + 'static {}

pub struct FunctionMode;
impl TaskFnMode for FunctionMode {}

pub struct MethodMode;
impl TaskFnMode for MethodMode {}

pub struct AsyncFunctionMode;
impl TaskFnMode for AsyncFunctionMode {}

pub struct AsyncMethodMode;
impl TaskFnMode for AsyncMethodMode {}

macro_rules! task_inputs_impl {
    ( $( $arg:ident )* ) => {
        impl<$($arg,)*> TaskInputs for ($($arg,)*)
        where
            $($arg: TaskInput + 'static,)*
        {}
    }
}

macro_rules! task_fn_impl {
    ( $async_fn_trait:ident , $( $arg:ident )* ) => {
        impl<F, Output, $($arg,)*> TaskFnInputFunction<FunctionMode, ($($arg,)*)> for F
        where
            $($arg: TaskInput + 'static,)*
            F: Fn($($arg,)*) -> Output + Send + Sync + Clone + 'static,
            Output: TaskOutput + 'static,
        {
            #[allow(non_snake_case)]
            fn functor(&self, inputs: &[ConcreteTaskInput]) -> Result<NativeTaskFn> {
                let task_fn = self.clone();
                let mut iter = inputs.iter();

                $(
                    let $arg = iter.next().context(format!("task is missing argument {}", stringify!($arg)))?;
                )*

                if iter.next().is_some() {
                    bail!("task was called with too many arguments");
                }

                $(
                    let $arg = $arg::try_from_concrete($arg)?;
                )*

                Ok(Box::new(move || {
                    let task_fn = task_fn.clone();
                    $(
                        let $arg = $arg.clone();
                    )*

                    Box::pin(async move {
                        Output::try_into_raw_vc((task_fn)($($arg),*))
                    })
                }))
            }
        }

        impl<F, Output, FutureOutput, $($arg,)*> TaskFnInputFunction<AsyncFunctionMode, ($($arg,)*)> for F
        where
            $($arg: TaskInput + 'static,)*
            F: Fn($($arg,)*) -> FutureOutput + Send + Sync + Clone + 'static,
            FutureOutput: Future<Output = Output> + Send,
            Output: TaskOutput + 'static,
        {
            #[allow(non_snake_case)]
            fn functor(&self, inputs: &[ConcreteTaskInput]) -> Result<NativeTaskFn> {
                let task_fn = self.clone();
                let mut iter = inputs.iter();

                $(
                    let $arg = iter.next().context(format!("task is missing argument {}", stringify!($arg)))?;
                )*

                if iter.next().is_some() {
                    bail!("task was called with too many arguments");
                }

                $(
                    let $arg = $arg::try_from_concrete($arg)?;
                )*

                Ok(Box::new(move || {
                    let task_fn = task_fn.clone();
                    $(
                        let $arg = $arg.clone();
                    )*

                    Box::pin(async move {
                        Output::try_into_raw_vc((task_fn)($($arg),*).await)
                    })
                }))
            }
        }

        impl<F, Output, Recv, $($arg,)*> TaskFnInputFunction<MethodMode, (Vc<Recv>, $($arg,)*)> for F
        where
            Recv: VcValueType,
            $($arg: TaskInput + 'static,)*
            F: Fn(&Recv, $($arg,)*) -> Output + Send + Sync + Clone + 'static,
            Output: TaskOutput + 'static,
        {
            #[allow(non_snake_case)]
            fn functor(&self, inputs: &[ConcreteTaskInput]) -> Result<NativeTaskFn> {
                let task_fn = self.clone();
                let mut iter = inputs.iter();

                let recv = iter.next().context("task is missing receiver")?;
                $(
                    let $arg = iter.next().context(format!("task is missing argument {}", stringify!($arg)))?;
                )*

                if iter.next().is_some() {
                    bail!("task was called with too many arguments");
                }

                let recv = Vc::<Recv>::try_from_concrete(recv)?;
                $(
                    let $arg = $arg::try_from_concrete($arg)?;
                )*

                Ok(Box::new(move || {
                    let task_fn = task_fn.clone();
                    let recv = recv.clone();
                    $(
                        let $arg = $arg.clone();
                    )*

                    Box::pin(async move {
                        let recv = recv.await?;
                        let recv = <<Recv as VcValueType>::Read as VcRead<Recv>>::target_to_value_ref(&*recv);
                        Output::try_into_raw_vc((task_fn)(recv, $($arg),*))
                    })
                }))
            }
        }

        pub trait $async_fn_trait<A0, $($arg,)*>: Fn(A0, $($arg,)*) -> Self::OutputFuture {
            type OutputFuture: Future<Output = <Self as $async_fn_trait<A0, $($arg,)*>>::Output> + Send;
            type Output: TaskOutput;
        }

        impl<F: ?Sized, Fut, A0, $($arg,)*> $async_fn_trait<A0, $($arg,)*> for F
        where
            F: Fn(A0, $($arg,)*) -> Fut,
            Fut: Future + Send,
            Fut::Output: TaskOutput
        {
            type OutputFuture = Fut;
            type Output = Fut::Output;
        }

        impl<F, Recv, $($arg,)*> TaskFnInputFunction<AsyncMethodMode, (Vc<Recv>, $($arg,)*)> for F
        where
            Recv: VcValueType,
            $($arg: TaskInput + 'static,)*
            F: for<'a> $async_fn_trait<&'a Recv, $($arg,)*> + Clone + Send + Sync + 'static,
        {
            #[allow(non_snake_case)]
            fn functor(&self, inputs: &[ConcreteTaskInput]) -> Result<NativeTaskFn> {
                let task_fn = self.clone();
                let mut iter = inputs.iter();

                let recv = iter.next().context("task is missing receiver")?;
                $(
                    let $arg = iter.next().context(format!("task is missing argument {}", stringify!($arg)))?;
                )*

                if iter.next().is_some() {
                    bail!("task was called with too many arguments");
                }

                let recv = Vc::<Recv>::try_from_concrete(recv)?;
                $(
                    let $arg = $arg::try_from_concrete($arg)?;
                )*

                Ok(Box::new(move || {
                    let task_fn = task_fn.clone();
                    let recv = recv.clone();
                    $(
                        let $arg = $arg.clone();
                    )*

                    Box::pin(async move {
                        let recv = recv.await?;
                        let recv = <<Recv as VcValueType>::Read as VcRead<Recv>>::target_to_value_ref(&*recv);
                        <F as $async_fn_trait<&Recv, $($arg,)*>>::Output::try_into_raw_vc((task_fn)(recv, $($arg),*).await)
                    })
                }))
            }
        }
    };
}

task_fn_impl! { AsyncFn0, }
task_fn_impl! { AsyncFn1, A1 }
task_fn_impl! { AsyncFn2, A1 A2 }
task_fn_impl! { AsyncFn3, A1 A2 A3 }
task_fn_impl! { AsyncFn4, A1 A2 A3 A4 }
task_fn_impl! { AsyncFn5, A1 A2 A3 A4 A5 }
task_fn_impl! { AsyncFn6, A1 A2 A3 A4 A5 A6 }
task_fn_impl! { AsyncFn7, A1 A2 A3 A4 A5 A6 A7 }
task_fn_impl! { AsyncFn8, A1 A2 A3 A4 A5 A6 A7 A8 }
task_fn_impl! { AsyncFn9, A1 A2 A3 A4 A5 A6 A7 A8 A9 }
task_fn_impl! { AsyncFn10, A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 }
task_fn_impl! { AsyncFn11, A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11 }
task_fn_impl! { AsyncFn12, A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11 A12 }
task_fn_impl! { AsyncFn13, A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11 A12 A13 }
task_fn_impl! { AsyncFn14, A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11 A12 A13 A14 }
task_fn_impl! { AsyncFn15, A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11 A12 A13 A14 A15 }
task_fn_impl! { AsyncFn16, A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11 A12 A13 A14 A15 A16 }

// There needs to be one more implementation than task_fn_impl to account for
// the receiver.
task_inputs_impl! {}
task_inputs_impl! { A1 }
task_inputs_impl! { A1 A2 }
task_inputs_impl! { A1 A2 A3 }
task_inputs_impl! { A1 A2 A3 A4 }
task_inputs_impl! { A1 A2 A3 A4 A5 }
task_inputs_impl! { A1 A2 A3 A4 A5 A6 }
task_inputs_impl! { A1 A2 A3 A4 A5 A6 A7 }
task_inputs_impl! { A1 A2 A3 A4 A5 A6 A7 A8 }
task_inputs_impl! { A1 A2 A3 A4 A5 A6 A7 A8 A9 }
task_inputs_impl! { A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 }
task_inputs_impl! { A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11 }
task_inputs_impl! { A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11 A12 }
task_inputs_impl! { A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11 A12 A13 }
task_inputs_impl! { A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11 A12 A13 A14 }
task_inputs_impl! { A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11 A12 A13 A14 A15 }
task_inputs_impl! { A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11 A12 A13 A14 A15 A16 }
task_inputs_impl! { A1 A2 A3 A4 A5 A6 A7 A8 A9 A10 A11 A12 A13 A14 A15 A16 A17 }

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{VcCellNewMode, VcDefaultRead};

    #[test]
    fn test_task_fn() {
        fn no_args() -> crate::Vc<i32> {
            todo!()
        }

        fn one_arg(_a: i32) -> crate::Vc<i32> {
            todo!()
        }

        async fn async_one_arg(_a: i32) -> crate::Vc<i32> {
            todo!()
        }

        fn with_recv(_a: &i32) -> crate::Vc<i32> {
            todo!()
        }

        async fn async_with_recv(_a: &i32) -> crate::Vc<i32> {
            todo!()
        }

        fn with_recv_and_str(_a: &i32, _s: String) -> crate::Vc<i32> {
            todo!()
        }

        async fn async_with_recv_and_str(_a: &i32, _s: String) -> crate::Vc<i32> {
            todo!()
        }

        async fn async_with_recv_and_str_and_result(
            _a: &i32,
            _s: String,
        ) -> Result<crate::Vc<i32>> {
            todo!()
        }

        fn accepts_task_fn<F>(_task_fn: F)
        where
            F: TaskFn,
        {
        }

        struct Struct;
        impl Struct {
            async fn inherent_method(&self) {}
        }

        unsafe impl VcValueType for Struct {
            type Read = VcDefaultRead<Struct>;

            type CellMode = VcCellNewMode<Struct>;

            fn get_value_type_id() -> crate::ValueTypeId {
                todo!()
            }
        }

        trait AsyncTrait {
            async fn async_method(&self);
        }

        impl AsyncTrait for Struct {
            async fn async_method(&self) {
                todo!()
            }
        }

        /*
        async fn async_with_recv_and_str_and_lf(
            _a: &i32,
            _s: String,
        ) -> Result<crate::Vc<i32>, crate::Vc<i32>> {
            todo!()
        }

        #[async_trait::async_trait]
        trait BoxAsyncTrait {
            async fn box_async_method(&self);
        }

        #[async_trait::async_trait]
        impl BoxAsyncTrait for Struct {
            async fn box_async_method(&self) {
                todo!()
            }
        }
        */

        let _task_fn = no_args.into_task_fn();
        accepts_task_fn(no_args.into_task_fn());
        let _task_fn = one_arg.into_task_fn();
        accepts_task_fn(one_arg.into_task_fn());
        let _task_fn = async_one_arg.into_task_fn();
        accepts_task_fn(async_one_arg.into_task_fn());
        let task_fn = with_recv.into_task_fn();
        accepts_task_fn(task_fn);
        let task_fn = async_with_recv.into_task_fn();
        accepts_task_fn(task_fn);
        let task_fn = with_recv_and_str.into_task_fn();
        accepts_task_fn(task_fn);
        let task_fn = async_with_recv_and_str.into_task_fn();
        accepts_task_fn(task_fn);
        let task_fn = async_with_recv_and_str_and_result.into_task_fn();
        accepts_task_fn(task_fn);
        let task_fn = <Struct as AsyncTrait>::async_method.into_task_fn();
        accepts_task_fn(task_fn);
        let task_fn = Struct::inherent_method.into_task_fn();
        accepts_task_fn(task_fn);

        /*
        let task_fn = <Struct as BoxAsyncTrait>::box_async_method.into_task_fn();
        accepts_task_fn(task_fn);
        let task_fn = async_with_recv_and_str_and_lf.into_task_fn();
        accepts_task_fn(task_fn);
        */
    }
}
