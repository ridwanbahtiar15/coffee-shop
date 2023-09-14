require("dotenv").config();
const db = require("../Configs/postgre.js");

const getAll = () => {
  const sql = `select * from promos`;
  return db.query(sql);
};

const insert = (promosName) => {
  const sql = `insert into promos (promos_name) values ($1)`;
  const values = [promosName];
  return db.query(sql, values);
};

const update = (promosName, id) => {
  const sql =
    "update promos set promos_name = $1, updated_at = now() where promos_id = $2";
  const values = [promosName, id];
  return db.query(sql, values);
};

const del = (id) => {
  const sql = "delete from promos where promos_id = $1 returning promos_name";
  const values = [id];
  return db.query(sql, values);
};

module.exports = { getAll, insert, update, del };
