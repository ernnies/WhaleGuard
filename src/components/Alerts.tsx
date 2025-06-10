import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { WhaleAlert } from '../types';
import { fetchWhaleAlerts } from '../services/noditService';

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<WhaleAlert[]>([]);

  useEffect(() => {
    // Simulate Webhook/Stream subscription for real-time alerts
    const fetchAlerts = async () => {
      const data = await fetchWhaleAlerts();
      setAlerts(data);
    };

    fetchAlerts();
    // TODO: Set up Nodit Webhook/Stream for real-time updates
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2">Whale Alerts</h2>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            className="p-4 bg-gray-700 rounded-lg"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-bold">{alert.chain} - {alert.token}</p>
            <p>From: {alert.fromAddress.slice(0, 6)}...{alert.fromAddress.slice(-4)}</p>
            <p>To: {alert.toAddress.slice(0, 6)}...{alert.toAddress.slice(-4)}</p>
            <p>Amount: {alert.amount.toLocaleString()}</p>
            <p className="text-sm text-gray-400">{alert.explanation}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;