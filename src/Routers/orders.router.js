const express = require("express");
const ordersRouter = express.Router();

const {
  getAllOrders,
  addNewOrder,
  updateOrders,
  deleteOrders,
} = require("../Handlers/orders.handler");

ordersRouter.get("/", getAllOrders);
ordersRouter.post("/", addNewOrder);
ordersRouter.patch("/:id", updateOrders);
ordersRouter.delete("/:id", deleteOrders);

module.exports = ordersRouter;
