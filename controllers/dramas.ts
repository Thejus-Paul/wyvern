import { Drama } from '../types.ts'

const dramas: Drama[] = [];

const getDramas = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: dramas,
  };
};

const getDrama = ({ params, response }: { params: { id: string }, response: any }) => {
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

const addDrama =  async ({ request, response }: { request: any, response: any }) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { error: "Invalid data" };
    return;
  }

  const { name, latestEpisode } = await request.body().value;

  if (!name || !latestEpisode) {
    response.status = 422;
    response.body = { error: "Incorrect data. Name and latest episode are required." };
    return;
  }

  const drama = {
    id: globalThis.crypto.randomUUID(),
    name,
    latestEpisode,
  };

  dramas.push(drama);

  response.body = { success: true, id: drama.id };
};

export { getDramas, getDrama, addDrama };