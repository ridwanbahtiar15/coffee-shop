const express = require("express");
const productsRouter = express.Router();
const { isLogin, isAdmin } = require("../Middlewares/authorization");

const {
  getAllProducts,
  addNewProducts,
  updateProducts,
  deleteProducts,
  getPopularProducts,
} = require("../Handlers/products.handler");

productsRouter.get("/", getAllProducts);
productsRouter.post("/", isLogin, isAdmin, addNewProducts);
productsRouter.patch("/:id", isLogin, isAdmin, updateProducts);
productsRouter.delete("/:id", isLogin, isAdmin, deleteProducts);
productsRouter.get("/popular", getPopularProducts);

module.exports = productsRouter;
