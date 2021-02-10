const express = require('express');
const { body } = require('express-validator');

import * as productController from '../controllers/product';
import isAuth from '../middleware/is-auth';

const router = express.Router();

router.get('/products', productController.getProducts);

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
  productController.getProducts
);

// router.get('/post/:postId', isAuth, feedController.getPost);

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
  productController.getProducts
);

// router.delete('/post/:postId', isAuth, feedController.deletePost);

export default router;
