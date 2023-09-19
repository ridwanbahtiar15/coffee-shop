const express = require("express");
const productsRouter = express.Router();

const {
  getAllProducts,
  addNewProducts,
  updateProducts,
  deleteProducts,
  getPopularProducts,
} = require("../Handlers/products.handler");

productsRouter.get("/", getAllProducts);
productsRouter.post("/", addNewProducts);
productsRouter.patch("/:id", updateProducts);
productsRouter.delete("/:id", deleteProducts);
productsRouter.get("/popular", getPopularProducts);

module.exports = productsRouter;
