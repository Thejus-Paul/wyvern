import { Bson, Request, Response } from "../../deps.ts";
import { Dramas } from "../db.ts";
import { Drama } from '../types.ts'

let dramas: Drama[] = [];

const getDramas = async ({ response }: { response: Response }): Promise<void> => {
  try {
    const allDramas = await Dramas.find({}, { noCursorTimeout: false }).toArray();
    response.body = { success: true, data: allDramas };
  } catch (error) {
    response.body = { success: false, error };
  }
};

const getDrama = async ({ params, response }: { params: { id: string }, response: Response }): Promise<void> => {
  try {
    const drama = await Dramas.findOne({ _id: new Bson.ObjectId(params.id) }, { noCursorTimeout: false });
    response.body = { success: true, data: drama };
  } catch (error) {
    response.body = { success: false, error };
  }
}

const addDrama =  async ({ request, response }: { request: Request, response: Response }): Promise<void> => {
  try {
    const { name, latestEpisode } = await request.body().value;

    const drama = {
      id: globalThis.crypto.randomUUID(),
      name,
      latestEpisode,
    };
    dramas.push(drama);

    response.body = { success: true, id: drama.id };
  }
  catch (error) {
    response.body = { success: false, error };
  }
};

const updateDrama =  async ({ params, request, response }: { params: { id: string }, request: Request, response: Response }): Promise<void> => {
  const drama = dramas.find(({ id }) => id === params.id);

  try {
    if (drama) {
      const { name, latestEpisode } = await request.body().value;
  
      drama.name = name;
      drama.latestEpisode = latestEpisode;
      response.body = { success: true, id: drama?.id };
    }
  } catch (error) {
    response.body = { success: false, error };
  }
};

const deleteDrama = ({ params, response }: { params: { id: string }, response: Response }): void => {
  dramas = dramas.filter(({ id }) => id !== params.id);
  response.body = {
    success: true,
    messsage: "Drama Removed"
  }
}

export { getDramas, getDrama, addDrama, updateDrama, deleteDrama };