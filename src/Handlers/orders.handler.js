const { getAll, insert, update, del } = require("../Models/orders.model");

const getAllOrders = async (req, res) => {
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

const addNewOrders = async (req, res) => {
  try {
    const { body } = req;
    const data = await insert(
      body.users_id,
      body.payment_methods_id,
      body.deliveries_id,
      body.promos_id,
      body.orders_status,
      body.orders_total
    );
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

const updateOrders = async (req, res) => {
  try {
    const { body, params } = req;
    const data = await update(
      body.users_id,
      body.payment_methods_id,
      body.deliveries_id,
      body.promos_id,
      body.orders_status,
      body.orders_total,
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

const deleteOrders = async (req, res) => {
  try {
    const { params } = req;
    const data = await del(params.id);
    res.status(200).json({
      msg: `Orders id = ${params.id} has been deleted!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error,
    });
  }
};

module.exports = {
  getAllOrders,
  addNewOrders,
  updateOrders,
  deleteOrders,
};
