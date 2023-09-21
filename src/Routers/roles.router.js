const express = require("express");
const rolesRouter = express.Router();
const { isLogin, isAdmin } = require("../Middlewares/authorization");

const {
  getAllRoles,
  addNewRoles,
  updateRoles,
  deleteRoles,
} = require("../Handlers/roles.handler");

rolesRouter.get("/", isLogin, isAdmin, getAllRoles);
rolesRouter.post("/", isLogin, isAdmin, addNewRoles);
rolesRouter.patch("/:id", isLogin, isAdmin, updateRoles);
rolesRouter.delete("/:id", isLogin, isAdmin, deleteRoles);

module.exports = rolesRouter;
