import { ValidationError } from 'express-validator';

export default class CustomError extends Error {
   constructor(message?: string) {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype);
   }

   statusCode?: number;
   data?: ValidationError[];
}