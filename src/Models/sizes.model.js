require("dotenv").config();
const db = require("../Configs/postgre.js");

const getAll = () => {
  const sql = `select * from sizes`;
  return db.query(sql);
};

const insert = (sizesName, sizesCost) => {
  const sql = `insert into sizes (sizes_name, sizes_cost) values ($1, $2)`;
  const values = [sizesName, sizesCost];
  return db.query(sql, values);
};

const update = (sizesName, sizesCost, id) => {
  const sql =
    "update sizes set sizes_name = $1, sizes_cost = $2, updated_at = now() where sizes_id = $3";
  const values = [sizesName, sizesCost, id];
  return db.query(sql, values);
};

const del = (id) => {
  const sql = "delete from sizes where sizes_id = $1 returning sizes_name";
  const values = [id];
  return db.query(sql, values);
};

module.exports = { getAll, insert, update, del };
