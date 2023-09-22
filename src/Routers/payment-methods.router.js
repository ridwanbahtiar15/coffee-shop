const express = require("express");
const paymentMethodsRouter = express.Router();
const { isLogin, authUsers } = require("../Middlewares/authorization");

const {
  getAllPaymentMethods,
  addNewPaymentMethods,
  updatePaymentMethods,
  deletePaymentMethods,
} = require("../Handlers/payment-methods.handler");

paymentMethodsRouter.get("/", getAllPaymentMethods);
paymentMethodsRouter.post("/", isLogin, authUsers([1]), addNewPaymentMethods);
paymentMethodsRouter.patch(
  "/:id",
  isLogin,
  authUsers([1]),
  updatePaymentMethods
);
paymentMethodsRouter.delete(
  "/:id",
  isLogin,
  authUsers([1]),
  deletePaymentMethods
);

module.exports = paymentMethodsRouter;
