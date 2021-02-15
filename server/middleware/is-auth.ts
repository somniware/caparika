import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

import CustomError from "../utils/custom-error";

const isAuth: RequestHandler = (req, _res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new CustomError("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken: string | object;
  try {
    decodedToken = jwt.verify(token, "somesecret");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new CustomError("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  req.userId = (decodedToken as { userId: string }).userId;
  next();
};

export default isAuth;
