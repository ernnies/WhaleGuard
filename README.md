# WhaleGuard

**WhaleGuard** is an AI-powered decentralized application (dApp) built for the **Nodit’s Blockchain Model Context Protocol (MCP)**, **Web3 Data API**, and **Webhook/Stream** services.

It provides a real-time dashboard to track whale movements (large token transfers) across multiple blockchains like **Ethereum** and **XRPL**, with AI-generated explanations for abnormal activity. The frontend is built using **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion** for a sleek, modern UI.

---

## Features

* **Real-Time Whale Monitoring**: Tracks large token movements across chains using Nodit Webhook/Stream.
* **AI-Powered Explanations**: Generates natural language insights using Nodit’s MCP.
* **Multi-Chain Support**: Supports Ethereum, XRPL, and more with chain selection.
* **Interactive Dashboard**: Real-time alerts, transaction visualizer, and customizable settings.
* **Custom Alerts**: Users can set thresholds for large transactions (e.g., >1,000 ETH).

---

## 🛠 Tech Stack

* **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
* **Blockchain Integration**: Nodit Web3 Data API, Webhook/Stream, MCP
* **Dependencies**: `axios`, `react-router-dom`, `@types/react-router-dom`, `@noditlabs/nodit-mcp-server`
* **Supported Chains**: Ethereum, XRPL (expandable to Polygon, Aptos, Bitcoin, etc.)

---

## ✅ Prerequisites

* **Node.js**: v16 or higher
* **npm**: v7 or higher
* **Nodit API Key**: [Get one at](https://nodit.io)
* **Supported Browsers**: Chrome, Firefox, or any modern browser

---

## 📦 Installation

```bash
git clone https://github.com/ernnies/WhaleGuard.git
cd whaleguard
npm install
```

### ⚙️ Environment Setup

Create a `.env` file in the root directory and add your API key:

```env
REACT_APP_NODIT_API_KEY=your_nodit_api_key_here
```

### 🧩 Tailwind CSS Configuration

#### `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

#### `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🧪 Running the App

Start the development server:

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Usage

* **View Dashboard**: Visit [http://localhost:3000](http://localhost:3000)
* **Monitor Alerts**: Real-time whale activity with AI-generated summaries.
* **Visualize Transactions**: Animated transaction feed across chains.
* **Configure Settings**:

  * Choose supported chains (Ethereum, XRPL, etc.)
  * Set whale thresholds (e.g., >1000 tokens)

---

## Nodit Integration

### Webhook/Stream

> *(Planned)* Live updates via Nodit’s stream service (requires Webhook setup)

### Web3 Data API Example

```bash
curl --request POST \
  --url https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenTransfersByAccount \
  --header "X-API-KEY: ****" \
  --header "accept: application/json" \
  --header "content-type: application/json" \
  --data '{"accountAddress": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", "fromDate": "2025-06-01T00:00:00+00:00", "toDate": "2025-06-10T23:59:59+00:00"}'
```

### Model Context Protocol (MCP)

```json
{
  "mcpServers": {
    "nodit": {
      "command": "npx",
      "args": ["@noditlabs/nodit-mcp-server@latest"],
      "env": { "NODIT_API_KEY": "****" }
    }
  }
}
```

---

## Development Scripts

### Local Development

```bash
npm start
```

### Production Build

```bash
npm run build
```

### Lint & Format (requires setup)

```bash
npm run lint
```

---

## 🔮 Future Enhancements

* ✅ Real-Time Webhooks via Nodit
* ✅ Support more chains (Polygon, Aptos, Bitcoin)
* 📈 Charts using `recharts` or `chart.js`
* 🤖 LLM Integration (e.g., Claude) for deeper insights
* 📱 Mobile responsiveness
* 🌗 Light/Dark theme toggle

---

## 🏁 WaveHack Buildathon

**WhaleGuard** is built to showcase the power of Nodit’s ecosystem:

* 💡 Innovation: Real-time blockchain data + AI insight
* 🔗 Multi-Chain: Ethereum, XRPL, and more
* 🎨 UX: Sleek interface with Framer Motion
* 🧱 Scalable: Webhook-ready and easily extendable

Submit your build at [akindo.io](https://akindo.io)

---

## 🤝 Contributing

1. Fork the repo
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a PR 🚀

---

## 📄 License

This project is licensed under the **MIT License**.
