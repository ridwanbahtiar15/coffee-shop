const {
  getAll,
  insert,
  update,
  del,
  findName,
  filterProducts,
  pagination,
  getPopular,
} = require("../Models/products.model");

const getAllProducts = async (req, res) => {
  try {
    const { query } = req;
    let result;
    if (query.name && query.category && query.minrange && query.maxrange) {
      result = await filterProducts(
        query.name,
        query.category,
        query.minrange,
        query.maxrange
      );
    } else if (query.name) {
      result = await findName(query.name);
    } else if (query.page && query.limit) {
      result = await pagination(query.page, query.limit);
    } else {
      result = await getAll();
    }

    if (result.rows.length == 0) {
      return res.status(404).json({
        msg: "Products not found!",
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

const addNewProducts = async (req, res) => {
  try {
    const { body } = req;
    await insert(
      body.products_name,
      body.products_price,
      body.products_desc,
      body.products_stock,
      body.products_image,
      body.categories_id
    );
    res.status(200).json({
      msg: "Data has been added!",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const updateProducts = async (req, res) => {
  try {
    const { body, params } = req;
    const data = await update(
      body.products_name,
      body.products_price,
      body.products_desc,
      body.products_stock,
      body.products_image,
      body.categories_id,
      params.id
    );
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

const deleteProducts = async (req, res) => {
  try {
    const { params } = req;
    const data = await del(params.id);
    res.status(200).json({
      msg: `Products ${data.rows[0].products_name}, id = ${params.id} has been deleted!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const getPopularProducts = async (req, res) => {
  try {
    const data = await getPopular();
    res.status(200).json({
      msg: "Success",
      result: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Interval Server Error",
    });
  }
};

module.exports = {
  getAllProducts,
  addNewProducts,
  updateProducts,
  deleteProducts,
  getPopularProducts,
};
