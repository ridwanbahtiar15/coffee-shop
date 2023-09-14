const express = require("express");
const mainRouter = express.Router();

const categoriesRouter = require("./categories.router");
const productsRouter = require("./products.router");
const sizesRouter = require("./sizes.router");

mainRouter.use("/categories", categoriesRouter);
mainRouter.use("/products", productsRouter);
mainRouter.use("/sizes", sizesRouter);

module.exports = mainRouter;
