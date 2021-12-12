import { Request, Response } from "../../deps.ts";
import { Drama } from '../types.ts'

let dramas: Drama[] = [];

const getDramas = ({ response }: { response: Response }): void => {
  response.body = {
    success: true,
    data: dramas,
  };
};

const getDrama = ({ params, response }: { params: { id: string }, response: Response }): void => {
  const drama: Drama | undefined = dramas.find(({ id }) => id == params.id);

  response.status = drama ? 200 : 404;
  if (drama) {
    response.body = {
      success: true,
      data: drama,
    };
  } else {
    response.body = {
      success: false,
      error: "Drama Not Found!",
    };
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