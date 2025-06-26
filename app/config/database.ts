import { env } from './env';
import mongoose from 'mongoose';

export default async function connectDB(
    url: string = env.MONGO_URI
): Promise<void> {
  await mongoose.connect(url);
  console.log('✓ MongoDB connected');
}