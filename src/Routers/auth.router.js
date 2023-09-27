const authRouter = require("express").Router();
const { isLogin } = require("../Middlewares/authorization");

const {
  register,
  login,
  activation,
  logout,
} = require("../Handlers/auth.handler");

authRouter.get("/activation", activation);
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.delete("/logout", isLogin, logout);

module.exports = authRouter;
