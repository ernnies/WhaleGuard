import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { WhaleAlert } from '../types';
import axios from 'axios';
import { config } from '.././utils/config';
const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<WhaleAlert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection to backend
    const ws = new WebSocket(`ws://localhost:${config.websocketPort}`); // e.g., ws://localhost:8081

    ws.onopen = () => {
      console.log('WebSocket connected');
      setLoading(false);
    };

    ws.onmessage = async (event) => {
      try {
        const newAlert: WhaleAlert = JSON.parse(event.data);

        // Fetch AI explanation from backend (MCP service)
        const response = await axios.post('http://localhost:3001/api/alerts/explanation', {
          data: {
            chain: newAlert.chain,
            amount: newAlert.amount,
            token: newAlert.token,
            fromAddress: newAlert.fromAddress,
            toAddress: newAlert.toAddress,
            timestamp: newAlert.timestamp,
          },
        });

        const updatedAlert = {
          ...newAlert,
          explanation: response.data.explanation || 'No explanation available.',
        };

        setAlerts((prev) => [updatedAlert, ...prev.slice(0, 9)]); // Keep latest 10 alerts
      } catch (err) {
        console.error('Error processing WebSocket message:', err);
        setError('Failed to process alert');
      }
    };

    ws.onerror = () => {
      console.error('WebSocket error');
      setError('Failed to connect to real-time alerts');
      setLoading(false);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setError('Real-time alerts disconnected');
    };

    // Fetch initial alerts from backend to populate dashboard
    const fetchInitialAlerts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/alerts');
        setAlerts(response.data.slice(0, 10)); // Limit to 10 alerts
        setLoading(false);
      } catch (err) {
        console.error('Error fetching initial alerts:', err);
        setError('Failed to load alerts');
        setLoading(false);
      }
    };

    fetchInitialAlerts();

    // Cleanup WebSocket on component unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2 text-blue-400">Whale Alerts</h2>
      {loading ? (
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : alerts.length === 0 ? (
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