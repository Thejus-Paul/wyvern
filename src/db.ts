import { MongoClient } from "../deps.ts";
import {
  DB_CLUSTER_URL,
  DB_NAME,
  DB_PASSWORD,
  DB_USERNAME,
} from "../config.ts";
import { DramaSchema, WatchedDramaSchema } from "./types.ts";

const MONGODB_URL =
  `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER_URL}/${DB_NAME}?authMechanism=SCRAM-SHA-1`;

console.log(MONGODB_URL);

const client = new MongoClient();
await client.connect(MONGODB_URL);

const db = client.database(DB_NAME);
const dramas = db.collection<DramaSchema>("dramas");
const watchedDramas = db.collection<WatchedDramaSchema>("data");

export { dramas, watchedDramas };
