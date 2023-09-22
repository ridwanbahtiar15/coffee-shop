const express = require("express");
const productsRouter = express.Router();
const { isLogin, authUsers } = require("../Middlewares/authorization");
const { singleUpload } = require("../Middlewares/diskUpload");

const {
  getAllProducts,
  addNewProducts,
  updateProducts,
  deleteProducts,
  getPopularProducts,
} = require("../Handlers/products.handler");

productsRouter.get("/", isLogin, authUsers([1, 2]), getAllProducts);
productsRouter.post(
  "/",
  isLogin,
  authUsers([1]),
  singleUpload("products_image"),
  addNewProducts
);
productsRouter.patch(
  "/:id",
  isLogin,
  authUsers([1]),
  singleUpload("products_image"),
  updateProducts
);
productsRouter.delete("/:id", isLogin, authUsers([1]), deleteProducts);
productsRouter.get("/popular", getPopularProducts);

module.exports = productsRouter;
