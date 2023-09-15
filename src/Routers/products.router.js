const express = require("express");
const productsRouter = express.Router();

const {
  getAllProducts,
  addNewProducts,
  updateProducts,
  deleteProducts,
  findProductsName,
} = require("../Handlers/products.handler");

productsRouter.get("/", getAllProducts);
productsRouter.post("/", addNewProducts);
productsRouter.patch("/:id", updateProducts);
productsRouter.delete("/:id", deleteProducts);
// productsRouter.get("/?productsname=:productsname", findProductsName);

module.exports = productsRouter;
