const db = require("../Configs/postgre.js");

const getAll = () => {
  const sql = "select * from payment_methods";
  return db.query(sql);
};

const getById = (id) => {
  const sql =
    "select p.payment_methods_name from payment_methods p where p.payment_methods_id = $1";
  const values = [id];
  return db.query(sql, values);
};

const insert = (paymentMethodsName) => {
  const sql = "insert into payment_methods (payment_methods_name) values ($1)";
  const values = [paymentMethodsName];
  return db.query(sql, values);
};

const update = (paymentMethodsName, id) => {
  const sql =
    "update payment_methods set payment_methods_name = $1, updated_at = now() where payment_methods_id = $2";
  const values = [paymentMethodsName, id];
  return db.query(sql, values);
};

const del = (id) => {
  const sql =
    "delete from payment_methods where payment_methods_id = $1 returning payment_methods_name";
  const values = [id];
  return db.query(sql, values);
};

module.exports = { getAll, getById, insert, update, del };
