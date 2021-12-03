import { Drama } from '../types.ts'

let dramas: Drama[] = [];

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

const updateDrama =  async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { error: "Invalid data" };
    return;
  }
  const drama = dramas.find(({ id }) => id === params.id);

  if (drama) {
    const { name, latestEpisode } = await request.body().value;

    if (!name || !latestEpisode) {
      response.status = 422;
      response.body = { error: "Incorrect data. Name or latest episode are required." };
      return;
    } else {
      drama.name = name;
      drama.latestEpisode = latestEpisode;
      response.body = { success: true, id: drama?.id };
    }
  } else {
    response.status = 404;
    response.body = {
        success: false,
        error: "No drama found!",
    };
  }
};

const deleteDrama = ({ params, response}: { params: { id: string }, response: any}) => {
  dramas = dramas.filter(({ id }) => id !== params.id);
  response.body = {
    success: true,
    messsage: "Drama Removed"
  }
}

export { getDramas, getDrama, addDrama, updateDrama, deleteDrama };