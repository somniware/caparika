//import { validationResult } from 'express-validator';
import { RequestHandler } from 'express';

// import User from '../models/user';

export const getProducts: RequestHandler = async (_req, _res, _next) => {
  
};

export const signup: RequestHandler = async (_req, _res, next) => {
  /*
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  */
  try {
    
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};