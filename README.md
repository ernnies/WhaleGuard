WhaleGuard

WhaleGuard is an AI-powered decentralized application (dApp) built for the WaveHack buildathon, leveraging Nodit’s Blockchain Model Context Protocol (MCP), Web3 Data API, and Webhook/Stream services. It provides a real-time dashboard to track whale movements (large token transfers) across multiple blockchains, such as Ethereum and XRPL, with AI-generated explanations for abnormal activity. The front end is built with React, TypeScript, Tailwind CSS, and Framer Motion for a modern, animated user interface.
Features
Real-Time Whale Monitoring: Tracks large token movements across multiple chains using Nodit’s Webhook/Stream.
AI-Powered Explanations: Uses Nodit’s MCP to generate natural language insights about whale activity (e.g., potential market impacts).
Multi-Chain Support: Displays transactions from Ethereum, XRPL, and other supported chains, with configurable chain selection.
Interactive Dashboard: Includes a header, real-time alerts, transaction visualizer, and settings panel, styled with Tailwind CSS and animated with Framer Motion.
Customizable Alerts: Allows users to set thresholds for large transactions (e.g., >1,000 ETH) via a settings panel.
Tech Stack
Frontend: React, TypeScript, Tailwind CSS, Framer Motion
Blockchain Integration: Nodit Web3 Data API, Webhook/Stream, Model Context Protocol (MCP)
Dependencies: axios, react-router-dom, @types/react-router-dom, @noditlabs/nodit-mcp-server
Supported Chains: Ethereum, XRPL (expandable to Polygon, Aptos, Bitcoin, etc.)
Prerequisites
Node.js: v16 or higher
npm: v7 or higher
Nodit API Key: Obtain from nodit.io
Supported Browser: Chrome, Firefox, or any modern browser
Installation
Clone the Repository:
bash
git clone https://github.com/ernnies/WhaleGuard.git
cd whaleguard
Install Dependencies:
bash
npm install
Set Up Environment Variables:
Create a .env file in the root directory and add your Nodit API key:
env
REACT_APP_NODIT_API_KEY=your_nodit_api_key_here
Configure Tailwind CSS:
Ensure tailwind.config.js and src/index.css are set up as follows:tailwind.config.js:
js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
src/index.css:
css
@tailwind base;
@tailwind components;
@tailwind utilities;
Start the Development Server:
bash
npm start
The app will be available at http://localhost:3000.
Project Structure
whaleguard/
├── src/
│   ├── components/
│   │   ├── Header.tsx         # App header with connection status
│   │   ├── Alerts.tsx         # Real-time whale alerts with AI explanations
│   │   ├── TransactionVisualizer.tsx  # Visualizes recent transactions
│   │   ├── Settings.tsx       # Configures chains and alert thresholds
│   ├── pages/
│   │   ├── Dashboard.tsx      # Main dashboard layout
│   ├── services/
│   │   ├── noditService.ts    # Nodit API integration
│   ├── styles/
│   │   ├── index.css          # Tailwind CSS setup
│   ├── App.tsx                # Main app with routing
│   ├── index.tsx              # Entry point
│   ├── types.ts               # TypeScript interfaces
├── tailwind.config.js         # Tailwind CSS configuration
├── .env                       # Environment variables
├── package.json               # Dependencies and scripts
├── README.md                  # Project documentation
Usage
Access the Dashboard:
Open http://localhost:3000 to view the WhaleGuard dashboard.
Monitor Whale Alerts:
The Alerts section displays large token transfers in real-time, with AI-generated explanations powered by Nodit MCP.
Visualize Transactions:
The Transaction Visualizer shows recent transactions across selected chains, animated with Framer Motion.
Configure Settings:
Use the Settings panel to:
Select blockchains (e.g., Ethereum, XRPL).
Set a threshold for whale alerts (e.g., 1,000 tokens).
Real-Time Updates:
(Planned) Subscribe to Nodit’s Webhook/Stream for live transaction updates. Configure via Nodit’s dashboard.
Nodit Integration
WhaleGuard leverages Nodit’s features for Web3 functionality:
Webhook/Stream: Subscribes to real-time blockchain events for large transactions. (Placeholder implementation; requires Webhook setup.)
Web3 Data API: Queries token transfers and transaction histories (e.g., Ethereum, XRPL).
Example API call:
bash
curl --request POST \
  --url https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenTransfersByAccount \
  --header "X-API-KEY: ****" \
  --header "accept: application/json" \
  --header "content-type: application/json" \
  --data '{"accountAddress": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", "fromDate": "2025-06-01T00:00:00+00:00", "toDate": "2025-06-10T23:59:59+00:00"}'
Nodit MCP: Generates AI-driven explanations for whale movements. Configure the MCP server:
json
{
  "mcpServers": {
    "nodit": {
      "command": "npx",
      "args": ["@noditlabs/nodit-mcp-server@latest"],
      "env": { "NODIT_API_KEY": "****" }
    }
  }
}
Development
Running Locally
bash
npm start
Building for Production
bash
npm run build
Linting and Formatting
Ensure code quality with:
bash
npm run lint
(Requires eslint setup; add eslint and prettier for linting/formatting.)
Future Enhancements
Real-Time Webhooks: Fully implement Nodit’s Webhook/Stream for live updates using WebSockets.
Expanded Chain Support: Add Polygon, Aptos, and Bitcoin via Nodit’s Web3 Data API.
Advanced Visualizations: Integrate recharts or chart.js for transaction volume graphs.
Enhanced AI: Connect to an LLM (e.g., Claude) via Nodit MCP for richer explanations.
Mobile Responsiveness: Optimize the UI for mobile devices with Tailwind CSS.
Dark/Light Mode: Add a theme toggle for user preference.
WaveHack Buildathon
WhaleGuard is designed for the WaveHack buildathon, showcasing Nodit’s capabilities:
Innovation: Combines real-time blockchain data with AI-driven insights.
Multi-Chain: Supports Ethereum, XRPL, and more via Nodit’s APIs.
User Experience: Features a sleek, animated UI with Tailwind CSS and Framer Motion.
Scalability: Built to handle live data streams and extensible for additional chains.
For submission details, refer to akindo.io.
Contributing
Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.
License
This project is licensed under the MIT License.
Contact
For questions or feedback, reach out via [your-email@example.com (mailto:your-email@example.com)] or submit an issue on GitHub.
Built with ❤️ for the WaveHack Buildathon using Nodit’s Web3 Platform