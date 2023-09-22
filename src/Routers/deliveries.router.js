const express = require("express");
const deliveriesRouter = express.Router();
const { isLogin, authUsers } = require("../Middlewares/authorization");

const {
  getAllDeliveries,
  addNewDeliveries,
  updateDeliveries,
  deleteDeliveries,
} = require("../Handlers/deliveries.handler");

deliveriesRouter.get("/", getAllDeliveries);
deliveriesRouter.post("/", isLogin, authUsers([1]), addNewDeliveries);
deliveriesRouter.patch("/:id", isLogin, authUsers([1]), updateDeliveries);
deliveriesRouter.delete("/:id", isLogin, authUsers([1]), deleteDeliveries);

module.exports = deliveriesRouter;
