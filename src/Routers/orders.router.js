const express = require("express");
const ordersRouter = express.Router();
const { isLogin, isAdmin } = require("../Middlewares/authorization");

const {
  getAllOrders,
  addNewOrders,
  updateOrders,
  deleteOrders,
} = require("../Handlers/orders.handler");

ordersRouter.get("/", getAllOrders);
ordersRouter.post("/", isLogin, isAdmin, addNewOrders);
ordersRouter.patch("/:id", isLogin, isAdmin, updateOrders);
ordersRouter.delete("/:id", isLogin, isAdmin, deleteOrders);

module.exports = ordersRouter;
