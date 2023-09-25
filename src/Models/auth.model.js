const db = require("../Configs/postgre.js");

const createUser = (
  usersFullname,
  usersEmail,
  usersPassword,
  usersPhone,
  usersAddress,
  usersImage,
  rolesId
) => {
  const sql = `insert into users (users_fullname, users_email, users_password, users_phone, users_address, users_image, roles_id) values ($1, $2, $3, $4, $5, $6, $7) returning users_id`;
  const values = [
    usersFullname,
    usersEmail,
    usersPassword,
    usersPhone,
    usersAddress,
    usersImage,
    rolesId,
  ];
  return db.query(sql, values);
};

const getUserByEmail = (usersEmail) => {
  const sql =
    "select users_id, users_fullname, users_email, users_password, roles_id from users where users_email = $1";
  const values = [usersEmail];
  return db.query(sql, values);
};

const insertToken = (usersId, token) => {
  const sql = `insert into users_activation (users_id, token) values ($1, $2)`;
  const values = [usersId, token];
  return db.query(sql, values);
};

const checkUserEmail = (usersEmail) => {
  const sql = `select users_email from users where users_email = $1`;
  const values = [usersEmail];
  return db.query(sql, values);
};

const checkUserToken = (usersToken) => {
  const sql = `select token from users_activation where token = $1`;
  const values = [usersToken];
  return db.query(sql, values);
};

const updateUserActive = (usersEmail) => {
  const sql = `update users set is_active = 1 where users_email = $1`;
  const values = [usersEmail];
  return db.query(sql, values);
};

const delUserToken = (usersToken) => {
  const sql = `delete from users_activation where token = $1`;
  const values = [usersToken];
  return db.query(sql, values);
};

module.exports = {
  createUser,
  getUserByEmail,
  insertToken,
  checkUserEmail,
  checkUserToken,
  updateUserActive,
  delUserToken,
};
