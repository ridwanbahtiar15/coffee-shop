const db = require("../Configs/postgre.js");

const getAll = () => {
  const sql =
    "select p.products_id, p.products_name, p.products_price, products_desc, p.products_stock, p.products_image, c.categories_name from products p join categories c on p.categories_id = c.categories_id order by p.created_at asc";
  return db.query(sql);
};

const getById = (id) => {
  const sql = `select p.products_name, p.products_price, p.products_desc, p.products_stock, p.products_image, p.categories_id, c.categories_name from products p join categories c on p.categories_id = c.categories_id where p.products_id = $1`;
  const values = [id];
  return db.query(sql, values);
};

const insert = (
  productsName,
  prodcutsPrice,
  prodcutsDesc,
  prodcutsStock,
  categoriesId
) => {
  const sql =
    "insert into products (products_name, products_price, products_desc, products_stock, categories_id) values ($1, $2, $3, $4, $5) returning products_id";
  const values = [
    productsName,
    prodcutsPrice,
    prodcutsDesc,
    prodcutsStock,
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
    "delete from products where products_id = $1 returning products_name, products_image";
  const values = [id];
  return db.query(sql, values);
};

const getBestSelling = (startDate, endDate) => {
  const sql = `select p.products_id, p.products_name, 
  sum(op.orders_products_qty) as sold ,
  sum(op.orders_products_subtotal) as profit
  from orders_products op
  join products p on op.products_id = p.products_id
  where op.created_at >= $1 and op.created_at <= $2
  group by p.products_id`;
  const values = [startDate, endDate];
  return db.query(sql, values);
};

const filtersProducts = (
  productsName,
  category,
  minRange = 10000,
  maxRange = 100000,
  page = 1,
  limit = 6
) => {
  let sql = `select p.products_id, p.products_name, p.products_price, p.products_desc, p.products_stock, p.products_image, c.categories_name
  from products p`;
  const values = [];

  if (productsName && category && minRange && maxRange) {
    sql += ` join categories c on p.categories_id = c.categories_id
              where LOWER(p.products_name) like $1
              and products_price >= $3 and products_price <= $4
              and LOWER(c.categories_name) = $2
              order by p.created_at asc
              limit $5 offset $6`;
    const offset = page * limit - limit;
    values.push(
      `%${productsName}%`,
      category,
      minRange,
      maxRange,
      limit,
      offset
    );
    return db.query(sql, values);
  }

  if (category) {
    sql += ` join categories c on p.categories_id = c.categories_id
                where LOWER(c.categories_name) = $1
                and products_price >= $2 and products_price <= $3
                order by p.created_at asc
                limit $4 offset $5`;
    const offset = page * limit - limit;
    values.push(category, minRange, maxRange, limit, offset);
    return db.query(sql, values);
  }

  if (productsName) {
    sql += ` join categories c on p.categories_id = c.categories_id
                where LOWER(p.products_name) like $1
                and products_price >= $2 and products_price <= $3
                order by p.created_at asc
                limit $4 offset $5`;
    const offset = page * limit - limit;
    values.push(`%${productsName}%`, minRange, maxRange, limit, offset);
    return db.query(sql, values);
  }

  if (!productsName && !category) {
    sql += ` join categories c on p.categories_id = c.categories_id
              where products_price >= $1 and products_price <= $2
              order by p.created_at asc
              limit $3 offset $4`;
    const offset = page * limit - limit;
    values.push(minRange, maxRange, limit, offset);
    return db.query(sql, values);
  }
};

const count = (productsName, category, minRange = 10000, maxRange = 100000) => {
  let sql = `select count(*) from products p`;
  const values = [];
  if (productsName && category && minRange && maxRange) {
    sql += ` join categories c on p.categories_id = c.categories_id where LOWER(p.products_name) like $1 and c.categories_name = $2 and p.products_price >= $3 and p.products_price <= $4`;
    values.push(`%${productsName}%`, category, minRange, maxRange);
    return db.query(sql, values);
  }

  if (productsName) {
    sql += ` where LOWER(p.products_name) like $1 and p.products_price >= $2 and p.products_price <= $3`;
    values.push(`%${productsName}%`, minRange, maxRange);
    return db.query(sql, values);
  }

  if (category) {
    sql += ` join categories c on p.categories_id = c.categories_id where c.categories_name = $1 and p.products_price >= $2 and p.products_price <= $3`;
    values.push(category, minRange, maxRange);
    return db.query(sql, values);
  }

  if (!productsName && !category) {
    sql += ` where p.products_price >= $1 and p.products_price <= $2`;
    values.push(minRange, maxRange);
    return db.query(sql, values);
  }
};

const updateImage = (id, image) => {
  const sql = "update products set products_image = $2 where products_id = $1";
  const values = [id, image];
  return db.query(sql, values);
};

const totalSales = (startDate, endDate) => {
  const sql = ` select 
                  date(op.created_at) as order_date, 
                  sum(op.orders_products_qty) as cup
                from 
                  orders_products op
                where 
                  op.created_at >= $1
                  and op.created_at <= $2
                group by 
                op.created_at
                order by op.created_at`;
  const values = [startDate, endDate];
  return db.query(sql, values);
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  del,
  getBestSelling,
  filtersProducts,
  count,
  updateImage,
  totalSales,
};
