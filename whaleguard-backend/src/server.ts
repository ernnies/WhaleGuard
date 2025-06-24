import WebSocket from 'ws';
import { config } from './utils/config';
import { logger } from './utils/logger';

const wss = new WebSocket.Server({ port: config.websocketPort });

wss.on('connection', (ws) => {
  logger.info('New WebSocket client connected');
  ws.on('close', () => logger.info('WebSocket client disconnected'));
});

logger.info(`WebSocket server running on port ${config.websocketPort}`);

export { wss };