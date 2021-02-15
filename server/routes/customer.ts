import express from "express";

import * as customerController from "../controllers/customer";
import isAuth from "../middleware/is-auth";

const router = express.Router();

router.get("/", isAuth, customerController.getCustomers);

router.delete("/:customerId", isAuth, customerController.deleteCustomer);

export default router;
