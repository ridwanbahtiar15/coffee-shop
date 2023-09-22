const db = require("../Configs/postgre.js");

const getAll = (page = 1, limit = 99) => {
  const offset = page * limit - limit;
  const sql = `
  select u.users_id, u.users_fullname, u.users_email, u.users_phone, u.users_address, u.users_image, r.roles_name 
  from users u
  join roles r on u.roles_id = r.roles_id
  where deleted_at is NULL
  order by u.users_id asc
  offset $1 limit $2`;
  const values = [offset, limit];
  return db.query(sql, values);
};

const getById = (id) => {
  const sql =
    "select u.users_fullname, u.users_email, u.users_password, u.users_phone, u.users_address, u.users_image, u.roles_id from users u where users_id = $1";
  const values = [id];
  return db.query(sql, values);
};

const getUserProfile = (id) => {
  const sql =
    "select u.users_fullname, u.users_email, u.users_phone, u.users_address, u.users_image, r.roles_name from users u join roles r on u.roles_id = r.roles_id where users_id = $1";
  const values = [id];
  return db.query(sql, values);
};

const insert = (
  usersFullName,
  usersEmail,
  usersPassword,
  usersPhone,
  usersAddress,
  usersImage,
  rolesId
) => {
  const sql = `insert into users (users_fullname, users_email, users_password, users_phone, users_address, users_image, roles_id) values ($1, $2, $3, $4, $5, $6, $7)`;
  const values = [
    usersFullName,
    usersEmail,
    usersPassword,
    usersPhone,
    usersAddress,
    usersImage,
    rolesId,
  ];
  return db.query(sql, values);
};

const update = (
  usersFullName,
  usersEmail,
  usersPassword,
  usersPhone,
  usersAddress,
  usersImage,
  rolesId,
  id
) => {
  const sql =
    "update users set users_fullname = $1, users_email = $2, users_password = $3, users_phone = $4, users_address = $5, users_image = $6, roles_id = $7, updated_at = now() where users_id = $8";
  const values = [
    usersFullName,
    usersEmail,
    usersPassword,
    usersPhone,
    usersAddress,
    usersImage,
    rolesId,
    id,
  ];
  return db.query(sql, values);
};

// soft delete
const softDelete = (id) => {
  const sql =
    "update users set deleted_at = now() where users_id = $1 returning users_fullname";
  const values = [id];
  return db.query(sql, values);
};

module.exports = {
  getAll,
  getById,
  getUserProfile,
  insert,
  update,
  softDelete,
};
