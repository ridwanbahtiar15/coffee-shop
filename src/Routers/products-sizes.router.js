const express = require("express");
const productsSizesRouter = express.Router();

const {
  getAllProductsSizes,
  addNewProductsSizes,
  updateProductsSizes,
  deleteProductsSizes,
} = require("../Handlers/products-sizes.handler");

productsSizesRouter.get("/", getAllProductsSizes);
productsSizesRouter.post("/", addNewProductsSizes);
productsSizesRouter.patch("/:id", updateProductsSizes);
productsSizesRouter.delete("/:id", deleteProductsSizes);

module.exports = productsSizesRouter;
