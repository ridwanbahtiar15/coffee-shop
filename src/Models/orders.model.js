require("dotenv").config();
const db = require("../Configs/postgre.js");

const getAll = () => {
  const sql = `select o.orders_id, u.users_fullname, py.payment_methods_name, d.deliveries_name, pr.promos_name, o.orders_status, o.orders_total
  from orders o 
  join users u on o.users_id = u.users_id 
  join payment_methods py on o.payment_methods_id = py.payment_methods_id 
  join deliveries d on o.deliveries_id = d.deliveries_id 
  join promos pr on o.promos_id = pr.promos_id`;
  return db.query(sql);
};

const insert = (
  usersID,
  paymentMethodsId,
  deliveriesId,
  promosId,
  ordersStatus,
  ordersTotal
) => {
  const sql = `insert into orders (users_id, payment_methods_id, deliveries_id, promos_id, orders_status, orders_total) values ($1, $2, $3, $4, $5, $6)`;
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
  usersID,
  paymentMethodsId,
  deliveriesId,
  promosId,
  ordersStatus,
  ordersTotal,
  id
) => {
  const sql =
    "update orders set users_id = $1, payment_methods_id = $2, deliveries_id = $3, promos_id = $4, orders_status = $5, orders_total = $6, updated_at = now() where orders_id = $7";
  const values = [
    usersID,
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

module.exports = { getAll, insert, update, del };
