const express = require("express");
const categoriesRouter = express.Router();
const { isLogin, authUsers } = require("../Middlewares/authorization");

const {
  getAllCategories,
  addNewCategories,
  updateCategories,
  deleteCategories,
} = require("../Handlers/categories.handler");

categoriesRouter.get("/", isLogin, authUsers([1, 2]), getAllCategories);
categoriesRouter.post("/", isLogin, authUsers([1]), addNewCategories);
categoriesRouter.patch("/:id", isLogin, authUsers([1]), updateCategories);
categoriesRouter.delete("/:id", isLogin, authUsers([1]), deleteCategories);

module.exports = categoriesRouter;
