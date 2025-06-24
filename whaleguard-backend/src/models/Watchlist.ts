import { Schema, model } from 'mongoose';

const watchlistSchema = new Schema({
  userId: { type: String, required: true },
  addresses: [{ type: String }],
  tokens: [{ type: String }],
});

export const Watchlist = model('Watchlist', watchlistSchema);