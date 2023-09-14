const express = require("express");
const usersRouter = express.Router();

const {
  getAllUsers,
  addNewUsers,
  updateUsers,
  deleteUsers,
} = require("../Handlers/users.handler");

usersRouter.get("/", getAllUsers);
usersRouter.post("/", addNewUsers);
usersRouter.patch("/:id", updateUsers);
usersRouter.delete("/:id", deleteUsers);

module.exports = usersRouter;
