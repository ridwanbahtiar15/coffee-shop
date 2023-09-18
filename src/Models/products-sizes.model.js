const db = require("../Configs/postgre.js");

const getAll = () => {
  const sql =
    "select ps.products_sizes_id, p.products_name, s.sizes_name from products_sizes ps join products p on ps.products_id = p.products_id join sizes s on ps.sizes_id = s.sizes_id order by ps.products_sizes_id asc";
  return db.query(sql);
};

const insert = (productsId, sizesId) => {
  const sql =
    "insert into products_sizes (products_id, sizes_id) values ($1, $2)";
  const values = [productsId, sizesId];
  return db.query(sql, values);
};

const update = (productsId, sizesId, id) => {
  const sql =
    "update products_sizes set products_id = $1, sizes_id = $2, updated_at = now() where products_sizes_id = $3";
  const values = [productsId, sizesId, id];
  return db.query(sql, values);
};

const del = (id) => {
  const sql = "delete from products_sizes where products_sizes_id = $1";
  const values = [id];
  return db.query(sql, values);
};

module.exports = { getAll, insert, update, del };
