import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3001'),
  websocketPort: parseInt(process.env.WEBSOCKET_PORT || '8081'),
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/whaleguard',
  noditApiKey: process.env.NODIT_API_KEY || 'your_nodit_api_key_here',
  mcpServerUrl: process.env.MCP_SERVER_URL || 'http://localhost:3002',
};