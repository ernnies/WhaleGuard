import axios from 'axios';
import { config } from '../../utils/config';

const WEB3_API_URL = 'https://web3.nodit.io/v1';

export const noditDataService = {
  fetchTokenTransfers: async (address: string, protocol: string = 'ethereum', network: string = 'mainnet') => {
    try {
      const response = await axios.post(
        `${WEB3_API_URL}/${protocol}/${network}/token/getTokenTransfersByAccount`,
        { accountAddress: address },
        {
          headers: {
            'X-API-KEY': config.noditApiKey,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      return response.data.transfers;
    } catch (error) {
      console.error('Error fetching token transfers:', error);
      return [];
    }
  },
};