import { Application, parse } from "../deps.ts";
import { APP_HOST, APP_PORT } from "../config.ts";
import router from "./routes.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

const { args } = Deno;
const argPort = parse(args).port;
const port = argPort ? Number(argPort) : APP_PORT;

console.log(`Listening on port:${port}...`);

if (import.meta.main) {
  await app.listen(`${APP_HOST}:${port}`);
}

export { app };
