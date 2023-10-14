const express = require("express");
const usersRouter = express.Router();
const { isLogin, authUsers } = require("../Middlewares/authorization");
// const { upload } = require("../Middlewares/diskUpload");
const { upload } = require("../Middlewares/memoryUpload");

const {
  getAllUsers,
  getUsersById,
  addNewUsers,
  updateUsers,
  updateUserProfile,
  deleteUsers,
} = require("../Handlers/users.handler");

usersRouter.get("/", isLogin, authUsers([1]), getAllUsers);
usersRouter.get("/profile", isLogin, authUsers([1, 2]), getUsersById);
usersRouter.post(
  "/",
  isLogin,
  authUsers([1]),
  upload("users_image"),
  addNewUsers
);
usersRouter.patch(
  "/:id",
  isLogin,
  authUsers([1, 2]),
  upload("users_image"),
  updateUsers
);
usersRouter.patch(
  "/profile/edit",
  isLogin,
  authUsers([1, 2]),
  upload("users_image"),
  updateUserProfile
);
usersRouter.delete("/:id", isLogin, authUsers([1]), deleteUsers);

module.exports = usersRouter;
