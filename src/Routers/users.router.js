const express = require("express");
const usersRouter = express.Router();
const { isLogin, isAdmin } = require("../Middlewares/authorization");
const { singleUpload } = require("../Middlewares/diskUpload");

const {
  getAllUsers,
  addNewUsers,
  updateUsers,
  deleteUsers,
} = require("../Handlers/users.handler");

usersRouter.get("/", getAllUsers);
usersRouter.post("/", singleUpload("users_image"), addNewUsers);
usersRouter.patch("/:id", singleUpload("users_image"), updateUsers);
usersRouter.delete("/:id", isLogin, isAdmin, deleteUsers);

module.exports = usersRouter;
