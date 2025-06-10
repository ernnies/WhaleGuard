import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Alerts from '../components/Alerts';
import TransactionVisualizer from '../components/TransactionVisualizer';
import Settings from '../components/Settings';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <motion.div
        className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:col-span-2">
          <Alerts />
          <TransactionVisualizer />
        </div>
        <Settings />
      </motion.div>
    </div>
  );
};

export default Dashboard;