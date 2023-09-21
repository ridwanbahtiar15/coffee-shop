const express = require("express");
const promosRouter = express.Router();
const { isLogin, isAdmin } = require("../Middlewares/authorization");

const {
  getAllPromos,
  addNewPromos,
  updatePromos,
  deletePromos,
} = require("../Handlers/promos.handler");

promosRouter.get("/", getAllPromos);
promosRouter.post("/", isLogin, isAdmin, addNewPromos);
promosRouter.patch("/:id", isLogin, isAdmin, updatePromos);
promosRouter.delete("/:id", isLogin, isAdmin, deletePromos);

module.exports = promosRouter;
