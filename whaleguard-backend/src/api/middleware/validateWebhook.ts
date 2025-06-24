import { Request, Response, NextFunction } from 'express';
import { logger } from '../../utils/logger';

export const validateWebhook = (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  if (!payload || !payload.protocol || !payload.transactionHash) {
    logger.error('Invalid Webhook payload');
    return res.status(400).json({ error: 'Invalid Webhook payload' });
  }
  next();
};