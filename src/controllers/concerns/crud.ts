import { Collection, Request, Response } from "../../../deps.ts";

const create = async (
  { request, response }: { request: Request; response: Response },
  collection: Collection<any>,
  item: string,
): Promise<void> => {
  const newValue = await request.body().value;

  const newId = await collection.insertOne(newValue);
  response.body = {
    success: true,
    id: newId,
    notice: `${item} was successfully added!`,
  };
};

export { create };
