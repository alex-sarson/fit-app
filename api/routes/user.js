import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
} from '../controllers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// get all users
router.get('/', verifyAdmin, getAllUsers);

// get user by id
router.get('/:id', verifyUser, getUserById);

// update user by id
router.put('/update/:id', verifyUser, updateUser);

export default router;
