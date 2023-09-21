const db = require("../Configs/postgre.js");

const { getAll, getById, update, del } = require("../Models/orders.model");

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

// const addNewOrders = async (req, res) => {
//   try {
//     const { body } = req;
//     if (
//       !body.users_id ||
//       !body.payment_methods_id ||
//       !body.deliveries_id ||
//       !body.promos_id ||
//       !body.orders_status ||
//       !body.orders_total
//     ) {
//       return res.status(404).json({
//         msg: "Some values not found!",
//       });
//     }
//     await insert(
//       body.users_id,
//       body.payment_methods_id,
//       body.deliveries_id,
//       body.promos_id,
//       body.orders_status,
//       body.orders_total
//     );
//     res.status(200).json({
//       msg: "Data has been added!",
//     });
//   } catch (error) {
//     res.status(500).json({
//       msg: "Internal Server Error",
//     });
//   }
// };

const addNewOrder = async (req) => {
  const client = await db.connect();
  const { body } = req;

  try {
    await client.query("BEGIN");
    // order
    const sqlOrder =
      "insert into orders (users_id, payment_methods_id, deliveries_id, promos_id, orders_status, orders_total) values ($1, $2, $3, $4, $5, $6) returning orders_id";
    const valuesOrder = [
      body.users_id,
      body.payment_methods_id,
      body.deliveries_id,
      body.promos_id,
      body.orders_status,
      body.orders_total,
    ];
    const order = await client.query(sqlOrder, valuesOrder);

    // order products
    const sqlOrderProducts =
      "insert into orders_products (orders_id, products_id, sizes_id, orders_products_qty, orders_products_subtotal, hot_or_ice) values ($1, $2, $3, $4, $5, $6) returning orders_products_qty, products_id";
    const valuesOrderProducts = [
      order.rows[0].orders_id,
      body.products_id,
      body.sizes_id,
      body.orders_products_qty,
      body.orders_products_subtotal,
      body.hot_or_ice,
    ];
    const orderProducts = await client.query(
      sqlOrderProducts,
      valuesOrderProducts
    );

    // get product price
    const sqlProducts =
      "select products_price from products where products_id = $1";
    const valuesProducts = [orderProducts.rows[0].products_id];
    const products = await client.query(sqlProducts, valuesProducts);

    // count subtotal order products
    const price = products.rows[0].products_price;
    const qty = orderProducts.rows[0].orders_products_qty;
    const subtotal = price * qty;

    // update subtotal orders products
    const sqlUpdateSubtotal =
      "update orders_products set orders_products_subtotal = $1 where orders_id = $2 returning orders_products_subtotal";
    const valuesUpdate = [subtotal, order.rows[0].orders_id];
    const result = await client.query(sqlUpdateSubtotal, valuesUpdate);

    // update total order
    const sqlUpdateTotal =
      "update orders set orders_total = $1 where orders_id = $2";
    const valuesUpdateTotal = [
      result.rows[0].orders_products_subtotal,
      order.rows[0].orders_id,
    ];
    await client.query(sqlUpdateTotal, valuesUpdateTotal);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
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
