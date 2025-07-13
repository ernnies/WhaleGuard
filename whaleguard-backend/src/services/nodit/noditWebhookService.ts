import { WhaleAlert } from '../../types/alertTypes';
import { noditMcpService } from './noditMcpService';

// Processes Nodit Webhook/Stream payloads for real-time whale alerts
export const noditWebhookService = {
  processWebhook: async (payload: any): Promise<WhaleAlert> => {
    // Extract fields from Nodit Webhook payload (Web3 Stream API)
    const { protocol, transactionHash, from, to, value, tokenSymbol, timestamp } = payload;

    // Create alert object
    const alert: WhaleAlert = {
      id: `${transactionHash}-${Date.now()}`,
      chain: protocol || 'Unknown',
      transactionHash,
      fromAddress: from,
      toAddress: to,
      amount: value / 1e18, // Convert Wei to native token
      token: tokenSymbol || 'Unknown',
      timestamp: timestamp || new Date().toISOString(),
      explanation: 'Processing...',
    };

    // Generate AI explanation using Nodit MCP
    try {
      const explanation = await noditMcpService.generateExplanation({
        chain: alert.chain,
        amount: alert.amount,
        token: alert.token,
        fromAddress: alert.fromAddress,
        toAddress: alert.toAddress,
      });
      alert.explanation = explanation;
    } catch (error) {
      console.error('MCP explanation error:', error);
      alert.explanation = 'Failed to generate AI explanation';
    }

    return alert;
  },
};