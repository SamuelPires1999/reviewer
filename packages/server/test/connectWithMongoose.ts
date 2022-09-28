import mongoose from 'mongoose';

export const connectWithMongoose = async (): Promise<void> => {
  jest.setTimeout(20000);
  await mongoose.connect(global.__MONGO_URI__);
};
