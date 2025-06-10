import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 p-4 shadow-md">
      <motion.div
        className="flex items-center justify-between"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-blue-400">WhaleGuard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Nodit Connected</span>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;