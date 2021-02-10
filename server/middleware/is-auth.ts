import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

import Token from '../utils/token';
import CustomError from '../utils/custom-error';

const isAuth: RequestHandler = (req, _res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new CustomError('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  
  const token = authHeader.split(' ')[1];
  let decodedToken: Token;
  try {
    decodedToken = jwt.verify(token, 'somesecret') as Token;
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  
  if (!decodedToken) {
    const error = new CustomError('Not authenticated.');
    error.statusCode = 401;
    // const rrr = new Error('asdasdasd');
    // rrr.patka = 33;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};

export default isAuth;