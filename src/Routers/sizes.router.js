const express = require("express");
const sizesRouter = express.Router();
const { isLogin, authUsers } = require("../Middlewares/authorization");

const {
  getAllSizes,
  addNewSizes,
  updateSizes,
  deleteSizes,
} = require("../Handlers/sizes.handler");

sizesRouter.get("/", getAllSizes);
sizesRouter.post("/", isLogin, authUsers([1]), addNewSizes);
sizesRouter.patch("/:id", isLogin, authUsers([1]), updateSizes);
sizesRouter.delete("/:id", isLogin, authUsers([1]), deleteSizes);

module.exports = sizesRouter;
