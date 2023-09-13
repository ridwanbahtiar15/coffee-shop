const express = require("express");
const productsRouter = express.Router();

const {
  getAllProducts,
  addNewProducts,
  updateProducts,
  deleteProducts,
} = require("../Handlers/products.handler");

productsRouter.get("/", getAllProducts);
productsRouter.post("/", addNewProducts);
productsRouter.patch("/:id", updateProducts);
productsRouter.delete("/:id", deleteProducts);

module.exports = productsRouter;
