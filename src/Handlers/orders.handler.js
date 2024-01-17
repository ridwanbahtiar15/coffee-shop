const {
  getFilterOrder,
  getByUserId,
  getById,
  insert,
  update,
  del,
  getDetailOrderById,
  getUserByOrderId,
  count,
} = require("../Models/orders.model");

const getAllOrders = async (req, res) => {
  try {
    const { query } = req;
    let result;
    let page = 1;
    query.page ? (page = query.page) : (page = 1);
    let limit = 5;

    result = await getFilterOrder(query.noorder, page, limit);

    if (result.rows.length == 0) {
      return res.status(404).json({
        msg: "Orders not found!",
        result: [],
      });
    }

    const metaResult = await count(query.noorder);
    const totalData = metaResult.rows[0].count;
    const isLastPage = Math.ceil(totalData / parseInt(limit) <= parseInt(page));
    const totalPage = Math.ceil(totalData / limit);

    let linkNext = `${req.baseUrl}?page=${parseInt(page) + 1}&limit=${parseInt(
      limit
    )}`;
    if (query.name) linkNext += `&noorder=${query.noorder}`;

    let linkPrev = `${req.baseUrl}?page=${parseInt(page) - 1}&limit=${parseInt(
      limit
    )}`;
    if (query.name) linkPrev += `&noorder=${query.noorder}`;

    return res.status(200).json({
      msg: "Success",
      result: result.rows,
      meta: {
        page: page,
        totalData,
        totalPage,
        limit,
        next: isLastPage ? null : linkNext,
        prev: page == "1" ? null : linkPrev,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const addNewOrders = async (req, res) => {
  try {
    const { body, userInfo } = req;

    // if (
    //   !body.users_id ||
    //   !body.payment_methods_id ||
    //   !body.deliveries_id ||
    //   !body.promos_id ||
    //   !body.products_id ||
    //   !body.sizes_id ||
    //   !body.orders_products_qty ||
    //   !body.hot_or_ice
    // ) {
    //   return res.status(404).json({
    //     msg: "Some values not found!",
    //   });
    // }
    await insert(
      userInfo.users_id,
      (body.payment_methods_id = 1),
      (body.deliveries_id = 1),
      (body.promos_id = 0),
      body
    );
    res.status(200).json({
      msg: "Product successfully ordered!",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
    console.log(error);
  }
};

const updateOrders = async (req, res) => {
  try {
    const { body, params } = req;
    // if (!body.orders_status) {
    //   return res.status(404).json({
    //     msg: "Some values not found!",
    //   });
    // }
    const dataById = await getById(params.id);
    let ordersStatus = dataById.rows[0].orders_status;
    if (body.orders_status) ordersStatus = body.orders_status;
    const data = await update(ordersStatus, params.id);

    if (data.rowCount == 0) {
      return res.status(500).json({
        msg: "Internal Server Error",
      });
    }

    res.status(200).json({
      msg: `Data has been updated!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
    console.log(error);
  }
};

const deleteOrders = async (req, res) => {
  try {
    const { params } = req;
    await del(params.id);
    res.status(200).json({
      msg: `Orders id = ${params.id} has been deleted!`,
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

const getOrdersByUserId = async (req, res) => {
  try {
    const { userInfo } = req;

    const result = await getByUserId(userInfo.users_id);
    if (result.rows.length == 0) {
      return res.status(404).json({
        msg: "Orders not found!",
        result: [],
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

const getDetailOrder = async (req, res) => {
  try {
    const { params } = req;
    const result = await getDetailOrderById(params.id);

    res.status(200).json({
      msg: "Success",
      result: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { params } = req;
    const result = await getUserByOrderId(params.id);

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

module.exports = {
  getAllOrders,
  addNewOrders,
  updateOrders,
  deleteOrders,
  getOrdersByUserId,
  getDetailOrder,
  getUser,
};
