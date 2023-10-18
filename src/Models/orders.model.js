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

const getByUserId = (id) => {
  const sql =
    "select o.orders_id, o.payment_methods_id, o.deliveries_id, o.promos_id, o.orders_status, o.orders_total, o.created_at from orders o where users_id = $1";
  const values = [id];
  return db.query(sql, values);
};

const insert = async (
  userId,
  paymentMethodsId,
  deliveriesId,
  promosID,
  body
) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");
    // order
    const sqlOrder =
      "insert into orders (users_id, payment_methods_id, deliveries_id, promos_id) values ($1, $2, $3, $4) returning orders_id";
    const valuesOrder = [userId, paymentMethodsId, deliveriesId, promosID];
    const order = await client.query(sqlOrder, valuesOrder);

    body.map(async (body) => {
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
      await client.query(sqlOrderProducts, valuesOrderProducts);
    });

    let total = 0;
    for (let i = 0; i < body.length; i++) {
      total += body[i].orders_products_subtotal;
    }

    // update total order
    const sqlUpdateTotal =
      "update orders set orders_total = $1 where orders_id = $2";
    const valuesUpdateTotal = [total, order.rows[0].orders_id];
    await client.query(sqlUpdateTotal, valuesUpdateTotal);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const update = (ordersStatus, id) => {
  const sql =
    "update orders set orders_status = $1, updated_at = now() where orders_id = $2";
  const values = [ordersStatus, id];
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

module.exports = { getAll, getByUserId, insert, update, del, pagination };
