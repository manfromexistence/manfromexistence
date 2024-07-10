"use client";

import { General } from "@/components";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const SignupForm = () => {
  const {} = useForm();

  return (
    <div className="self-center justify-self-center md:w-1/2 w-11/12 rounded-md">
      <General.BackButton />
      <h2 className="text-3xl font-bold py-3">Freelance Stuffs</h2>
      <h3 className="text-xl font-bold">Welcome to Freelance Stuffs</h3>
      <p className="text-gray-600 py-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia,
        corporis.
      </p>
      <form className="">
        <div className="flex flex-col gap-2 py-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="border focus:outline-none py-2 px-2 rounded-md focus:border-gray-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="border focus:outline-none py-2 px-2 rounded-md focus:border-gray-500"
          />
        </div>
        <button
          type="submit"
          className="bg-black hover:bg-black/90 rounded-md text-white w-full p-2 my-4 mt-6"
        >
          Sign up
        </button>
        <div className="flex items-center gap-4 mb-4">
          <hr className=" flex-1" />
          <p className="text-center">Or</p>
          <hr className="flex-1" />
        </div>
        <button
          type="submit"
          className="border hover:bg-gray-100 rounded-md w-full p-2 flex items-center justify-center gap-2"
        >
          <span>
            <General.Icons.Google />
          </span>
          <span>Sign up with Google</span>
        </button>
      </form>
      <div className="my-4">
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
