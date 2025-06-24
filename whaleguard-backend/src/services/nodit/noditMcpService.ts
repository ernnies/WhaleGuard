import axios from 'axios';
import { config } from '../../utils/config';

export const noditMcpService = {
  generateExplanation: async (data: any): Promise<string> => {
    try {
      const response = await axios.post('http://localhost:3002/mcp', {
        data,
        prompt: 'Explain this blockchain transaction in natural language.',
      });
      return response.data.explanation || 'No explanation available';
    } catch (error) {
      console.error('Error generating MCP explanation:', error);
      return 'Failed to generate explanation';
    }
  },
};