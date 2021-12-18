import { Application } from "../deps.ts";
import { APP_HOST, APP_PORT } from "../config.ts";
import router from "./routes.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port:${APP_PORT}...`);

if (import.meta.main) {
  await app.listen(`${APP_HOST}:${APP_PORT}`);
}

export { app };
