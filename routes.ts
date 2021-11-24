import { Router } from "https://deno.land/x/oak/mod.ts";
import { getDramas, getDrama } from "./controllers/dramas.ts";

const router = new Router();

router.get('/api/v1/dramas', getDramas)
    .get('/api/v1/dramas/:id', getDrama);

export default router;