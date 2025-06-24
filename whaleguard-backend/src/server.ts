import express from 'express';
import cors from 'cors';
import { config } from './utils/config';
import webhookRoutes from './api/routes/webhookRoutes';
import alertRoutes from './api/routes/alertRoutes';
import analyticsRoutes from './api/routes/analyticsRoutes';
import { errorHandler } from './api/middleware/errorHandler';
import mongoose from 'mongoose';
import { logger } from './utils/logger';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/webhook', webhookRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use(errorHandler);

mongoose.connect(config.mongodbUri)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((err) => logger.error('MongoDB connection error:', err));

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});