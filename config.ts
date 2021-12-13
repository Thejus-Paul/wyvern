import { config } from "./deps.ts";

const env = config();

export const { 
  APP_HOST, 
  DB_USERNAME, 
  DB_PASSWORD, 
  DB_CLUSTER_URL, 
  DB_NAME } = env;

export const APP_PORT: number = parseInt(env.APP_PORT, 10);