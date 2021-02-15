import { RequestHandler } from "express";

import CustomError from "../utils/custom-error";
import prisma from "../utils/prisma";

export const getCustomers: RequestHandler = async (_req, res, next) => {
  try {
    const customers = await prisma.customer.findMany();

    res.status(200).json(customers);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteCustomer: RequestHandler = async (req, res, next) => {
  const customerId = +req.params.customerId;
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      const error = new CustomError("Could not find customer.");
      error.statusCode = 404;
      throw error;
    }

    const deleteCustomer = prisma.customer.delete({
      where: { id: customerId },
    });
    await prisma.$transaction([deleteCustomer]);

    res.status(200).json({ message: "Customer deleted." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
