import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Transaction } from '../types';
import { fetchRecentTransactions } from '../services/noditService';

const TransactionVisualizer: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRecentTransactions();
      setTransactions(data);
    };

    fetchData();
    // TODO: Set up Nodit Webhook/Stream for real-time updates
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
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