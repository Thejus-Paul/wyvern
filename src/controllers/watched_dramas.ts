import { Request, Response } from "../../deps.ts";
import { watchedDramas } from "../db.ts";
import { create } from "./concerns/crud.ts";

const addWatchedDrama = async (
  { request, response }: { request: Request; response: Response },
): Promise<void> => {
  try {
    await create({ request, response }, watchedDramas, "Watched Drama");
  } catch (error) {
    response.body = { success: false, error };
  }
};

export { addWatchedDrama };
