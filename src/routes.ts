import { Router } from "../deps.ts";
import {
  addDrama,
  deleteDrama,
  getDrama,
  getDramas,
  updateDrama,
} from "./controllers/dramas.ts";

const router = new Router({ prefix: "/api/v1" });

router.get("/dramas", getDramas)
  .get("/dramas/:id", getDrama)
  .post("/dramas", addDrama)
  .put("/dramas/:id", updateDrama)
  .delete("/dramas/:id", deleteDrama);

export default router;
