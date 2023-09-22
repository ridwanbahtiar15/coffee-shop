const express = require("express");
const usersRouter = express.Router();
const { isLogin, authUsers } = require("../Middlewares/authorization");
const { singleUpload } = require("../Middlewares/diskUpload");

const {
  getAllUsers,
  getUsersById,
  addNewUsers,
  updateUsers,
  deleteUsers,
} = require("../Handlers/users.handler");

usersRouter.get("/", isLogin, authUsers([1]), getAllUsers);
usersRouter.get("/profile", isLogin, authUsers([1, 2]), getUsersById);
usersRouter.post(
  "/",
  isLogin,
  authUsers([1]),
  singleUpload("users_image"),
  addNewUsers
);
usersRouter.patch(
  "/:id",
  isLogin,
  authUsers([1]),
  singleUpload("users_image"),
  updateUsers
);
usersRouter.delete("/:id", isLogin, authUsers([1]), deleteUsers);

module.exports = usersRouter;
