import { Router } from 'express';
import { analyticsController } from '../controllers/analyticsController';

const router = Router();

router.get('/predictions/:address', analyticsController.getPredictions);

export default router;