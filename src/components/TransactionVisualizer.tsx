import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Transaction, WhaleAlert } from '../types';
import { fetchRecentTransactions, fetchAccountBalance, fetchNFTsOwned } from '../services/noditService';

const TransactionVisualizer: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [nfts, setNfts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const txs = await fetchRecentTransactions();
      const bal = await fetchAccountBalance('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
      const nftData = await fetchNFTsOwned('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
      setTransactions(txs);
      setBalance(bal);
      setNfts(nftData);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
      <div className="mb-4">
        <h3 className="font-semibold">Whale Balance</h3>
        <p>{balance.toLocaleString()} ETH</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">NFTs Owned</h3>
        <div className="grid grid-cols-2 gap-2">
          {nfts.map((nft) => (
            <div key={nft.tokenId} className="p-2 bg-gray-700 rounded-lg">
              <p>Token ID: {nft.tokenId}</p>
              <p>Contract: {nft.contractAddress.slice(0, 6)}...</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {transactions.map((tx) => (
          <motion.div
            key={tx.hash}
            className="p-4 bg-gray-700 rounded-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-bold">{tx.chain}</p>
            <p>Hash: {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}</p>
            <p>Amount: {tx.amount.toLocaleString()} {tx.token}</p>
            <p>Time: {new Date(tx.timestamp).toLocaleString()}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TransactionVisualizer;