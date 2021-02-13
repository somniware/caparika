import express from "express";
import { body } from "express-validator";

import prisma from "../utils/prisma";
//import isAuth from "../middleware/is-auth";
import { signup, login /*, logout */ } from "../controllers/auth";

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
    body("password").trim().isLength({ min: 1 }),
  ],
  signup
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    body("password").trim().isLength({ min: 1 }),
  ],
  login
);

//router.post("/logout", isAuth, logout);

export default router;
