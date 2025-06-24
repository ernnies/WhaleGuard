import { Request, Response } from 'express';
import { noditWebhookService } from '../../services/nodit/noditWebhookService';
import { websocketService } from '../../services/websocketService';
import { logger } from '../../utils/logger';
import { Alert } from '../../models/Alert';

export const handleWebhook = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const alert = await noditWebhookService.processWebhook(payload);
    await Alert.create(alert); // Save to MongoDB
    websocketService.broadcast(alert); // Send to front-end clients
    logger.info(`Processed Webhook: ${alert.transactionHash}`);
    res.status(200).send('Event received');
  } catch (error) {
    logger.error('Webhook error:', error);
    res.status(500).send('Internal server error');
  }
};