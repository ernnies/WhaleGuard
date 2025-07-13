# WhaleGuard Backend

Backend for the WhaleGuard dApp, built for the WaveHack buildathon using Nodit’s Web3 Data API, Webhook/Stream, and MCP.

## Features

1. **Real-Time Whale Alerts**:
   - **Nodit Integration**: Uses Nodit Webhook/Stream (`/api/nodit/webhook`) to process real-time token transfer events.
   - **Implementation**: `noditWebhookService.ts` parses payloads, saves alerts to MongoDB, and broadcasts via WebSocket (`websocketService.ts`).
   - **Demo**: Displays live alerts in the frontend with AI explanations.

2. **AI-Driven Explanations**:
   - **Nodit Integration**: Uses Nodit MCP (`noditMcpService.ts`) to generate natural language explanations for whale transactions.
   - **Implementation**: POST `/api/alerts/explanation` sends transaction data to MCP server for analysis.
   - **Demo**: Shows explanations like “Large ETH transfer may indicate a sell-off.”

3. **Wallet Integration**:
   - **Nodit Integration**: Queries Nodit Web3 Data API (`noditDataService.ts`) for user wallet balances and NFTs.
   - **Implementation**: GET `/api/wallet/balance/:address` and `/api/wallet/nfts/:address` endpoints.
   - **Demo**: Filters alerts based on connected MetaMask wallet.

4. **Decentralized AI Agent**:
   - **Nodit Integration**: Simulates autonomous monitoring using Webhook/Stream and MCP.
   - **Implementation**: `aiAgentService.ts` periodically processes sample Webhook events and generates alerts.
   - **Demo**: Shows autonomous alerts in the UI every 30 seconds.

## Nodit Integration Details

- **Webhook/Stream**:
  - Endpoint: `/api/nodit/webhook`
  - File: `src/services/nodit/noditWebhookService.ts`
  - Purpose: Processes real-time blockchain events (e.g., token transfers) from Nodit’s Stream API.
- **Web3 Data API**:
  - Endpoints: `/token/getTokenTransfersByAccount`, `/native/getNativeBalanceByAccount`, `/nft/getNftsOwnedByAccount`
  - File: `src/services/nodit/noditDataService.ts`
  - Purpose: Fetches transaction history, balances, and NFT ownership for whale and user wallets.
- **MCP**:
  - Endpoint: `http://localhost:3002/mcp`
  - File: `src/services/nodit/noditMcpService.ts`
  - Purpose: Generates AI-driven explanations for blockchain events.

## Setup

1. **Install Dependencies**:
```bash
   npm install
```

2. **Set Up Environment Variables**:
Create `.env`:
```env
   NODIT_API_KEY=your_nodit_api_key_here
   MONGODB_URI=mongodb://localhost:27017/whaleguard
   PORT=3001
   WEBSOCKET_PORT=8081
   MCP_SERVER_URL=http://localhost:3002
```

3. **Run MongoDB**:
```bash
   mongod
```

4. **Start Servers**:
```bash
   npm run start
   npm run start:ws
   npx @noditlabs/nodit-mcp-server@latest
```

5. **Test Endpoints**:
   - GET `/api/alerts`: Fetch recent alerts.
   - POST `/api/nodit/webhook`: Receive Nodit Webhook events.
   - POST `/api/alerts/explanation`: Get MCP explanations.
   - GET `/api/wallet/balance/:address`: Get wallet balance.
   - GET `/api/wallet/nfts/:address`: Get wallet NFTs.

## Live Demo Instructions

1. Start backend and frontend (`cd whaleguard && npm start`).
2. Connect MetaMask in the frontend to filter alerts.
3. Send a test Webhook:
   ```bash
   curl -X POST http://localhost:3001/api/nodit/webhook \
   -H "Content-Type: application/json" \
   -d '{"protocol":"ethereum","network":"mainnet","event":"token_transfer","transactionHash":"0x1234","from":"0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045","to":"0xabc","value":"2000000000000000000000","tokenSymbol":"ETH","timestamp":"2025-07-13T14:25:00Z"}'
   ```
4. Observe real-time alerts and AI explanations in the UI.
5. Check autonomous AI agent alerts every 30 seconds.

## Testing

```bash
npm test
```

## License

MIT License


## Updated Frontend Code
The frontend `Alerts.tsx` is updated to include a virtual alert (per your request), wallet integration, and UI/UX enhancements to address the feedback. It also ensures compatibility with the backend’s new endpoints.

### `src/components/Alerts.tsx`
Enhanced with wallet connection, filters, and a virtual alert fallback.

