const authRouter = require("express").Router();
const { register } = require("../Handlers/auth.handler");

authRouter.post("/register", register);

module.exports = authRouter;
