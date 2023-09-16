const db = require("../Configs/postgre.js");

const getAll = () => {
  const sql = `select * from deliveries`;
  return db.query(sql);
};

const insert = (deliveriesName, deliveriesCost) => {
  const sql = `insert into deliveries (deliveries_name, deliveries_cost) values ($1, $2)`;
  const values = [deliveriesName, deliveriesCost];
  return db.query(sql, values);
};

const update = (deliveriesName, deliveriesCost, id) => {
  const sql =
    "update deliveries set deliveries_name = $1, deliveries_cost = $2, updated_at = now() where deliveries_id = $3";
  const values = [deliveriesName, deliveriesCost, id];
  return db.query(sql, values);
};

const del = (id) => {
  const sql =
    "delete from deliveries where deliveries_id = $1 returning deliveries_name";
  const values = [id];
  return db.query(sql, values);
};

module.exports = { getAll, insert, update, del };
