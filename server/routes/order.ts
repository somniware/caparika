import express from "express";
import { body } from "express-validator";

import * as orderController from "../controllers/order";
import isAuth from "../middleware/is-auth";

const router = express.Router();

router.post(
  "/",
  [
    body("firstName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter a first name."),
    body("lastName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter a last name."),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    body("gender").trim().not().isEmpty().withMessage("Please enter a gender."),
    body("productIds").not().isEmpty().withMessage("Please choose products."),
  ],
  orderController.postOrder
);

router.get("/:orderId", isAuth, orderController.getOrder);

router.get("/", isAuth, orderController.getOrders);

router.delete("/:orderId", isAuth, orderController.deleteOrder);

export default router;
