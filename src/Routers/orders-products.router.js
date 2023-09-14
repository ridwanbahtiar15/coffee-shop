const express = require("express");
const ordersProducts = express.Router();

const {
  getAllOrdersProducts,
  addNewOrdersProducts,
  updateOrdersProducts,
  deleteOrdersProducts,
} = require("../Handlers/orders-products.handler");

ordersProducts.get("/", getAllOrdersProducts);
ordersProducts.post("/", addNewOrdersProducts);
ordersProducts.patch("/:id", updateOrdersProducts);
ordersProducts.delete("/:id", deleteOrdersProducts);

module.exports = ordersProducts;
