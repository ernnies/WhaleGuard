import axios from 'axios';
import { WhaleAlert, Transaction } from '../types';

const NODIT_API_KEY = process.env.REACT_APP_NODIT_API_KEY || '****'; // Replace with your Nodit API key
const WEB3_API_URL = 'https://web3.nodit.io/v1';

export const fetchWhaleAlerts = async (): Promise<WhaleAlert[]> => {
  try {
    const response = await axios.post(
      `${WEB3_API_URL}/ethereum/mainnet/token/getTokenTransfersByAccount`,
      {
        accountAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // Example whale address
        fromDate: '2025-06-01T00:00:00+00:00',
        toDate: '2025-06-10T23:59:59+00:00',
      },
      {
        headers: {
          'X-API-KEY': NODIT_API_KEY,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    const alerts: WhaleAlert[] = response.data.transfers
      .filter((tx: any) => tx.value > 1000) // Example threshold
      .map((tx: any, index: number) => ({
        id: `${tx.hash}-${index}`,
        chain: 'Ethereum',
        transactionHash: tx.hash,
        fromAddress: tx.from,
        toAddress: tx.to,
        amount: tx.value / 1e18, // Convert Wei to ETH
        token: tx.tokenSymbol,
        timestamp: tx.timestamp,
        explanation: `Large transfer detected: ${tx.value / 1e18} ${tx.tokenSymbol} moved from ${tx.from.slice(
          0,
          6
        )}... to ${tx.to.slice(0, 6)}... on ${new Date(tx.timestamp).toLocaleString()}. Possible whale activity or liquidity shift.`,
      }));

    return alerts;
  } catch (error) {
    console.error('Error fetching whale alerts:', error);
    return [];
  }
};

export const fetchRecentTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await axios.post(
      `${WEB3_API_URL}/xrpl/mainnet/transactions`,
      {
        limit: 10,
      },
      {
        headers: {
          'X-API-KEY': NODIT_API_KEY,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    const transactions: Transaction[] = response.data.transactions.map((tx: any, index: number) => ({
      chain: 'XRPL',
      hash: tx.hash,
      from: tx.account,
      to: tx.destination,
      amount: tx.amount.value,
      token: tx.amount.currency,
      timestamp: tx.date,
    }));

    return transactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};

export const fetchAccountBalance = async (
  address: string,
  protocol: string = 'ethereum',
  network: string = 'mainnet'
): Promise<number> => {
  try {
    const response = await axios.post(
      `${WEB3_API_URL}/${protocol}/${network}/native/getNativeBalanceByAccount`,
      { accountAddress: address },
      {
        headers: {
          'X-API-KEY': NODIT_API_KEY,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    return response.data.balance / 1e18; // Convert Wei to ETH or equivalent
  } catch (error) {
    console.error('Error fetching balance:', error);
    return 0;
  }
};

export const fetchNFTsOwned = async (
  address: string,
  protocol: string = 'ethereum',
  network: string = 'mainnet'
): Promise<any[]> => {
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
          'X-API-KEY': NODIT_API_KEY,
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
};