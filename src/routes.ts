import { Router } from "../deps.ts";
import {
  addDrama,
  deleteDrama,
  getDrama,
  getDramas,
  updateDrama,
} from "./controllers/dramas.ts";
import { login, register } from "./controllers/auth.ts";
import {
  addWatchedDrama,
  getWatchedDramas,
} from "./controllers/watched_dramas.ts";

const router = new Router({ prefix: "/api/v1" });

router.get("/dramas", getDramas)
  .get("/dramas/:id", getDrama)
  .post("/dramas", addDrama)
  .put("/dramas/:id", updateDrama)
  .delete("/dramas/:id", deleteDrama)
  .get("/watched", getWatchedDramas)
  .post("/watched_dramas", addWatchedDrama)
  .post("/register", register)
  .post("/login", login);

export default router;
