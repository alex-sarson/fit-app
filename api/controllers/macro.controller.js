import Macro from '../models/Macro.js';
import { createError } from '../utils/error.js';
import { createSuccess } from '../utils/success.js';

export const createMacro = async (req, res, next) => {
  try {
    if (req.body.name && req.body.name !== '') {
      const newMacro = new Macro(req.body);
      await newMacro.save();
      return next(createSuccess(200, 'Macro created successfully', newMacro));
    } else {
      return next(createError(400, 'Bad request'));
    }
  } catch (error) {
    return next(createError(500, 'Internal server error'));
  }
};

export const deleteMacro = async (req, res, next) => {
  try {
    const macroId = req.params.id;
    const macro = await Macro.findById({ _id: macroId });
    if (macro) {
      await Macro.findByIdAndDelete(macroId);
      return next(createSuccess(200, 'Macro deleted'));
    } else {
      return next(createError(404, 'Macro not found'));
    }
  } catch (error) {
    return next(createError(500, 'Internal server error'));
  }
};
