import { Router } from 'express';
import { handleWebhook } from '../controllers/webhookController';
import { validateWebhook } from '../middleware/validateWebhook';

const router = Router();

router.post('/', validateWebhook, handleWebhook);

export default router;