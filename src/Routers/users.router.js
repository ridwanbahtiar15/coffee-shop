const express = require("express");
const usersRouter = express.Router();
const { isLogin, authUsers } = require("../Middlewares/authorization");

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
usersRouter.post("/", isLogin, authUsers([1]), addNewUsers);
usersRouter.patch("/:id", isLogin, authUsers([1, 2]), updateUsers);
usersRouter.patch(
  "/profile/edit",
  isLogin,
  authUsers([1, 2]),
  updateUserProfile
);
usersRouter.delete("/:id", isLogin, authUsers([1]), deleteUsers);

module.exports = usersRouter;
