import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WhaleAlert } from '../types';

const Alerts: React.FC = () => {
  const [alerts] = useState<WhaleAlert[]>([
    // Virtual sample alert for immediate UI display
    {
      id: 'sample-1',
      chain: 'Ethereum',
      transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      fromAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      toAddress: '0xabc1234567890abcdef1234567890abcdef12345678',
      amount: 1500,
      token: 'ETH',
      timestamp: new Date().toISOString(),
      explanation: 'Sample alert: Large transfer of 1,500 ETH detected from a whale wallet to an exchange, potentially indicating a sell-off.',
    },
  ]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2 text-blue-400">Whale Alerts</h2>
      {alerts.length === 0 ? (
        <div className="text-gray-400 text-center">No alerts available</div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              className="p-4 bg-gray-700 rounded-lg border border-gray-600 hover:border-blue-500 transition-colors"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-bold text-blue-300">
                {alert.chain} - {alert.token}
              </p>
              <p className="text-sm text-gray-300">
                From: {alert.fromAddress.slice(0, 6)}...{alert.fromAddress.slice(-4)}
              </p>
              <p className="text-sm text-gray-300">
                To: {alert.toAddress.slice(0, 6)}...{alert.toAddress.slice(-4)}
              </p>
              <p className="text-gray-200">Amount: {alert.amount.toLocaleString()}</p>
              <p className="text-sm text-gray-400 mt-2">{alert.explanation}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(alert.timestamp).toLocaleString()}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Alerts;