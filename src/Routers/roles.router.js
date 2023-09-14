const express = require("express");
const rolesRouter = express.Router();

const {
  getAllRoles,
  addNewRoles,
  updateRoles,
  deleteRoles,
} = require("../Handlers/roles.handler");

rolesRouter.get("/", getAllRoles);
rolesRouter.post("/", addNewRoles);
rolesRouter.patch("/:id", updateRoles);
rolesRouter.delete("/:id", deleteRoles);

module.exports = rolesRouter;
