const express = require("express");
const mainRouter = express.Router();
const { sendMail } = require("../Helpers/sendMail.js");

const categoriesRouter = require("./categories.router");
const productsRouter = require("./products.router");
const sizesRouter = require("./sizes.router");
const ordersRouter = require("./orders.router");
const promosRouter = require("./promos.router");
const deliveriesRouter = require("./deliveries.router");
const rolesRouter = require("./roles.router");
const usersRouter = require("./users.router");
const paymentMethodsRouter = require("./payment-methods.router");
const authRouter = require("./auth.router");

mainRouter.get("/mail", async (req, res) => {
  try {
    const info = await sendMail({
      to: "bakaxon162@apxby.com",
      subject: "Email Activation",
      data: {
        username: "fazztrack",
        activationLink: "https://www.fazztrack.com/",
      },
    });
    res.status(200).json({
      msg: "Success",
      response: info.response,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
    console.log(error);
  }
});

mainRouter.use("/categories", categoriesRouter);
mainRouter.use("/products", productsRouter);
mainRouter.use("/sizes", sizesRouter);
mainRouter.use("/orders", ordersRouter);
mainRouter.use("/promos", promosRouter);
mainRouter.use("/deliveries", deliveriesRouter);
mainRouter.use("/roles", rolesRouter);
mainRouter.use("/users", usersRouter);
mainRouter.use("/paymentmethods", paymentMethodsRouter);
mainRouter.use("/auth", authRouter);

module.exports = mainRouter;
