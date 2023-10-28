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
  bestSellingProduct,
  getProductsById,
  getTotalSales,
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
productsRouter.delete("/", isLogin, authUsers([1]), deleteProducts);
productsRouter.post("/bestproduct", bestSellingProduct);
productsRouter.post("/totalsales", isLogin, authUsers([1, 2]), getTotalSales);
productsRouter.get("/:id", isLogin, authUsers([1, 2]), getProductsById);

module.exports = productsRouter;
