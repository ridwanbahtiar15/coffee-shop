const express = require("express");
const productsRouter = express.Router();
const { isLogin, authUsers } = require("../Middlewares/authorization");
// const { upload } = require("../Middlewares/diskUpload");
const { upload } = require("../Middlewares/memoryUpload");

const {
  getAllProducts,
  addNewProducts,
  updateProducts,
  deleteProducts,
  getPopularProducts,
  getProductsById,
} = require("../Handlers/products.handler");

productsRouter.get("/", isLogin, authUsers([1, 2]), getAllProducts);
productsRouter.post(
  "/",
  isLogin,
  authUsers([1]),
  upload("products_image"),
  addNewProducts
);
productsRouter.patch(
  "/:id",
  isLogin,
  authUsers([1]),
  upload("products_image"),
  updateProducts
);
productsRouter.delete("/:id", isLogin, authUsers([1]), deleteProducts);
productsRouter.get("/popular", getPopularProducts);
productsRouter.get("/:id", getProductsById);

module.exports = productsRouter;