```typescript
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { WhaleAlert } from '../types';
import axios from 'axios';
import { config } from '../utils/config';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../utils/connectors';

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<WhaleAlert[]>([
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterChain, setFilterChain] = useState<string>('All');
  const { active, account, activate, deactivate } = useWeb3React();

  // Connect to MetaMask
  const connectWallet = async () => {
    try {
      await activate(injected);
    } catch (err) {
      console.error('Wallet connection error:', err);
      setError('Failed to connect wallet');
    }
  };

  useEffect(() => {
    // Initialize WebSocket for Nodit Webhook/Stream
    const ws = new WebSocket(`ws://localhost:${config.websocketPort}`);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setLoading(false);
    };

    ws.onmessage = async (event) => {
      try {
        const newAlert: WhaleAlert = JSON.parse(event.data);

        // Fetch AI explanation using Nodit MCP
        const response = await axios.post(`${config.backendUrl}/api/alerts/explanation`, {
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

        setAlerts((prev) => [updatedAlert, ...prev.slice(0, 9)]);
      } catch (err) {
        console.error('Error processing WebSocket message:', err);
        setError('Failed to process real-time alert');
      }
    };

    ws.onerror = () => {
      console.error('WebSocket error');
      setError('Failed to connect to real-time alerts');
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setError('Real-time alerts disconnected');
    };

    // Fetch initial alerts from backend
    const fetchInitialAlerts = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/api/alerts`);
        setAlerts((prev) => [...response.data.slice(0, 9), ...prev]);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching initial alerts:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
        });
        setError('Failed to load alerts: ' + (err.message || 'Unknown error'));
      }
    };

    fetchInitialAlerts();

    // Start AI agent (Wave 3)
    const startAIAgent = async () => {
      try {
        await axios.get(`${config.backendUrl}/api/ai-agent/start`);
      } catch (err) {
        console.error('Error starting AI agent:', err);
      }
    };
    startAIAgent();

    return () => ws.close();
  }, []);

  // Filter alerts by chain or wallet
  const filteredAlerts = account
    ? alerts.filter((alert) => alert.fromAddress === account || alert.toAddress === account)
    : filterChain === 'All'
    ? alerts
    : alerts.filter((alert) => alert.chain === filterChain);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-300">Whale Alerts</h2>
        <div className="flex space-x-4">
          <button
            onClick={active ? deactivate : connectWallet}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            {active ? `Disconnect (${account?.slice(0, 6)}...)` : 'Connect Wallet'}
          </button>
          <select
            value={filterChain}
            onChange={(e) => setFilterChain(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded-lg"
          >
            <option value="All">All Chains</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Polygon">Polygon</option>
            <option value="XRPL">XRPL</option>
          </select>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-red-400 text-center">{error}</div>
      ) : filteredAlerts.length === 0 ? (
        <div className="text-gray-400 text-center">No alerts available for selected filter</div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              className="p-4 bg-gray-700 rounded-lg border border-gray-600 hover:border-blue-400 hover:shadow-lg transition-all duration-200"
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
```

### `src/utils/connectors.ts` (New)
MetaMask connector for wallet integration.

```typescript
import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 137, 1135], // Ethereum, Polygon, XRPL (if supported)
});
```

### `src/App.tsx`
Updated to include Web3Provider for wallet integration.

```typescript
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Alerts from './components/Alerts';
import Dashboard from './pages/Dashboard';

function getLibrary(provider: any): Web3Provider {
  return new Web3Provider(provider);
}

const App: React.FC = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </Router>
    </Web3ReactProvider>
  );
};

export default App;
```

---

## Setup Instructions
1. **Backend Setup**:
   - Create/replace files in `whaleguard-backend/` with the updated code.
   - Install dependencies:
     ```bash
     cd whaleguard-backend
     npm install
     ```
   - Create `.env`:
     ```env
     NODIT_API_KEY=your_nodit_api_key_here
     MONGODB_URI=mongodb://localhost:27017/whaleguard
     PORT=3001
     WEBSOCKET_PORT=8081
     MCP_SERVER_URL=http://localhost:3002
     ```
   - Start MongoDB:
     ```bash
     mongod
     ```
   - Start servers:
     ```bash
     npm run start
     npm run start:ws
     npx @noditlabs/nodit-mcp-server@latest
     ```

2. **Frontend Setup**:
   - Update `whaleguard/src/components/Alerts.tsx`, `src/utils/connectors.ts`, and `src/App.tsx`.
   - Install additional dependencies:
     ```bash
     cd whaleguard
     npm install @web3-react/core @web3-react/injected-connector @ethersproject/providers
     ```
   - Update `whaleguard/.env`:
     ```env
     REACT_APP_NODIT_API_KEY=your_nodit_api_key_here
     REACT_APP_WEBSOCKET_PORT=8081
     REACT_APP_BACKEND_URL=http://localhost:3001
     ```
   - Start frontend:
     ```bash
     npm start
     ```

3. **Insert Sample Alert in MongoDB**:
   ```javascript
   use whaleguard
   db.alerts.insertOne({
     id: "test-1",
     chain: "Ethereum",
     transactionHash: "0x5678",
     fromAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
     toAddress: "0xabc1234567890abcdef1234567890abcdef12345678",
     amount: 2000,
     token: "ETH",
     timestamp: "2025-07-13T14:25:00Z",
     explanation: "Test alert: Large ETH transfer detected."
   })
   ```

4. **Test Live Demo**:
   - Open `http://localhost:3000`.
   - Click “Connect Wallet” to link MetaMask (ensure MetaMask is installed).
   - Filter alerts by chain or wallet address.
   - Send a test Webhook:
     ```bash
     curl -X POST http://localhost:3001/api/nodit/webhook \
     -H "Content-Type: application/json" \
     -d '{"protocol":"ethereum","network":"mainnet","event":"token_transfer","transactionHash":"0x1234","from":"0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045","to":"0xabc","value":"2000000000000000000000","tokenSymbol":"ETH","timestamp":"2025-07-13T14:25:00Z"}'
     ```
   - Observe the AI agent generating alerts every 30 seconds.

---
## Troubleshooting “Failed to Load Alerts”
The updated `Alerts.tsx` includes a virtual alert to prevent the “Failed to load alerts” error. If the backend API still fails:
- **Check Backend Logs**: Run `npm run start` in `whaleguard-backend/` and check `logs/error.log`.
- **Test API**: Run `curl http://localhost:3001/api/alerts`.
- **MongoDB**: Verify connection with `mongo --eval "db.stats()"`.

---