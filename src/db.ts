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

const client = new MongoClient();
await client.connect(MONGODB_URL);

const db = client.database(DB_NAME);
const users = db.collection("users");
const dramas = db.collection<DramaSchema>("dramas");
const watchedDramas = db.collection<WatchedDramaSchema>("watchedList");

export { dramas, users, watchedDramas };
