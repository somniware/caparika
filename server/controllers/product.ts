import { validationResult } from "express-validator";
import { RequestHandler } from "express";

import CustomError from "../utils/custom-error";
import prisma from "../utils/prisma";

export const getProducts: RequestHandler = async (_req, res, next) => {
  try {
    const products = await prisma.product.findMany();

    res.status(200).json(products);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const postProduct: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new CustomError("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        price: +req.body.price,
      },
    });

    res.status(201).json({ message: "Product created!", product: product });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
  const productId = +req.params.productId;
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      const error = new CustomError("Could not find product.");
      error.statusCode = 404;
      throw error;
    }

    const deleteOrders = prisma.order.deleteMany({
      where: {
        products: {
          some: {
            id: {
              equals: productId,
            },
          },
        },
      },
    });
    const deleteProduct = prisma.product.delete({ where: { id: productId } });
    await prisma.$transaction([deleteOrders, deleteProduct]);

    res.status(200).json({ message: "Product deleted." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
