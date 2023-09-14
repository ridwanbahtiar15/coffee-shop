const express = require("express");
const sizesRouter = express.Router();

const {
  getAllSizes,
  addNewSizes,
  updateSizes,
  deleteSizes,
} = require("../Handlers/sizes.handler");

sizesRouter.get("/", getAllSizes);
sizesRouter.post("/", addNewSizes);
sizesRouter.patch("/:id", updateSizes);
sizesRouter.delete("/:id", deleteSizes);

module.exports = sizesRouter;
