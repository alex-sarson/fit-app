import express from 'express';
import {
  createWorkout,
  updateWorkout,
} from '../controllers/workout.controller.js';

const router = express.Router();

// create a workout
router.post('/create', createWorkout);

// update a workout by id
router.put('/update/:id', updateWorkout);

export default router;
