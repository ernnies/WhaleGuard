import { Router } from 'express';
import { alertController } from '../controllers/alertController';

const router = Router();

router.get('/', alertController.getAlerts);
router.post('/explanation', alertController.getExplanation);

export default router;