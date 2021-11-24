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

export { getDramas, getDrama };