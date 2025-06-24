import { WhaleAlert } from '../../types/alertTypes';

export const noditWebhookService = {
  processWebhook: async (payload: any): Promise<WhaleAlert> => {
    const { protocol, transactionHash, from, to, value, tokenSymbol, timestamp } = payload;
    return {
      id: `${transactionHash}-${Date.now()}`,
      chain: protocol || 'Unknown',
      transactionHash,
      fromAddress: from,
      toAddress: to,
      amount: value / 1e18, // Convert Wei to ETH or equivalent
      token: tokenSymbol || 'Unknown',
      timestamp: timestamp || new Date().toISOString(),
      explanation: 'Processing...',
    };
  },
};