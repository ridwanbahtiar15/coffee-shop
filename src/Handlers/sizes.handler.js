const {
  getAll,
  getById,
  insert,
  update,
  del,
} = require("../Models/sizes.model");

const getAllSizes = async (req, res) => {
  try {
    const result = await getAll();
    if (result.rows.length == 0) {
      return res.status(404).json({
        msg: "Sizes not found!",
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

const addNewSizes = async (req, res) => {
  try {
    const { body } = req;
    if (!body.sizes_name || !body.sizes_cost) {
      return res.status(404).json({
        msg: "Some values not found!",
      });
    }
    await insert(body.sizes_name, body.sizes_cost);
    res.status(200).json({
      msg: "Data has been added!",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const updateSizes = async (req, res) => {
  try {
    const { body, params } = req;
    // if (!body.sizes_name || !body.sizes_cost) {
    //   return res.status(404).json({
    //     msg: "Some values not found!",
    //   });
    // }
    const dataById = await getById(params.id);

    let sizesName = dataById.rows[0].sizes_name;
    let sizesCost = dataById.rows[0].sizes_cost;

    if (body.sizes_name) sizesName = body.sizes_name;
    if (body.sizes_cost) sizesCost = body.sizes_cost;

    const data = await update(sizesName, sizesCost, params.id);
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

const deleteSizes = async (req, res) => {
  try {
    const { params } = req;
    const data = await del(params.id);
    res.status(200).json({
      msg: `Sizes ${data.rows[0].sizes_name}, id = ${params.id} has been deleted!`,
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
  getAllSizes,
  addNewSizes,
  updateSizes,
  deleteSizes,
};
