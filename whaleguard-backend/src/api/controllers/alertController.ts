import { Request, Response } from 'express';
import { Alert } from '../../models/Alert';
import { noditMcpService } from '../../services/nodit/noditMcpService';

export const alertController = {
  getAlerts: async (_req: Request, res: Response) => {
    try {
      const alerts = await Alert.find().sort({ timestamp: -1 }).limit(10);
      res.json(alerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      res.status(500).json({ error: 'Failed to fetch alerts' });
    }
  },

  getExplanation: async (req: Request, res: Response) => {
    try {
      const { data } = req.body;
      const explanation = await noditMcpService.generateExplanation(data);
      res.json({ explanation });
    } catch (error) {
      console.error('Error generating explanation:', error);
      res.status(500).json({ error: 'Failed to generate explanation' });
    }
  },
};