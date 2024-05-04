import express from 'express';
import { getAllUsers, getUserById } from '../controllers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// get all users
router.get('/', verifyAdmin, getAllUsers);

// get user by id
router.get('/:id', verifyUser, getUserById);

export default router;
