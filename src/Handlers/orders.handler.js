const {
  getAll,
  getById,
  insert,
  update,
  del,
} = require("../Models/orders.model");

const getAllOrders = async (req, res) => {
  try {
    const { query } = req;
    let result;
    query.page || query.limit
      ? (result = await getAll(query.page, query.limit))
      : (result = await getAll());

    if (result.rows.length == 0) {
      return res.status(404).json({
        msg: "Orders not found!",
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

const addNewOrder = async (req, res) => {
  try {
    const { body } = req;
    await insert(
      body.users_id,
      body.payment_methods_id,
      body.deliveries_id,
      body.promos_id,
      body.orders_status,
      body.orders_total,
      body.products_id,
      body.sizes_id,
      body.orders_products_qty,
      body.orders_products_subtotal,
      body.hot_or_ice
    );
    res.status(200).json({
      msg: "Data has been added!",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
    console.log(error);
  }
};

const updateOrders = async (req, res) => {
  try {
    const { body, params } = req;
    const dataById = await getById(params.id);

    let paymentMethodsId = body.payment_methods_id;
    let deliveriesId = body.deliveries_id;
    let promosID = body.promos_id;
    let ordersStatus = body.orders_status;
    let ordersTotal = body.orders_total;

    if (!paymentMethodsId)
      paymentMethodsId = dataById.rows[0].payment_methods_id;
    if (!deliveriesId) deliveriesId = dataById.rows[0].deliveries_id;
    if (!promosID) promosID = dataById.rows[0].promos_id;
    if (!ordersStatus) ordersStatus = dataById.rows[0].orders_status;
    if (!ordersTotal) ordersTotal = dataById.rows[0].orders_total;

    const data = await update(
      paymentMethodsId,
      deliveriesId,
      promosID,
      ordersStatus,
      ordersTotal,
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
    console.log(error);
  }
};

const deleteOrders = async (req, res) => {
  try {
    const { params } = req;
    await del(params.id);
    res.status(200).json({
      msg: `Orders id = ${params.id} has been deleted!`,
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
  getAllOrders,
  addNewOrder,
  updateOrders,
  deleteOrders,
};
