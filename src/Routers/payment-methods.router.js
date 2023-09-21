const express = require("express");
const paymentMethodsRouter = express.Router();
const { isLogin, isAdmin } = require("../Middlewares/authorization");

const {
  getAllPaymentMethods,
  addNewPaymentMethods,
  updatePaymentMethods,
  deletePaymentMethods,
} = require("../Handlers/payment-methods.handler");

paymentMethodsRouter.get("/", getAllPaymentMethods);
paymentMethodsRouter.post("/", isLogin, isAdmin, addNewPaymentMethods);
paymentMethodsRouter.patch("/:id", isLogin, isAdmin, updatePaymentMethods);
paymentMethodsRouter.delete("/:id", isLogin, isAdmin, deletePaymentMethods);

module.exports = paymentMethodsRouter;
