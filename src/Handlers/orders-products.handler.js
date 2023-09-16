const {
  getAll,
  insert,
  update,
  del,
} = require("../Models/orders-products.model");

const getAllOrdersProducts = async (req, res) => {
  try {
    const result = await getAll();
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

const addNewOrdersProducts = async (req, res) => {
  try {
    const { body } = req;
    await insert(
      body.orders_id,
      body.products_sizes_id,
      body.orders_products_qty,
      body.hot_or_ice,
      body.orders_products_subtotal
    );

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

const updateOrdersProducts = async (req, res) => {
  try {
    const { body, params } = req;
    const data = await update(
      body.orders_id,
      body.products_sizes_id,
      body.orders_products_qty,
      body.hot_or_ice,
      body.orders_products_subtotal,
      params.id
    );
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

const deleteOrdersProducts = async (req, res) => {
  try {
    const { params } = req;
    await del(params.id);
    res.status(200).json({
      msg: `Orders Products id = ${params.id} has been deleted!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error,
    });
    console.log(error);
  }
};

module.exports = {
  getAllOrdersProducts,
  addNewOrdersProducts,
  updateOrdersProducts,
  deleteOrdersProducts,
};
