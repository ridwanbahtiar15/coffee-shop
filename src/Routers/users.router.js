const express = require("express");
const usersRouter = express.Router();
const { isLogin, isAdmin } = require("../Middlewares/authorization");

const {
  getAllUsers,
  addNewUsers,
  updateUsers,
  deleteUsers,
} = require("../Handlers/users.handler");

usersRouter.get("/", isLogin, isAdmin, getAllUsers);
usersRouter.post("/", isLogin, isAdmin, addNewUsers);
usersRouter.patch("/:id", isLogin, isAdmin, updateUsers);
usersRouter.delete("/:id", isLogin, isAdmin, deleteUsers);

module.exports = usersRouter;
