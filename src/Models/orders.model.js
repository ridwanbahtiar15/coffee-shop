const db = require("../Configs/postgre.js");
// const client = await db.connect();

const getFilterOrder = (noOrder, page = 1, limit) => {
  let values = [];
  let sql = `SELECT
                o.orders_id, o.created_at, o.orders_status, o.orders_total,
                STRING_AGG (
              p.products_name,
                    ', '
                  ORDER BY
                    op.orders_products_id
                ) product
              FROM
                orders o
              INNER JOIN orders_products op on o.orders_id = op.orders_id 
              INNER JOIN products p on op.products_id = p.products_id
              group by o.orders_id
              OFFSET $1 LIMIT $2`;

  if (noOrder) {
    sql = `SELECT
              o.orders_id, o.created_at, o.orders_status, o.orders_total,
              STRING_AGG (
            p.products_name,
                  ', '
                ORDER BY
                  op.orders_products_id
              ) product
            FROM
              orders o
            INNER JOIN orders_products op on o.orders_id = op.orders_id
            INNER JOIN products p on op.products_id = p.products_id
            WHERE o.orders_id = $1
            group by o.orders_id
            OFFSET $2 LIMIT $3`;
    const offset = page * limit - limit;
    values.push(noOrder, offset, limit);
    return db.query(sql, values);
  }

  const offset = page * limit - limit;
  values.push(offset, limit);
  return db.query(sql, values);
};

const getByUserId = (id) => {
  const sql =
    "select o.orders_id, o.payment_methods_id, o.deliveries_id, o.promos_id, o.orders_status, o.orders_total, o.created_at from orders o where users_id = $1";
  const values = [id];
  return db.query(sql, values);
};

const getById = (id) => {
  const sql =
    "select o.orders_id, o.payment_methods_id, o.deliveries_id, o.promos_id, o.orders_status, o.orders_total, o.created_at from orders o where orders_id = $1";
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

const count = (noOrder) => {
  let sql = `SELECT count(*) FROM orders o`;
  const values = [];
  if (noOrder) {
    sql = `SELECT count(*) FROM orders o WHERE o.orders_id = $1`;
    values.push(noOrder);
    return db.query(sql, values);
  }
  return db.query(sql, values);
};

const getDetailOrderById = (ordersId) => {
  const sql = `select p.products_name, p.products_price, p.products_image, 
                s.sizes_name, op.orders_products_qty, op.hot_or_ice, op.orders_products_subtotal, d.deliveries_name, o.orders_status, o.orders_total
                from orders_products op
                join products p on op.products_id = p.products_id
                join sizes s on op.sizes_id = s.sizes_id
                join orders o on op.orders_id = o.orders_id
                join deliveries d on o.deliveries_id = d.deliveries_id
                where o.orders_id = $1`;
  const values = [ordersId];
  return db.query(sql, values);
};

const getUserByOrderId = (ordersId) => {
  const sql = `select u.users_fullname, u.users_address, u.users_phone, pm.payment_methods_name, o.created_at,
  d.deliveries_name, o.orders_status, o.orders_total
  from orders o 
  join users u on o.users_id = u.users_id
  join payment_methods pm on o.payment_methods_id = pm.payment_methods_id 
  join deliveries d on o.deliveries_id = d.deliveries_id
  where o.orders_id = $1`;
  const values = [ordersId];
  return db.query(sql, values);
};

module.exports = {
  getFilterOrder,
  getByUserId,
  getById,
  insert,
  update,
  del,
  pagination,
  getDetailOrderById,
  getUserByOrderId,
  count,
};
