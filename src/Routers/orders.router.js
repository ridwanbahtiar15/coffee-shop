const express = require("express");
const ordersRouter = express.Router();

const {
  getAllOrders,
  addNewOrders,
  updateOrders,
  deleteOrders,
} = require("../Handlers/orders.handler");

ordersRouter.get("/", getAllOrders);
ordersRouter.post("/", addNewOrders);
ordersRouter.patch("/:id", updateOrders);
ordersRouter.delete("/:id", deleteOrders);

module.exports = ordersRouter;
