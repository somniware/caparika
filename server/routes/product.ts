import express from "express";
import { body } from "express-validator";

import * as productController from "../controllers/product";
import isAuth from "../middleware/is-auth";

const router = express.Router();

router.get("/", productController.getProducts);

router.post(
  "/",
  isAuth,
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter a product name."),
    body("price").trim().isNumeric(),
  ],
  productController.postProduct
);

router.delete("/:productId", isAuth, productController.deleteProduct);

export default router;
