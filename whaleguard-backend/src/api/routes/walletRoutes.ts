import { Router } from 'express';
import { walletController } from '../controllers/walletController';

const router = Router();

router.get('/balance/:address', walletController.getBalance);
router.get('/nfts/:address', walletController.getNFTs);

export default router;