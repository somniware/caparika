import express from "express";
import { body } from "express-validator";

import prisma from "../utils/prisma";
import * as authController from "../controllers/auth";

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value) => {
        const userRec = await prisma.user.findUnique({
          where: { email: value },
        });
        if (userRec) {
          return Promise.reject("E-Mail address already exists!");
        }
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter a password."),
  ],
  authController.signup
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    body("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter a password."),
  ],
  authController.login
);

export default router;
