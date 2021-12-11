import { Application } from "./deps.ts";
import router from "./routes.ts";
import { APP_HOST, APP_PORT } from "./config.js";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port:${APP_PORT}...`);

await app.listen(`${APP_HOST}:${APP_PORT}`);
