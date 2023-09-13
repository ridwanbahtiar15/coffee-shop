const { getAll, insert, update, del } = require("../Models/categories.model");

const getAllCategories = async (req, res) => {
  try {
    result = await getAll();
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
    // console.log(body.categories_name);
    const data = await insert(body.categories_name);
    res.status(200).json({
      msg: "Data has been added!",
      result: data.rows,
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
    // console.log(data.rowCount);
    if (data.rowCount == 0) {
      return res.status(500).json({
        msg: "Internal Server Error",
      });
    }
    res.status(200).json({
      msg: `Data has been updated!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
    console.log(error);
  }
};

const deleteCategories = async (req, res) => {
  try {
    const { params } = req;
    const data = await del(params.id);
    res.status(200).json({
      msg: `Book ${data.rows[0].categories_name}, id = ${params.id} has been deleted!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error,
    });
  }
};

module.exports = {
  getAllCategories,
  addNewCategories,
  updateCategories,
  deleteCategories,
};
