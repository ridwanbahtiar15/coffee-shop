const { getAll, insert, update, del } = require("../Models/categories.model");

const getAllCategories = async (req, res) => {
  try {
    const result = await getAll();
    if (result.rows.length == 0) {
      return res.status(404).json({
        msg: "Categories not found!",
        result: [],
      });
    }
    res.status(200).json({
      msg: "Success",
      result: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
    console.log(error);
  }
};

const addNewCategories = async (req, res) => {
  try {
    const { body } = req;
    await insert(body.categories_name);
    res.status(200).json({
      msg: "Data has been added!",
    });
  } catch (error) {
    res.status(500).json({
      msg: "error",
      error,
    });
    console.log(error);
  }
};

const updateCategories = async (req, res) => {
  try {
    const { body, params } = req;
    const data = await update(body.categories_name, params.id);
    if (data.rowCount == 0) {
      return res.status(500).json({
        msg: "Internal Server Error",
      });
    }
    res.status(200).json({
      msg: "Data has been updated!",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const deleteCategories = async (req, res) => {
  try {
    const { params } = req;
    const data = await del(params.id);
    res.status(200).json({
      msg: `Category ${data.rows[0].categories_name}, id = ${params.id} has been deleted!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllCategories,
  addNewCategories,
  updateCategories,
  deleteCategories,
};
