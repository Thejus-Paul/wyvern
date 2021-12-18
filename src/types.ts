import { Bson } from "../deps.ts";

export interface DramaSchema {
  _id?: Bson.ObjectId | string;
  name: string;
  otherNames: string;
  country: string;
  genre: string;
  aired: string;
  status: string;
  summary: string;
  image: string;
  latestEpisode: number;
  slug: string;
  hash: string;
}

export interface MapDramaSchema {
  [key: string]: string;
}
