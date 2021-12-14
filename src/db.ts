import { MongoClient } from "../deps.ts";
import { DB_USERNAME, DB_PASSWORD, DB_CLUSTER_URL, DB_NAME } from "../config.ts";
import { DramaSchema } from "./types.ts";

const MONGODB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER_URL}/${DB_NAME}?authMechanism=SCRAM-SHA-1`;

const client = new MongoClient();
await client.connect(MONGODB_URL);

const db = client.database(DB_NAME);
const dramas = db.collection<DramaSchema>("dramas");

export { dramas };