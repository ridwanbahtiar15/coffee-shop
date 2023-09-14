const express = require("express");
const mainRouter = express.Router();

const categoriesRouter = require("./categories.router");
const productsRouter = require("./products.router");
const sizesRouter = require("./sizes.router");
const productsSizesRouter = require("./products-sizes.router");
const ordersProductsRouter = require("./orders-products.router");
const ordersRouter = require("./orders.router");
const promosRouter = require("./promos.router");
const deliveriesRouter = require("./deliveries.router");
const rolesRouter = require("./roles.router");
const usersRouter = require("./users.router");

mainRouter.use("/categories", categoriesRouter);
mainRouter.use("/products", productsRouter);
mainRouter.use("/sizes", sizesRouter);
mainRouter.use("/productssizes", productsSizesRouter); // associate table
mainRouter.use("/ordersproducts", ordersProductsRouter); // associate table
mainRouter.use("/orders", ordersRouter);
mainRouter.use("/promos", promosRouter);
mainRouter.use("/deliveries", deliveriesRouter);
mainRouter.use("/roles", rolesRouter);
mainRouter.use("/users", usersRouter);

module.exports = mainRouter;
