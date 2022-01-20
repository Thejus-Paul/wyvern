import { Application, parse } from "../deps.ts";
import { APP_HOST, APP_PORT } from "../config.ts";
import router from "./routes.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

const { args } = Deno;
const port = args.length === 0 ? APP_PORT : parse(args).port;

if (import.meta.main && port) {
  console.log(`Listening on port:${port}...`);
  await app.listen(`${APP_HOST}:${port}`);
}

export { app };
