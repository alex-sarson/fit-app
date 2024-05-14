import express from 'express';
import { createMacro, deleteMacro } from '../controllers/macro.controller.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// create a new macro in db
router.post('/create', verifyUser, createMacro);

// delete macro by id in db
router.delete('/deleteMacro/:id', verifyUser, deleteMacro);

export default router;
