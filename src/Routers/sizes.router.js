const express = require("express");
const sizesRouter = express.Router();
const { isLogin, isAdmin } = require("../Middlewares/authorization");

const {
  getAllSizes,
  addNewSizes,
  updateSizes,
  deleteSizes,
} = require("../Handlers/sizes.handler");

sizesRouter.get("/", getAllSizes);
sizesRouter.post("/", isLogin, isAdmin, addNewSizes);
sizesRouter.patch("/:id", isLogin, isAdmin, updateSizes);
sizesRouter.delete("/:id", isLogin, isAdmin, deleteSizes);

module.exports = sizesRouter;
