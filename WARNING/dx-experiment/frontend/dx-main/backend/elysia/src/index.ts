import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello Mahatab Hossain Sumon.").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
