const express = require("express");
const rolesRouter = express.Router();
const { isLogin, authUsers } = require("../Middlewares/authorization");

const {
  getAllRoles,
  addNewRoles,
  updateRoles,
  deleteRoles,
} = require("../Handlers/roles.handler");

rolesRouter.get("/", isLogin, authUsers([1]), getAllRoles);
rolesRouter.post("/", isLogin, authUsers([1]), addNewRoles);
rolesRouter.patch("/:id", isLogin, authUsers([1]), updateRoles);
rolesRouter.delete("/:id", isLogin, authUsers([1]), deleteRoles);

module.exports = rolesRouter;
