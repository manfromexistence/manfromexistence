"use client";

import { General } from "@/components";
import { LoginFormSchema, LoginFormType, cn } from "@/helpers";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm<LoginFormType>({ resolver: zodResolver(LoginFormSchema) });

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="self-center justify-self-center md:w-1/2 w-11/12 rounded-md">
      <General.BackButton />
      <h2 className="text-3xl font-bold py-3">Freelance Stuffs</h2>
      <h3 className="text-xl font-bold">Welcome back</h3>
      <p className="text-gray-600 py-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia,
        corporis.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="flex flex-col gap-2 py-2">
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="Enter your email"
            className={cn(
              "border focus:outline-none py-2 px-2 rounded-md focus:border-gray-500",
              errors.email && "border-red-500 focus:border-red-500"
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Enter your password"
            className={cn(
              "border focus:outline-none py-2 px-2 rounded-md focus:border-gray-500",
              errors.password && "border-red-500 focus:border-red-500"
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="py-2">
          <Link href="/auth/forgot-password" className="text-blue-500 text-sm">
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          className="bg-black hover:bg-black/90 rounded-md text-white w-full p-2 my-4"
        >
          {isSubmitting ? "Submitting..." : "Login"}
        </button>
        <div className="flex items-center gap-4 mb-4">
          <hr className=" flex-1" />
          <p className="text-center">Or</p>
          <hr className="flex-1" />
        </div>
        <button
          type="button"
          className="border hover:bg-gray-100 rounded-md w-full p-2 flex items-center justify-center gap-2"
        >
          <span>
            <General.Icons.Google />
          </span>
          <span>Login with Google</span>
        </button>
      </form>
      <div className="my-4">
        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
