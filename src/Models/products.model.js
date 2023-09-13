require("dotenv").config();
const db = require("../Configs/postgre.js");

const getAll = () => {
  const sql = `select p.products_id, p.products_name, p.products_price, p.products_desc, p.products_stock, p.products_image, c.categories_name from products p
  join categories c on p.categories_id = c.categories_id;`;
  return db.query(sql);
};

const insert = (
  prodcutsName,
  prodcutsPrice,
  prodcutsDesc,
  prodcutsStock,
  prodcutsImage,
  categoriesId
) => {
  const sql = `insert into products (products_name, products_price, products_desc,products_stock, products_image, categories_id) values ($1, $2, $3, $4, $5, $6)`;
  const values = [
    prodcutsName,
    prodcutsPrice,
    prodcutsDesc,
    prodcutsStock,
    prodcutsImage,
    categoriesId,
  ];
  return db.query(sql, values);
};

const update = (
  prodcutsName,
  prodcutsPrice,
  prodcutsDesc,
  prodcutsStock,
  prodcutsImage,
  categoriesId,
  id
) => {
  const sql =
    "update products set products_name = $1, products_price = $2, products_desc = $3, products_stock = $4, products_image = $5, categories_id = $6  where products_id = $7";
  const values = [
    prodcutsName,
    prodcutsPrice,
    prodcutsDesc,
    prodcutsStock,
    prodcutsImage,
    categoriesId,
    id,
  ];
  return db.query(sql, values);
};

const del = (id) => {
  const sql =
    "delete from products where products_id = $1 returning products_name";
  const values = [id];
  return db.query(sql, values);
};

module.exports = { getAll, insert, update, del };
