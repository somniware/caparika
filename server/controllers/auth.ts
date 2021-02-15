import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../utils/prisma";
import CustomError from "../utils/custom-error";

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new CustomError("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const hashedPw = await bcrypt.hash(req.body.password, 12);

    await prisma.user.create({
      data: {
        email: req.body.email,
        password: hashedPw,
      },
    });

    res.status(201).json({ message: "User created!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (!user) {
      const error = new CustomError(
        "A user with this email could not be found."
      );
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(req.body.password, user.password);
    if (!isEqual) {
      const error = new CustomError("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { email: user.email, userId: user.id },
      "somesecret",
      { expiresIn: "15min" }
    );

    res.status(200).json({ token: token, userId: user.id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
