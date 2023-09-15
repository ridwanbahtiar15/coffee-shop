const express = require("express");
const paymentMethodsRouter = express.Router();

const {
  getAllPaymentMethods,
  addNewPaymentMethods,
  updatePaymentMethods,
  deletePaymentMethods,
} = require("../Handlers/payment-methods.handler");

paymentMethodsRouter.get("/", getAllPaymentMethods);
paymentMethodsRouter.post("/", addNewPaymentMethods);
paymentMethodsRouter.patch("/:id", updatePaymentMethods);
paymentMethodsRouter.delete("/:id", deletePaymentMethods);

module.exports = paymentMethodsRouter;
