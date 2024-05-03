import Role from '../models/Role.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
import { createSuccess } from '../utils/success.js';

export const register = async (req, res, next) => {
  const role = await Role.find({ role: 'User' });
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: hashPass,
    roles: role,
  });
  await newUser.save();
  return next(createSuccess(200, 'User registered successfully'));
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    // compare(<user input pass from body>, <user password from db>)
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, 'Password is incorrect'));
    }
    return next(createSuccess(200, 'Login successful'));
  } catch (error) {
    return next(createError(500, 'Internal server error'));
  }
};
