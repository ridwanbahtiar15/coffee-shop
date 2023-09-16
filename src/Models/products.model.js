const db = require("../Configs/postgre.js");

const getAll = () => {
  const sql = `select p.products_id, p.products_name, p.products_price, p.products_desc, p.products_stock, p.products_image, c.categories_name from products p
  join categories c on p.categories_id = c.categories_id order by p.products_id asc`;
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
    "update products set products_name = $1, products_price = $2, products_desc = $3, products_stock = $4, products_image = $5, categories_id = $6, updated_at = now()  where products_id = $7";
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

const findName = (productsName) => {
  const sql = `select p.products_id, p.products_name, p.products_price, p.products_desc, p.products_stock, p.products_image, c.categories_name, p.created_at from products p
  join categories c on p.categories_id = c.categories_id where products_name like $1 order by p.products_id asc`;
  const values = [`%${productsName}%`];
  return db.query(sql, values);
};

const filterProducts = (prodcutsName, category, minRange, maxRange) => {
  const sql = `select p.products_id, p.products_name, p.products_price, p.products_desc, p.products_stock, p.products_image, c.categories_name, p.created_at
  from products p
  join categories c on p.categories_id = c.categories_id
  where p.products_name like $1
  and products_price >= $3 and products_price <= $4
  and c.categories_name = $2
  order by p.created_at asc`;
  const values = [`%${prodcutsName}%`, category, minRange, maxRange];
  return db.query(sql, values);
};

const pagination = (page, limit) => {
  const offset = page * limit - limit;
  const sql = `
  select p.products_id, p.products_name, p.products_price, p.products_desc, p.products_stock, p.products_image, c.categories_name 
  from products p
  join categories c on p.categories_id = c.categories_id 
  order by p.products_id asc
  limit $2 offset $1`;
  const values = [offset, limit];
  return db.query(sql, values);
};

const getPopular = () => {
  const sql = `
  select p.products_id, p.products_name, sum(op.orders_products_qty) as sold ,sum(op.orders_products_subtotal) as profit
  from orders_products op
  join products_sizes ps on op.products_sizes_id = ps.products_sizes_id
  join products p on ps.products_id = p.products_id
  group by p.products_id;`;
  return db.query(sql);
};

module.exports = {
  getAll,
  insert,
  update,
  del,
  findName,
  filterProducts,
  pagination,
  getPopular,
};
