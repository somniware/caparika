import { validationResult } from "express-validator";
import { RequestHandler } from "express";

import CustomError from "../utils/custom-error";
import prisma from "../utils/prisma";

export const postOrder: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new CustomError("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const products = (req.body.productIds as string[]).map((item) => ({
      id: +item,
    }));
    await prisma.customer.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        orders: {
          create: {
            products: {
              connect: products,
            },
          },
        },
      },
    });

    res.status(201).json({ message: "Order created!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getOrders: RequestHandler = async (_req, res, next) => {
  try {
    const orders = await prisma.order.findMany();

    res.status(200).json(orders);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteOrder: RequestHandler = async (req, res, next) => {
  const orderId = +req.params.orderId;
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      const error = new CustomError("Could not find order.");
      error.statusCode = 404;
      throw error;
    }

    const deleteOrder = prisma.order.delete({ where: { id: orderId } });
    await prisma.$transaction([deleteOrder]);

    res.status(200).json({ message: "Order deleted." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getOrder: RequestHandler = async (req, res, next) => {
  const orderId = +req.params.orderId;
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        products: true,
        creator: true,
      },
    });

    if (!order) {
      const error = new CustomError("Could not find order.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(order);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
