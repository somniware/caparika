import express from 'express';
import { body } from 'express-validator/check';

// import User from '../models/user';
import * as orderController from '../controllers/order';
import isAuth from '../middleware/is-auth';

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('name')
      .trim()
      .not()
      .isEmpty()
  ],
  orderController.getOrders
);

router.get('/orders', isAuth, orderController.getOrders);

export default router;
