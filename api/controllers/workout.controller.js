import Role from '../models/Role.js';
import Workout from '../models/Workout.js';
import { createError } from '../utils/error.js';
import { createSuccess } from '../utils/success.js';

export const createWorkout = async (req, res, next) => {
  try {
    if (req.body && req.body !== '') {
      const newWorkout = new Workout(req.body);
      await newWorkout.save();
      return next(createSuccess(200, 'Workout created', newWorkout));
    } else {
      return next(createError(400, 'Bad request'));
    }
  } catch (error) {
    return next(createError(500, 'Something went wrong'));
  }
};

export const updateWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findById({ _id: req.params.id });
    if (workout) {
      const newData = await Workout.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return next(createSuccess(200, 'Workout updated successfully', newData));
    } else {
      return next(createError(404, 'Workout not found'));
    }
  } catch (error) {
    return next(createError(500, 'Something went wrong'));
  }
};
