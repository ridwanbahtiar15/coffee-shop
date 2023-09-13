const express = require("express");
const mainRouter = express.Router();

const categoriesRouter = require("./categories.router");
const productsRouter = require("./products.router");

mainRouter.use("/categories", categoriesRouter);
mainRouter.use("/products", productsRouter);

module.exports = mainRouter;
