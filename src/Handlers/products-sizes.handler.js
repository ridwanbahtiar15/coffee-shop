const {
  getAll,
  insert,
  update,
  del,
} = require("../Models/products-sizes.model");

const getAllProductsSizes = async (req, res) => {
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

const addNewProductsSizes = async (req, res) => {
  try {
    const { body } = req;
    const data = await insert(body.products_id, body.sizes_id);
    res.status(200).json({
      msg: "Data has been added!",
      result: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "error",
      error,
    });
  }
};

const updateProductsSizes = async (req, res) => {
  try {
    const { body, params } = req;
    const data = await update(body.products_id, body.sizes_id, params.id);
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
  }
};

const deleteProductsSizes = async (req, res) => {
  try {
    const { params } = req;
    const data = await del(params.id);
    res.status(200).json({
      msg: `Products Sizes id = ${params.id} has been deleted!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error,
    });
  }
};

module.exports = {
  getAllProductsSizes,
  addNewProductsSizes,
  updateProductsSizes,
  deleteProductsSizes,
};
