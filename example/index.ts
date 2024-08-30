import { logger } from "@tqman/nice-logger";
import Elysia from "elysia";

function wait(time: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

const child = new Elysia({ prefix: "child" })
  .get("/", "Hello via Child!")
  .get("/error", () => {
    throw new Error("Error via Child!");
  });

const app = new Elysia()
  .use(
    logger({
      mode: "live",
    }),
  )
  .use(child)
  .get("/", "Hello via Elysia!")
  .get("/wait/:time", ({ params: { time } }) =>
    wait(+time).then(() => `Waited ${time}ms`),
  )
  .listen(3000);

const req = (path: string) => new Request(`http://localhost:3000${path}`);

await app.handle(req("/"));
await app.handle(req("/child"));
await app.handle(req("/none"));
await app.handle(req("/child/error"));

await Promise.all(
  [req("/wait/5000"), req("/child"), req("/wait/3000")].map(req =>
    app.handle(req),
  ),
);
