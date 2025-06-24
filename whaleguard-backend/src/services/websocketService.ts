import { wss } from '../websocketServer';
import { logger } from '../utils/logger';
import { WhaleAlert } from '../types/alertTypes';

export const websocketService = {
  broadcast: (alert: WhaleAlert) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(alert));
        logger.info(`Broadcast alert: ${alert.transactionHash}`);
      }
    });
  },
};