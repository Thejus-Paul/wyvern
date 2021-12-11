import { Router } from "./deps.ts";
import { getDramas, getDrama, addDrama, updateDrama, deleteDrama } from "./controllers/dramas.ts";

const router = new Router();

router.get('/api/v1/dramas', getDramas)
    .get('/api/v1/dramas/:id', getDrama)
    .post('/api/v1/dramas', addDrama)
    .put('/api/v1/dramas/:id', updateDrama)
    .delete('/api/v1/dramas/:id', deleteDrama);

export default router;