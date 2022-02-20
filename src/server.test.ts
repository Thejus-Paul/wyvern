// deno-lint-ignore-file
import { superoak } from "../deps.ts";
import { app } from "./server.ts";
import { DramaSchema, MapDramaSchema } from "./types.ts";

const SAMPLE_DATA: DramaSchema = {
  "name": "Sample Name",
  "otherNames": '["sample","names"]',
  "country": "South Korea",
  "genre": '["sample","genres"]',
  "aired": "Jun 19, 2021 - Aug 21, 2021",
  "status": "Completed",
  "summary": "sample summary",
  "image": "sample image blob",
  "latestEpisode": 10,
  "hash":
    "dbe4e4eaf184cd9c6bf875f5a7352d833cd486eb8764ae148c103189b230448a32f7e95ce814fad4c1344f2f404ae51c4a21d047d70486eb01749d217c9a9d0e",
  "slug": "sample-slug",
};

const assertNotSameData = (actual: MapDramaSchema, expected: DramaSchema) => {
  let isSameData = true;
  Object.entries(expected).forEach(([key, value]) => {
    if (value !== actual[key]) {
      isSameData = false;
    }
  });
  return !isSameData;
};

Deno.test("it should do CRUD operations on the drama", async () => {
  let id = "";

  const createRequest = await superoak(app);
  await createRequest.post("/api/v1/dramas")
    .set("Content-Type", "application/json; charset=utf-8")
    .send(JSON.stringify(SAMPLE_DATA))
    .expect(({ body }) => {
      try {
        id = body.id;
      } catch (error) {
        throw new Error("No ID found in the response body");
      }
    });

  const readRequest = await superoak(app);
  await readRequest.get(`/api/v1/dramas/${id}`)
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(({ body }) => {
      const sampleData: DramaSchema = {
        ...SAMPLE_DATA,
        "_id": id,
      };
      if (assertNotSameData(body.data, sampleData)) {
        throw new Error("Not the same data! Create was not successful");
      }
    });

  const updateRequest = await superoak(app);
  await updateRequest.put(`/api/v1/dramas/${id}`)
    .set("Content-Type", "application/json; charset=utf-8")
    .send(JSON.stringify({ latestEpisode: SAMPLE_DATA.latestEpisode + 1 }))
    .expect(({ body }) => body.success);

  const readUpdatedRequest = await superoak(app);
  await readUpdatedRequest.get(`/api/v1/dramas/${id}`)
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(({ body }) => {
      const updatedSampleData: DramaSchema = {
        ...SAMPLE_DATA,
        "_id": id,
        latestEpisode: SAMPLE_DATA.latestEpisode + 1,
      };
      if (assertNotSameData(body.data, updatedSampleData)) {
        throw new Error("Not the same data! Update was not successful");
      }
    });

  const deleteRequest = await superoak(app);
  await deleteRequest.delete(`/api/v1/dramas/${id}`)
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(({ body }) => body.success);
});
