import mongoose from 'mongoose';

import { config } from './config';

export const connectDatabase = async (): Promise<void> => {
  mongoose.connection.on('open', () => console.log('database connected'));
  mongoose.connection.on('close', () => console.log('Database connection closed.'));
  await mongoose.connect(config.MONGO_URI);
};
