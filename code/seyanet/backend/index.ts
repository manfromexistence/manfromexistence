// import { Elysia } from "elysia"
import translatte from "./tr"

let translation: Text;

translatte("Do you speak Russian?", { to: "bn" })
  .then((res: { text: any }) => {
    translation = res.text;
  })
  .catch((err: any) => {
    console.error(err)
  })

// const app = new Elysia()
//   .get("/", () => `the translation is ${translation}`)
//   .listen(3000)

// console.log(
//   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
// )
