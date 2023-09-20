const {
  getAll,
  getById,
  insert,
  update,
  del,
} = require("../Models/categories.model");

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
      msg: "Internal Server Error",
    });
  }
};

const updateCategories = async (req, res) => {
  try {
    const { body, params } = req;
    const dataById = await getById(params.id);
    let categoriesName = body.categories_name;
    if (!categoriesName) categoriesName = dataById.rows[0].categories_name;

    const data = await update(categoriesName, params.id);

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
    if (error.code == "23503") {
      return res.status(500).json({
        msg: "Error Constraint",
      });
    }
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
