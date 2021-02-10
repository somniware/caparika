//import { validationResult } from 'express-validator';
import { RequestHandler } from 'express';

//import Customer from '../models/customer';

export const getCustomers: RequestHandler = async (_req, _res, _next) => {
  
};

export const login: RequestHandler = async (_req, _res, next) => {
  //const email = req.body.email;
  //const password = req.body.password;
  //let loadedUser;

  try {
    
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};