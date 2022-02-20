import { Collection, Request, Response } from "../../../deps.ts";

const create = async (
  { request, response }: { request: Request; response: Response },
  collection: Collection<any>,
  item: string,
  otherValues = {},
): Promise<void> => {
  let newValue = await request.body().value;

  newValue = otherValues ? { ...newValue, ...otherValues } : newValue;

  const newId = await collection.insertOne(newValue);
  response.body = {
    success: true,
    id: newId,
    notice: `${item} was successfully added!`,
  };
};

export { create };
