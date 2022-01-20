import { config } from "./deps.ts";

const env = Deno.env.toObject();

export const {
  APP_HOST,
  APP_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_CLUSTER_URL,
  DB_NAME,
} = env;
