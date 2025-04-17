import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    console.log('Mongo URI:', process.env.MONGODB_URI); 

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};
