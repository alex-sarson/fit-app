import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';

dotenv.config();

const app = express();
const port = 8800;

// configure middleware
app.use(express.json());
app.use('/api/role', roleRoute);
app.use('/api/auth', authRoute);

// db connection - using mongoose for orm
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.FIT_MONGO_AUTHDB_URL);
    console.log('connected to db');
  } catch (error) {
    throw error;
  }
};

app.listen(port, () => {
  connectMongoDB();
  console.log(`connected to ${port}!!!`);
});
