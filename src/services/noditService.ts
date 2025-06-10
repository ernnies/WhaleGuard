import axios from 'axios';
import { WhaleAlert, Transaction } from '../types';

const NODIT_API_KEY = process.env.REACT_APP_NODIT_API_KEY || '****'; // Replace with your Nodit API key
const WEB3_API_URL = 'https://web3.nodit.io/v1';

export const fetchWhaleAlerts = async (): Promise<WhaleAlert[]> => {
  // Placeholder: Fetch large token transfers using Nodit Web3 Data API
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

    // Simulate AI explanation via Nodit MCP
    const alerts: WhaleAlert[] = response.data.transfers
      .filter((tx: any) => tx.value > 1000) // Example threshold
      .map((tx: any, index: number) => ({
        id: `${tx.hash}-${index}`,
        chain: 'Ethereum',
        transactionHash: tx.hash,
        fromAddress: tx.from,
        toAddress: tx.to,
        amount: tx.value,
        token: tx.tokenSymbol,
        timestamp: tx.timestamp,
        explanation: `Large transfer detected: ${tx.value} ${tx.tokenSymbol} moved from ${tx.from.slice(
          0,
          6
        )}... to ${tx.to.slice(0, 6)}... on ${new Date(tx.timestamp).toLocaleString()}. Possible whale activity or liquidity shift.`, // Simulated MCP output
      }));

    return alerts;
  } catch (error) {
    console.error('Error fetching whale alerts:', error);
    return [];
  }
};

export const fetchRecentTransactions = async (): Promise<Transaction[]> => {
  // Placeholder: Fetch recent transactions using Nodit Web3 Data API
  try {
    const response = await axios.post(
      `${WEB3_API_URL}/xrpl/mainnet/transactions`,
      {
        // Example parameters for XRPL transactions
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