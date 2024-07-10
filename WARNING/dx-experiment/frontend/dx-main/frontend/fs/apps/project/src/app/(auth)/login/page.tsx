import { Auth } from "@/container";
import React from "react";

const LoginPage = () => {
  return (
    <main className="grid md:w-1/2 mx-auto h-dvh">
      <Auth.LoginForm />
    </main>
  );
};

export default LoginPage;
