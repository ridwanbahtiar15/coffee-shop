const db = require("../Configs/postgre.js");
// const client = await db.connect();

const getAll = (page = 1, limit = 99) => {
  const sql = `select o.orders_id, u.users_fullname, py.payment_methods_name, d.deliveries_name, pr.promos_name, o.orders_status, o.orders_total
  from orders o 
  join users u on o.users_id = u.users_id 
  join payment_methods py on o.payment_methods_id = py.payment_methods_id 
  join deliveries d on o.deliveries_id = d.deliveries_id 
  join promos pr on o.promos_id = pr.promos_id
  offset $1 limit $2`;
  const offset = page * limit - limit;
  const values = [offset, limit];
  return db.query(sql, values);
};

const getById = (id) => {
  const sql =
    "select o.payment_methods_id, o.deliveries_id, o.promos_id, o.orders_status, o.orders_total from orders o where orders_id = $1";
  const values = [id];
  return db.query(sql, values);
};

const insert = async (
  userId,
  paymentMethodsId,
  deliveriesId,
  promosID,
  ordersStatus,
  ordersTotal,
  productsId,
  sizesId,
  ordersProductsQty,
  ordersProductsSubtotal,
  hotOrIce
) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");
    // order
    const sqlOrder =
      "insert into orders (users_id, payment_methods_id, deliveries_id, promos_id, orders_status, orders_total) values ($1, $2, $3, $4, $5, $6) returning orders_id";
    const valuesOrder = [
      userId,
      paymentMethodsId,
      deliveriesId,
      promosID,
      ordersStatus,
      ordersTotal,
    ];
    const order = await client.query(sqlOrder, valuesOrder);

    // order products
    const sqlOrderProducts =
      "insert into orders_products (orders_id, products_id, sizes_id, orders_products_qty, orders_products_subtotal, hot_or_ice) values ($1, $2, $3, $4, $5, $6) returning orders_products_qty, products_id";
    const valuesOrderProducts = [
      order.rows[0].orders_id,
      productsId,
      sizesId,
      ordersProductsQty,
      ordersProductsSubtotal,
      hotOrIce,
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

const update = (
  paymentMethodsId,
  deliveriesId,
  promosId,
  ordersStatus,
  ordersTotal,
  id
) => {
  const sql =
    "update orders set payment_methods_id = $1, deliveries_id = $2, promos_id = $3, orders_status = $4, orders_total = $5, updated_at = now() where orders_id = $6";
  const values = [
    paymentMethodsId,
    deliveriesId,
    promosId,
    ordersStatus,
    ordersTotal,
    id,
  ];
  return db.query(sql, values);
};

const del = (id) => {
  const sql = "delete from orders where orders_id = $1";
  const values = [id];
  return db.query(sql, values);
};

const pagination = (page, limit) => {
  const offset = page * limit - limit;
  const sql = `select o.orders_id, u.users_fullname, py.payment_methods_name, d.deliveries_name, pr.promos_name, o.orders_status, o.orders_total
  from orders o 
  join users u on o.users_id = u.users_id 
  join payment_methods py on o.payment_methods_id = py.payment_methods_id 
  join deliveries d on o.deliveries_id = d.deliveries_id 
  join promos pr on o.promos_id = pr.promos_id
  order by o.orders_id asc
  limit $2 offset $1`;
  const values = [offset, limit];
  return db.query(sql, values);
};

module.exports = { getAll, getById, insert, update, del, pagination };
