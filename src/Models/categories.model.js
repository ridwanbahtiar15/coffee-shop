const db = require("../Configs/postgre.js");

const getAll = () => {
  const sql = "select * from categories";
  return db.query(sql);
};

const insert = (categoriesName) => {
  const sql = "insert into categories (categories_name) values ($1)";
  const values = [categoriesName];
  return db.query(sql, values);
};

const update = (categoriesName, id) => {
  const sql =
    "update categories set categories_name = $1, updated_at = now() where categories_id = $2";
  const values = [categoriesName, id];
  return db.query(sql, values);
};

const del = (id) => {
  const sql =
    "delete from categories where categories_id = $1 returning categories_name";
  const values = [id];
  return db.query(sql, values);
};

module.exports = { getAll, insert, update, del };
