import axios from 'axios';
import { config } from '../../utils/config';

// Nodit MCP service for AI-driven blockchain analysis
export const noditMcpService = {
  // Generate natural language explanation using Nodit MCP server
  generateExplanation: async (data: any): Promise<string> => {
    try {
      const response = await axios.post(
        'http://localhost:3002/mcp', // Nodit MCP server endpoint
        {
          data,
          prompt: 'Explain this blockchain transaction in natural language, focusing on potential market impact.',
        },
        {
          headers: {
            'X-API-KEY': config.noditApiKey,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      return response.data.explanation || 'No explanation available';
    } catch (error) {
      console.error('Error generating MCP explanation:', error);
      return 'Failed to generate AI explanation';
    }
  },
};