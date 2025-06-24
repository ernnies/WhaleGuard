# WhaleGuard

WhaleGuard is an AI-powered decentralized application (dApp) leveraging Nodit’s Blockchain Model Context Protocol (MCP), Web3 Data API, and Webhook/Stream services. It provides a real-time dashboard to track whale movements across multiple blockchains (Ethereum, XRPL, Polygon, Bitcoin), with AI-generated explanations for abnormal activity.

## Features

- **Real-Time Whale Alerts**: Monitors large token transfers using Nodit’s Webhook/Stream, with live updates via WebSocket.
- **Multi-Chain Data**: Queries token transfers, native balances, and NFT ownership across Ethereum, XRPL, and more using Nodit’s Web3 Data API.
- **AI Explanations**: Uses Nodit MCP to generate natural language insights for whale movements.
- **Interactive Dashboard**: Built with React, TypeScript, Tailwind CSS, and Framer Motion, featuring charts (Recharts) and responsive design.
- **Customizable Settings**: Configure chains and alert thresholds (e.g., >1,000 ETH).

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion, Recharts
- **Backend**: Node.js, Express, WebSocket (for Webhook handling)
- **Blockchain**: Nodit Web3 Data API, Webhook/Stream, MCP
- **Supported Chains**: Ethereum, XRPL, Polygon, Bitcoin
- **Dependencies**: `axios`, `react-router-dom`, `@types/react-router-dom`, `@noditlabs/nodit-mcp-server`, `express`, `ws`, `recharts`

## Prerequisites

- **Node.js**: v16 or higher
- **npm**: v7 or higher
- **Nodit API Key**: Obtain from [nodit.io](https://nodit.io)
- **Supported Browser**: Chrome, Firefox, or any modern browser

## Installation

1. **Clone the Repository**:
```bash
   git clone https://github.com/ernnies/whaleguard.git
   cd whaleguard

Install Dependencies:
bash
npm install

Set Up Environment Variables:
Create a .env file:
env
REACT_APP_NODIT_API_KEY=your_nodit_api_key_here
Configure Tailwind CSS:
Ensure tailwind.config.js and src/index.css are set up (see previous README).

Run Webhook Server:

bash
node server.js
Run MCP Server:

bash
npx @noditlabs/nodit-mcp-server@latest

Start the Development Server:
bash
npm start

Usage
Dashboard: Access at http://localhost:3000.
Real-Time Alerts: View live whale movements via Webhook updates.

Transaction Visualizer: See token transfers, balances, and NFTs with a line chart for volume.

Settings: Select chains (Ethereum, XRPL, etc.) and set alert thresholds.
AI Explanations: Read MCP-generated insights for each alert.

Nodit Integration
Webhook/Stream: Subscribes to real-time token transfer events (e.g., >1,000 ETH).
Web3 Data API: Queries token transfers (/token/getTokenTransfersByAccount), balances (/native/getNativeBalanceByAccount), and NFTs (/nft/getNftsOwnedByAccount).

MCP: Generates AI-driven explanations via a local MCP server.


npm install -g vercel
vercel
Set REACT_APP_NODIT_API_KEY in Vercel’s dashboard.


Future Enhancements
Support additional chains (Aptos, Kaia).
Integrate a real LLM (e.g., Claude) for MCP.

Enhance charts with more metrics (e.g., NFT trading volume).

WhaleGuard showcases Nodit’s features for real-time, multi-chain, AI-powered Web3 applications

Contributing
Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.


---


- **Nodit Feature Usage**:
  - **Webhook/Stream**: Real-time alerts via WebSocket, addressing the feedback for live data.
  - **Web3 Data API**: Queries for tokens, balances, and NFTs across multiple chains, showcasing diversity.[](https://developer.nodit.io/docs/web3-data-api-tutorials)[](https://developer.nodit.io/docs/building-a-simple-token-explorer-using-web3-data-apis)
  - **MCP**: AI explanations enhance the app’s intelligence, aligning with Nodit’s AI-Web3 synergy.[](https://github.com/noditlabs)
- **Lightweight UI**: Retained simplicity while adding charts and responsiveness.
- **Robust Implementation**: Error handling, loading states, and deployment ensure a polished demo.

