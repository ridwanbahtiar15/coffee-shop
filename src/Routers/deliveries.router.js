const express = require("express");
const deliveriesRouter = express.Router();

const {
  getAllDeliveries,
  addNewDeliveries,
  updateDeliveries,
  deleteDeliveries,
} = require("../Handlers/deliveries.handler");

deliveriesRouter.get("/", getAllDeliveries);
deliveriesRouter.post("/", addNewDeliveries);
deliveriesRouter.patch("/:id", updateDeliveries);
deliveriesRouter.delete("/:id", deleteDeliveries);

module.exports = deliveriesRouter;
