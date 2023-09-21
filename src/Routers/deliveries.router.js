const express = require("express");
const deliveriesRouter = express.Router();
const { isLogin, isAdmin } = require("../Middlewares/authorization");

const {
  getAllDeliveries,
  addNewDeliveries,
  updateDeliveries,
  deleteDeliveries,
} = require("../Handlers/deliveries.handler");

deliveriesRouter.get("/", getAllDeliveries);
deliveriesRouter.post("/", isLogin, isAdmin, addNewDeliveries);
deliveriesRouter.patch("/:id", isLogin, isAdmin, updateDeliveries);
deliveriesRouter.delete("/:id", isLogin, isAdmin, deleteDeliveries);

module.exports = deliveriesRouter;
