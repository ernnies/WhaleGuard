import { Request, Response } from 'express';
import { analyticsService } from '../../services/analyticsService';

export const analyticsController = {
  getPredictions: async (req: Request, res: Response) => {
    try {
      const { address } = req.params;
      const predictions = await analyticsService.getPredictions(address);
      res.json(predictions);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      res.status(500).json({ error: 'Failed to fetch predictions' });
    }
  },
};