const {
  getAll,
  insert,
  update,
  del,
} = require("../Models/products-sizes.model");

const getAllProductsSizes = async (req, res) => {
  try {
    const result = await getAll();
    if (result.rows.length == 0) {
      return res.status(404).json({
        msg: "Products Sizes not found!",
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

const addNewProductsSizes = async (req, res) => {
  try {
    const { body } = req;
    await insert(body.products_id, body.sizes_id);
    res.status(200).json({
      msg: "Data has been added!",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
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
    await del(params.id);
    res.status(200).json({
      msg: `Products Sizes id = ${params.id} has been deleted!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllProductsSizes,
  addNewProductsSizes,
  updateProductsSizes,
  deleteProductsSizes,
};
