import { Auth } from "@/container";
import React from "react";

const SignUpPage = () => {
  return (
    <main className="grid md:w-1/2 mx-auto h-dvh">
      <Auth.SignupForm />
    </main>
  );
};

export default SignUpPage;
