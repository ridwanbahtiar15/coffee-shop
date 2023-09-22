const express = require("express");
const promosRouter = express.Router();
const { isLogin, authUsers } = require("../Middlewares/authorization");

const {
  getAllPromos,
  addNewPromos,
  updatePromos,
  deletePromos,
} = require("../Handlers/promos.handler");

promosRouter.get("/", getAllPromos);
promosRouter.post("/", isLogin, authUsers([1]), addNewPromos);
promosRouter.patch("/:id", isLogin, authUsers([1]), updatePromos);
promosRouter.delete("/:id", isLogin, authUsers([1]), deletePromos);

module.exports = promosRouter;
