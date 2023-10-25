const fs = require("fs");
const { uploader } = require("../Helpers/cloudinary");

const {
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
} = require("../Models/products.model");

const getAllProducts = async (req, res) => {
  try {
    const { query } = req;
    let result;
    if (
      query.name ||
      query.category ||
      query.minrange ||
      query.maxrange ||
      query.page ||
      query.limit
    ) {
      if (query.minrange >= query.maxrange) {
        return res.status(400).json({
          msg: "The range your input is not correct!",
        });
      }

      result = await filtersProducts(
        query.name,
        query.category,
        query.minrange,
        query.maxrange,
        query.page,
        query.limit
      );

      if (result.rows.length == 0) {
        return res.status(200).json({
          msg: "Products not found!",
          result: [],
        });
      }

      const metaResult = await count(
        query.name,
        query.category,
        query.minrange,
        query.maxrange
      );

      const totalData = metaResult.rows[0].count;
      const isLastPage = Math.ceil(
        totalData / parseInt(query.limit) <= parseInt(query.page)
      );

      let linkNext = `${req.baseUrl}?page=${
        parseInt(query.page) + 1
      }&limit=${parseInt(query.limit)}`;

      if (query.name) linkNext += `&name=${query.name}`;
      if (query.category) linkNext += `&category=${query.category}`;
      if (query.minrange && query.maxrange)
        linkNext += `&minrange=${query.minrange}&maxrange=${query.maxrange}`;

      let linkPrev = `${req.baseUrl}?page=${
        parseInt(query.page) - 1
      }&limit=${parseInt(query.limit)}`;

      if (query.name) linkPrev += `&name=${query.name}`;
      if (query.category) linkPrev += `&category=${query.category}`;
      if (query.minrange && query.maxrange)
        linkPrev += `&minrange=${query.minrange}&maxrange=${query.maxrange}`;

      return res.status(200).json({
        msg: "Success",
        result: result.rows,
        meta: {
          page: query.page,
          totalData,
          next: isLastPage ? null : linkNext,
          prev: query.page == "1" ? null : linkPrev,
        },
      });
    }

    result = await getAll();

    if (result.rows.length == 0) {
      return res.status(404).json({
        msg: "Products not found!",
      });
    }

    res.status(200).json({
      msg: "Success",
      result: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
    console.log(error);
  }
};

const addNewProducts = async (req, res) => {
  try {
    const { body } = req;
    if (
      !body.products_name ||
      !body.products_price ||
      !body.products_desc ||
      !body.products_stock ||
      !body.categories_id
    ) {
      return res.status(404).json({
        msg: "Some values not found!",
      });
    }

    // if (!file) {
    //   return res.status(404).json({
    //     msg: "Image must be uploaded!",
    //   });
    // }

    // const products_image = "public/img/" + req.file.filename;

    // if (!req.urlImage)
    //   return res.status(404).json({
    //     msg: "Image must be uploaded!",
    //   });

    const datas = await insert(
      body.products_name,
      body.products_price,
      body.products_desc,
      body.products_stock,
      body.categories_id
    );

    const id = datas.rows[0].products_id;
    const { data, err } = await uploader(req, "product", id);
    if (data) req.urlImage = data.secure_url;
    if (err) throw err;

    updateImage(id, req.urlImage);

    res.status(200).json({
      msg: "Data has been added!",
      data: { url: req.urlImage },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const updateProducts = async (req, res) => {
  try {
    const { body, params, file } = req;
    // if (
    //   !body.products_name ||
    //   !body.products_price ||
    //   !body.products_desc ||
    //   !body.products_stock ||
    //   !body.categories_id
    // ) {
    //   return res.status(404).json({
    //     msg: "Some values not found!",
    //   });
    // }

    const dataById = await getById(params.id);

    let productsName = dataById.rows[0].products_name;
    let productsPrice = dataById.rows[0].products_price;
    let productsDesc = dataById.rows[0].products_desc;
    let productsStock = dataById.rows[0].products_stock;
    let productsImage = dataById.rows[0].products_image;
    let categoriesID = dataById.rows[0].categories_id;

    if (body.products_name) productsName = body.products_name;
    if (body.products_price) productsPrice = body.products_price;
    if (body.products_desc) productsDesc = body.products_desc;
    if (body.products_stock) productsStock = body.products_stock;
    if (body.categories_id) categoriesID = body.categories_id;

    // jika gambar diubah
    if (file) {
      // delete image lama
      const dir = "./" + dataById.rows[0].products_image;
      fs.unlink(dir, (err) => {
        if (err) throw err;
      });
      productsImage = "public/img/" + req.file.filename;
    }

    const data = await update(
      productsName,
      productsPrice,
      productsDesc,
      productsStock,
      productsImage,
      categoriesID,
      params.id
    );

    if (data.rowCount == 0) {
      return res.status(500).json({
        msg: "Internal Server Error",
      });
    }

    res.status(200).json({
      msg: "Data has been updated!",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const { params } = req;
    const data = await del(params.id);

    // delete image
    const dir = "./" + data.rows[0].products_image;
    fs.unlink(dir, (err) => {
      if (err) throw err;
    });

    res.status(200).json({
      msg: `Products ${data.rows[0].products_name}, id = ${params.id} has been deleted!`,
    });
  } catch (error) {
    if (error.code == "23503") {
      return res.status(500).json({
        msg: "Error Constraint",
      });
    }
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const bestSellingProduct = async (req, res) => {
  try {
    const { body } = req;
    const data = await getBestSelling(body.start_date, body.end_date);
    res.status(200).json({
      msg: "Success",
      result: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Interval Server Error",
    });
  }
};

const getTotalSales = async (req, res) => {
  try {
    const { body } = req;
    const data = await totalSales(body.start_date, body.end_date);
    res.status(200).json({
      msg: "Success",
      result: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Interval Server Error",
    });
    console.log(error);
  }
};

const getProductsById = async (req, res) => {
  try {
    const { params } = req;
    const data = await getById(params.id);
    res.status(200).json({
      msg: "Success",
      result: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Interval Server Error",
    });
  }
};

module.exports = {
  getAllProducts,
  addNewProducts,
  updateProducts,
  deleteProducts,
  bestSellingProduct,
  getProductsById,
  getTotalSales,
};
