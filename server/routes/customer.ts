import express from 'express';
import { body } from 'express-validator';

import * as customerController from '../controllers/customer';
import isAuth from '../middleware/is-auth';

const router = express.Router();

router.get('/', isAuth, customerController.getCustomers);

// POST /feed/post
router.post(
  '/post',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  customerController.getCustomers
);

router.get('/post/:postId', isAuth, customerController.getCustomers);

router.put(
  '/post/:postId',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  customerController.getCustomers
);

router.delete('/post/:postId', isAuth, customerController.getCustomers);

export default router;
