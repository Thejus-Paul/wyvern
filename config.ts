const { env } = Deno;

export const APP_HOST = env.get("APP_HOST");

export const DB_USERNAME = env.get("DB_USERNAME");

export const DB_PASSWORD = env.get("DB_PASSWORD");

export const DB_CLUSTER_URL = env.get("DB_CLUSTER_URL");

export const DB_NAME = env.get("DB_NAME");

export const APP_PORT = env.get("APP_PORT");

console.log(env.toObject());
