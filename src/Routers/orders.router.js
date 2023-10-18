const express = require("express");
const ordersRouter = express.Router();
const { isLogin, authUsers } = require("../Middlewares/authorization");

const {
  getAllOrders,
  addNewOrders,
  updateOrders,
  deleteOrders,
  getOrdersByUserId,
} = require("../Handlers/orders.handler");

ordersRouter.get("/", isLogin, authUsers([1, 2]), getAllOrders);
ordersRouter.post("/", isLogin, authUsers([1, 2]), addNewOrders);
ordersRouter.patch("/:id", isLogin, authUsers([1]), updateOrders);
ordersRouter.delete("/:id", isLogin, authUsers([1]), deleteOrders);
ordersRouter.get("/:id", isLogin, authUsers([1, 2]), getOrdersByUserId);

module.exports = ordersRouter;
