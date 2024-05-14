import Entry from '../models/Entry.js';
import { createError } from '../utils/error.js';
import { createSuccess } from '../utils/success.js';

export const createEntry = async (req, res, next) => {
  try {
    if (req.body.date && req.body.date !== '') {
      const newEntry = new Entry(req.body);
      await newEntry.save();
      return next(createSuccess(200, 'Entry created successfully', newEntry));
    } else {
      return next(createError(400, 'Bad request'));
    }
  } catch (error) {
    return next(createError(500, 'Internal server error'));
  }
};

export const getEntryById = async (req, res, next) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) return next(createError(404, 'Entry not found'));
    return next(createSuccess(200, 'Entry found', entry));
  } catch (error) {
    return next(createError(500, 'Internal server error'));
  }
};

export const updateEntry = async (req, res, next) => {
  try {
    const entry = await Entry.findById({ _id: req.params.id });
    if (entry) {
      const newData = await Entry.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return next(createSuccess(200, 'Entry updated', newData));
    } else {
      return next(createError(404, 'Entry not found'));
    }
  } catch (error) {
    return next(createError(500, 'Internal server error'));
  }
};
