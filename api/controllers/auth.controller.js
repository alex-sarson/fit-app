import Role from '../models/Role.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

export const registerAdmin = async (req, res, next) => {
  const role = await Role.find({});
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: hashPass,
    isAdmin: true,
    roles: role,
  });
  await newUser.save();
  return next(createSuccess(200, 'Admin user registered successfully'));
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      'roles',
      'role'
    );

    const { roles } = user;
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
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        roles: roles,
      },
      process.env.FIT_JWT_SECRET
    );
    res.cookie('access_token', token, { httpOnly: true }).status(200).json({
      status: 200,
      message: 'Login success',
      data: user,
    });
  } catch (error) {
    return next(createError(500, 'Internal server error'));
  }
};
