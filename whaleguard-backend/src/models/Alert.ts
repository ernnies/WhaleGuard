import { Schema, model } from 'mongoose';

const alertSchema = new Schema({
  id: { type: String, required: true },
  chain: { type: String, required: true },
  transactionHash: { type: String, required: true },
  fromAddress: { type: String, required: true },
  toAddress: { type: String, required: true },
  amount: { type: Number, required: true },
  token: { type: String, required: true },
  timestamp: { type: String, required: true },
  explanation: { type: String, required: true },
});

export const Alert = model('Alert', alertSchema);