const express = require("express");
const categoriesRouter = express.Router();
const { isLogin, isAdmin } = require("../Middlewares/authorization");

const {
  getAllCategories,
  addNewCategories,
  updateCategories,
  deleteCategories,
} = require("../Handlers/categories.handler");

categoriesRouter.get("/", isLogin, isAdmin, getAllCategories);
categoriesRouter.post("/", isLogin, isAdmin, addNewCategories);
categoriesRouter.patch("/:id", isLogin, isAdmin, updateCategories);
categoriesRouter.delete("/:id", isLogin, isAdmin, deleteCategories);

module.exports = categoriesRouter;
