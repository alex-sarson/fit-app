import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRoute from './routes/role.js';

dotenv.config();

const app = express();
const port = 8800;

// db connection - using mongoose for orm
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.FIT_MONGO_AUTHDB_URL);
    console.log('connected to db');
  } catch (error) {
    throw error;
  }
};

app.use('/api/role', roleRoute);

app.listen(port, () => {
  connectMongoDB();
  console.log(`connected to ${port}!!!`);
});
