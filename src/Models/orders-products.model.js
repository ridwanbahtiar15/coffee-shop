require("dotenv").config();
const db = require("../Configs/postgre.js");

const getAll = () => {
  const sql = `select op.orders_products_id ,op.orders_id ,p.products_name, s.sizes_name, op.orders_products_qty, hot_or_ice from orders_products op join products_sizes ps on op.products_sizes_id = ps.products_sizes_id join products p on ps.products_id = p.products_id join sizes s on ps.sizes_id = s.sizes_id`;
  return db.query(sql);
};

const insert = (ordersId, productsSizesId, qty, hotOrIce) => {
  const sql = `insert into orders_products (orders_id, products_sizes_id, orders_products_qty, hot_or_ice) values ($1, $2, $3, $4)`;
  const values = [ordersId, productsSizesId, qty, hotOrIce];
  return db.query(sql, values);
};

const update = (ordersId, productsSizesId, qty, hotOrIce, id) => {
  const sql =
    "update orders_products set orders_id = $1, products_sizes_id = $2, orders_products_qty = $3, hot_or_ice = $4 where orders_products_id = $5";
  const values = [ordersId, productsSizesId, qty, hotOrIce, id];
  return db.query(sql, values);
};

const del = (id) => {
  const sql = "delete from orders_products where orders_products_id = $1";
  const values = [id];
  return db.query(sql, values);
};

module.exports = { getAll, insert, update, del };
