require("dotenv").config();
const db = require("../Configs/postgre.js");

const getAll = () => {
  const sql = `select * from roles`;
  return db.query(sql);
};

const insert = (rolesName) => {
  const sql = `insert into roles (roles_name) values ($1)`;
  const values = [rolesName];
  return db.query(sql, values);
};

const update = (rolesNmae, id) => {
  const sql =
    "update roles set roles_name = $1, updated_at = now() where roles_id = $2";
  const values = [rolesNmae, id];
  return db.query(sql, values);
};

const del = (id) => {
  const sql = "delete from roles where roles_id = $1 returning roles_name";
  const values = [id];
  return db.query(sql, values);
};

module.exports = { getAll, insert, update, del };
