import mongoose from 'mongoose';

export async function connectMongoDB(params) {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.log('Error connecting to mongoDB', error.message);
  }
}
