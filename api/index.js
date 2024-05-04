import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = 8800;

// configure middleware
app.use(express.json());
app.use(cookieParser());
app.use('/api/role', roleRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

// response handler middleware
app.use((obj, req, res, next) => {
  const statusCode = obj.status || 500;
  const message = obj.message || 'Something went wrong';
  return res.status(statusCode).json({
    success: [200, 201, 204].some((a) => a === obj.status) ? true : false,
    status: statusCode,
    message: message,
    data: obj.data,
  });
});

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
