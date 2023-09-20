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
  const sql = `insert into users (users_fullname, users_email, users_password, users_phone, users_address, users_image, roles_id) values ($1, $2, $3, $4, $5, $6, $7)`;
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

module.exports = { createUser };
