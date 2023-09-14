const express = require("express");
const mainRouter = express.Router();

const categoriesRouter = require("./categories.router");
const productsRouter = require("./products.router");
const sizesRouter = require("./sizes.router");
const productsSizesRouter = require("./products-sizes.router");
const ordersProductsRouter = require("./orders-products.router");
const ordersRouter = require("./orders.router");

mainRouter.use("/categories", categoriesRouter);
mainRouter.use("/products", productsRouter);
mainRouter.use("/sizes", sizesRouter);
mainRouter.use("/productssizes", productsSizesRouter); // associate table
mainRouter.use("/ordersproducts", ordersProductsRouter); // associate table
mainRouter.use("/orders", ordersRouter);

module.exports = mainRouter;
