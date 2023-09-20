const db = require("../Configs/postgre.js");

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

const insert = (
  usersID,
  paymentMethodsId,
  deliveriesId,
  promosId,
  ordersStatus,
  ordersTotal
) => {
  const sql =
    "insert into orders (users_id, payment_methods_id, deliveries_id, promos_id, orders_status, orders_total) values ($1, $2, $3, $4, $5, $6)";
  const values = [
    usersID,
    paymentMethodsId,
    deliveriesId,
    promosId,
    ordersStatus,
    ordersTotal,
  ];
  return db.query(sql, values);
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
