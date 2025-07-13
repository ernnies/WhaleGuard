import { Request, Response } from 'express';
import { noditDataService } from '../../services/nodit/noditDataService';

export const walletController = {
  getBalance: async (req: Request, res: Response) => {
    try {
      const { address } = req.params;
      const balance = await noditDataService.fetchAccountBalance(address);
      res.json({ balance });
    } catch (error) {
      console.error('Error fetching balance:', error);
      res.status(500).json({ error: 'Failed to fetch balance' });
    }
  },

  getNFTs: async (req: Request, res: Response) => {
    try {
      const { address } = req.params;
      const nfts = await noditDataService.fetchNFTsOwned(address);
      res.json(nfts);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      res.status(500).json({ error: 'Failed to fetch NFTs' });
    }
  },
};