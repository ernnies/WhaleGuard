import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Settings: React.FC = () => {
  const [selectedChains, setSelectedChains] = useState<string[]>(['Ethereum', 'XRPL']);
  const [threshold, setThreshold] = useState<number>(1000);

  const chains = ['Ethereum', 'XRPL', 'Aptos', 'Polygon', 'Bitcoin'];

  const handleChainToggle = (chain: string) => {
    setSelectedChains((prev) =>
      prev.includes(chain) ? prev.filter((c) => c !== chain) : [...prev, chain]
    );
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Settings</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Select Chains</h3>
          <div className="flex flex-wrap gap-2">
            {chains.map((chain) => (
              <motion.button
                key={chain}
                className={`px-3 py-1 rounded-lg ${
                  selectedChains.includes(chain) ? 'bg-blue-500' : 'bg-gray-600'
                }`}
                onClick={() => handleChainToggle(chain)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {chain}
              </motion.button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Alert Threshold (Tokens)</h3>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full p-2 bg-gray-700 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;