import express from 'express';
import {
  createEntry,
  getEntryById,
  updateEntry,
} from '../controllers/entry.controller.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// create entry
router.post('/create', verifyUser, createEntry);

// get entry by id
router.get('/:id', verifyUser, getEntryById);

// update entry by id
router.put('/update/:id', verifyUser, updateEntry);

export default router;
