import { Request, Response } from "../../deps.ts";
import { watchedDramas } from "../db.ts";

const addWatchedDrama = async (
  { request, response }: { request: Request; response: Response },
): Promise<void> => {
  try {
    const newDramaValues = await request.body().value;

    const newDramaId = await watchedDramas.insertOne(newDramaValues);
    response.body = {
      success: true,
      id: newDramaId,
      notice: "Drama was successfully added to watched list",
    };
  } catch (error) {
    response.body = { success: false, error };
  }
};

export { addWatchedDrama };
