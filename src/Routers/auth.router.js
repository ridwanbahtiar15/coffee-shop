const authRouter = require("express").Router();
const { register, login } = require("../Handlers/auth.handler");

authRouter.post("/register", register);
authRouter.post("/login", login);

module.exports = authRouter;
