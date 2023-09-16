const db = require("../Configs/postgre.js");

const getAll = () => {
  const sql = `select * from promos`;
  return db.query(sql);
};

const insert = (promosName, promosStart, promosEnd) => {
  const sql = `insert into promos (promos_name, promos_start, promos_end) values ($1, $2, $3)`;
  const values = [promosName, promosStart, promosEnd];
  return db.query(sql, values);
};

const update = (promosName, promosStart, promosEnd, id) => {
  const sql =
    "update promos set promos_name = $1, promos_start = $2, promos_end = $3, updated_at = now() where promos_id = $4";
  const values = [promosName, promosStart, promosEnd, id];
  return db.query(sql, values);
};

const del = (id) => {
  const sql = "delete from promos where promos_id = $1 returning promos_name";
  const values = [id];
  return db.query(sql, values);
};

module.exports = { getAll, insert, update, del };
