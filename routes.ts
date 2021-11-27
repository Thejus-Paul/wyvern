import { Router } from "https://deno.land/x/oak/mod.ts";
import { getDramas, getDrama, addDrama } from "./controllers/dramas.ts";

const router = new Router();

router.get('/api/v1/dramas', getDramas)
    .get('/api/v1/dramas/:id', getDrama)
    .post('/api/v1/dramas', addDrama);

export default router;