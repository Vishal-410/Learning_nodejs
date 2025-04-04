import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1/question1');
    console.log(' MongoDB Connected');
  } catch (err) {
    console.error(' MongoDB Connection Error:', err);
  }
};

export default connectDB;
