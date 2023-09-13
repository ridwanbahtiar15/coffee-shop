const express = require("express");
const categoriesRouter = express.Router();

const {
  getAllCategories,
  addNewCategories,
  updateCategories,
  deleteCategories,
} = require("../Handlers/categories.handler");

categoriesRouter.get("/", getAllCategories);
categoriesRouter.post("/", addNewCategories);
categoriesRouter.patch("/:id", updateCategories);
categoriesRouter.delete("/:id", deleteCategories);

module.exports = categoriesRouter;
