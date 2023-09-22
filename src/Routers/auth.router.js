const authRouter = require("express").Router();
const { register, login } = require("../Handlers/auth.handler");
const { singleUpload } = require("../Middlewares/diskUpload");

authRouter.post("/register", singleUpload("users_image"), register);
authRouter.post("/login", login);

module.exports = authRouter;
