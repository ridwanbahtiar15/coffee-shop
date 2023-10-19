const express = require("express");
const ordersRouter = express.Router();
const { isLogin, authUsers } = require("../Middlewares/authorization");

const {
  getAllOrders,
  addNewOrders,
  updateOrders,
  deleteOrders,
  getOrdersByUserId,
  getDetailOrder,
  getUser,
} = require("../Handlers/orders.handler");

ordersRouter.get("/", isLogin, authUsers([1, 2]), getAllOrders);
ordersRouter.post("/", isLogin, authUsers([1, 2]), addNewOrders);
ordersRouter.patch("/:id", isLogin, authUsers([1]), updateOrders);
ordersRouter.delete("/:id", isLogin, authUsers([1]), deleteOrders);
ordersRouter.get("/:id", isLogin, authUsers([1, 2]), getOrdersByUserId);
ordersRouter.get("/detail/:id", isLogin, authUsers([1, 2]), getDetailOrder);
ordersRouter.get("/users/:id", isLogin, authUsers([1, 2]), getUser);

module.exports = ordersRouter;
