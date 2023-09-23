const db = require("../Configs/postgre.js");

const getAll = () => {
  const sql =
    "select p.products_id, p.products_name, p.products_price, products_desc, p.products_stock, p.products_image, c.categories_name from products p join categories c on p.categories_id = c.categories_id order by p.created_at asc";
  return db.query(sql);
};

const getById = (id) => {
  const sql =
    "select p.products_name, p.products_price, p.products_desc, p.products_stock, p.products_image, p.categories_id from products p where p.products_id = $1";
  const values = [id];
  return db.query(sql, values);
};

const insert = (
  productsName,
  prodcutsPrice,
  prodcutsDesc,
  prodcutsStock,
  prodcutsImage,
  categoriesId
) => {
  const sql =
    "insert into products (products_name, products_price, products_desc,products_stock, products_image, categories_id) values ($1, $2, $3, $4, $5, $6)";
  const values = [
    productsName,
    prodcutsPrice,
    prodcutsDesc,
    prodcutsStock,
    prodcutsImage,
    categoriesId,
  ];
  return db.query(sql, values);
};

const update = (
  productsName,
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
    productsName,
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

const getPopular = () => {
  const sql = `
  select p.products_id, p.products_name, sum(op.orders_products_qty) as sold
  from orders_products op
  join products p on op.products_id = p.products_id
  group by p.products_id
  order by sold desc`;
  return db.query(sql);
};

const filtersProducts = (
  productsName,
  category,
  minRange = 10000,
  maxRange = 100000,
  page = 1,
  limit = 99
) => {
  // jika tidak ada name dan category
  if (!productsName && !category) {
    const offset = page * limit - limit;
    const sql = `select p.products_id, p.products_name, p.products_price, p.products_desc, p.products_stock, p.products_image, c.categories_name
    from products p
    join categories c on p.categories_id = c.categories_id
    where products_price >= $1 and products_price <= $2
    order by p.created_at asc
    limit $3 offset $4`;
    const values = [minRange, maxRange, limit, offset];
    return db.query(sql, values);
  }

  // jika tidak ada category
  if (!category) {
    const offset = page * limit - limit;
    const sql = `select p.products_id, p.products_name, p.products_price, p.products_desc, p.products_stock, p.products_image, c.categories_name
    from products p
    join categories c on p.categories_id = c.categories_id
    where p.products_name like $1
    and products_price >= $2 and products_price <= $3
    order by p.created_at asc
    limit $4 offset $5`;
    const values = [`%${productsName}%`, minRange, maxRange, limit, offset];
    return db.query(sql, values);
  }

  // jika tidak ada name
  if (!productsName) {
    const offset = page * limit - limit;
    const sql = `select p.products_id, p.products_name, p.products_price, p.products_desc, p.products_stock, p.products_image, c.categories_name
    from products p
    join categories c on p.categories_id = c.categories_id
    where c.categories_name = $1
    and products_price >= $2 and products_price <= $3
    order by p.created_at asc
    limit $4 offset $5`;
    const values = [category, minRange, maxRange, limit, offset];
    return db.query(sql, values);
  }

  // jika data lengkap
  if (productsName && category) {
    const offset = page * limit - limit;
    const sql = `select p.products_id, p.products_name, p.products_price, p.products_desc, p.products_stock, p.products_image, c.categories_name
    from products p
    join categories c on p.categories_id = c.categories_id
    where p.products_name like $1
    and products_price >= $3 and products_price <= $4
    and c.categories_name = $2
    order by p.created_at asc
    limit $5 offset $6`;
    const values = [
      `%${productsName}%`,
      category,
      minRange,
      maxRange,
      limit,
      offset,
    ];
    return db.query(sql, values);
  }
};

const count = (productsName, category, minRange = 10000, maxRange = 100000) => {
  let sql = `select count(*) from products p`;
  const values = [];
  if (productsName && category && minRange && maxRange) {
    sql += ` join categories c on p.categories_id = c.categories_id where p.products_name like $1 and c.categories_name = $2 and p.products_price >= $3 and p.products_price <= $4`;
    values.push(`%${productsName}%`, category, minRange, maxRange);
    return db.query(sql, values);
  }
  if (productsName) {
    sql += ` where p.products_name like $1 and p.products_price >= $2 and p.products_price <= $3`;
    values.push(`%${productsName}%`, minRange, maxRange);
    return db.query(sql, values);
  }
  if (category) {
    sql += ` join categories c on p.categories_id = c.categories_id where c.categories_name = $1 and p.products_price >= $2 and p.products_price <= $3`;
    values.push(category, minRange, maxRange);
    return db.query(sql, values);
  }

  // jika tidak ada productsname & category
  if (!productsName && !category) {
    sql += ` where p.products_price >= $1 and p.products_price <= $2`;
    values.push(minRange, maxRange);
    return db.query(sql, values);
  }
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  del,
  getPopular,
  filtersProducts,
  count,
};
