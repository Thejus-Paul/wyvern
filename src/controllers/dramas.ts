import { Bson, Request, Response } from "../../deps.ts";
import { dramas } from "../db.ts";

const getDramas = async ({ response }: { response: Response }): Promise<void> => {
  try {
    const allDramas = await dramas.find({}, { noCursorTimeout: false }).toArray();
    response.body = { success: true, data: allDramas };
  } catch (error) {
    response.body = { success: false, error };
  }
};

const getDrama = async ({ params, response }: { params: { id: string }, response: Response }): Promise<void> => {
  try {
    const drama = await dramas.findOne({ _id: new Bson.ObjectId(params.id) }, { noCursorTimeout: false });
    response.body = { success: true, data: drama ? drama : "Drama not found!" };
  } catch (error) {
    response.body = { success: false, error };
  }
}

const addDrama =  async ({ request, response }: { request: Request, response: Response }): Promise<void> => {
  try {
    const newDramaValues = await request.body().value;

    const newDramaId = await dramas.insertOne(newDramaValues);
    response.body = { success: true, id: newDramaId, notice: "Drama was successfully added" };
  }
  catch (error) {
    response.body = { success: false, error };
  }
};

const updateDrama =  async ({ params, request, response }: { params: { id: string }, request: Request, response: Response }): Promise<void> => {
  try {
    const newDramaValues = await request.body().value;

    await dramas.updateOne({ _id: new Bson.ObjectId(params.id)}, { $set: newDramaValues });
    response.body = { success: true, notice: "Drama was successfully updated!" };
  } catch (error) {
    response.body = { success: false, error };
  }
};

const deleteDrama = async ({ params, response }: { params: { id: string }, response: Response }): Promise<void> => {
  try {
    await dramas.deleteOne({ _id: new Bson.ObjectId(params.id) });
    response.body = { success: true, notice: "Drama was successfully deleted!" };
  } catch (error) {
    response.body = { success: false, error };
  }
}

export { 
  getDramas, 
  getDrama, 
  addDrama, 
  updateDrama, 
  deleteDrama };