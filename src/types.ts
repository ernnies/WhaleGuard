export interface WhaleAlert {
  id: string;
  chain: string;
  transactionHash: string;
  fromAddress: string;
  toAddress: string;
  amount: number;
  token: string;
  timestamp: string;
  explanation: string; // AI-generated via Nodit MCP
}

export interface Transaction {
  chain: string;
  hash: string;
  from: string;
  to: string;
  amount: number;
  token: string;
  timestamp: string;
}