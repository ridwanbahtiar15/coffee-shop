const authRouter = require("express").Router();
const { register, login, activation } = require("../Handlers/auth.handler");

authRouter.get("/activation", activation);
authRouter.post("/register", register);
authRouter.post("/login", login);

module.exports = authRouter;
