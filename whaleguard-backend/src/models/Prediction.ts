import { Schema, model } from 'mongoose';

const predictionSchema = new Schema({
  address: { type: String, required: true },
  probability: { type: Number, required: true },
  prediction: { type: String, required: true },
  timestamp: { type: String, required: true },
});

export const Prediction = model('Prediction', predictionSchema);