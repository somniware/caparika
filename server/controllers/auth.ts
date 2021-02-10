import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

//import User from '../models/user';
import CustomError from '../utils/custom-error';

export const signup: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new CustomError('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  //const email = req.body.email;
  //const name = req.body.name;
  //const password = req.body.password;

  try {
    //const hashedPw = await bcrypt.hash(password, 12);

    // const user = new User({
    //   email: email,
    //   password: hashedPw,
    //   name: name
    // });

    const result = '';//await user.save();
    res.status(201).json({ message: 'User created!', userId: result/*._id*/ });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  //const email = req.body.email;
  const password = req.body.password;
  //let loadedUser;

  try {
    const user = null;//await User.findOne({ email: email });
    if (!user) {
      const error = new CustomError('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }

    //loadedUser = user;
    const isEqual = await bcrypt.compare(password, ''/*user.password*/);
    if (!isEqual) {
      const error = new CustomError('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: '',//loadedUser.email,
        userId: '',//loadedUser._id.toString()
      },
      'somesecret',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token: token, userId: ''/*loadedUser._id.toString()*/ });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};