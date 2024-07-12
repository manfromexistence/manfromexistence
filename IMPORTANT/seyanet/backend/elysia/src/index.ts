import { Elysia } from "elysia";

// const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);
// const app = new Elysia()
//   .get('/', () => 'hi')
//   .onError(({ code }) => {
//     if (code === 'NOT_FOUND')
//       return 'Route not found :('
//   })
//   .listen(3000)
// index.ts
import app from './api';

app.listen(3000, () => console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`));



