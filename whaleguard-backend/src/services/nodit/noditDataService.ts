import axios from 'axios';
import { config } from '../../utils/config';

// Nodit Web3 Data API base URL
const WEB3_API_URL = 'https://web3.nodit.io/v1';

// Nodit Web3 Data API service for blockchain queries
export const noditDataService = {
  // Fetch token transfers for an address using Nodit Web3 Data API
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

  // Fetch native balance for an address using Nodit Web3 Data API
  fetchAccountBalance: async (address: string, protocol: string = 'ethereum', network: string = 'mainnet') => {
    try {
      const response = await axios.post(
        `${WEB3_API_URL}/${protocol}/${network}/native/getNativeBalanceByAccount`,
        { accountAddress: address },
        {
          headers: {
            'X-API-KEY': config.noditApiKey,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      return response.data.balance / 1e18;
    } catch (error) {
      console.error('Error fetching balance:', error);
      return 0;
    }
  },

  // Fetch NFTs owned by an address using Nodit Web3 Data API
  fetchNFTsOwned: async (address: string, protocol: string = 'ethereum', network: string = 'mainnet') => {
    try {
      const response = await axios.post(
        `${WEB3_API_URL}/${protocol}/${network}/nft/getNftsOwnedByAccount`,
        {
          accountAddress: address,
          withCount: true,
          withMetadata: true,
          rpp: 10,
          page: 1,
        },
        {
          headers: {
            'X-API-KEY': config.noditApiKey,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      return response.data.items;
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      return [];
    }
  },
};