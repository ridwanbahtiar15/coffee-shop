const express = require("express");
const promosRouter = express.Router();

const {
  getAllPromos,
  addNewPromos,
  updatePromos,
  deletePromos,
} = require("../Handlers/promos.handler");

promosRouter.get("/", getAllPromos);
promosRouter.post("/", addNewPromos);
promosRouter.patch("/:id", updatePromos);
promosRouter.delete("/:id", deletePromos);

module.exports = promosRouter;
