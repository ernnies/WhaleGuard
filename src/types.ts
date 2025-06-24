export interface WhaleAlert {
  id: string;
  chain: string;
  transactionHash: string;
  fromAddress: string;
  toAddress: string;
  amount: number;
  token: string;
  timestamp: string;
  explanation: string; 
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

export interface WhaleAlert {
  id: string;
  chain: string;
  transactionHash: string;
  fromAddress: string;
  toAddress: string;
  amount: number;
  token: string;
  timestamp: string;
  explanation: string;
}