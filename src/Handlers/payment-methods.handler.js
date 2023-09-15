const {
  getAll,
  insert,
  update,
  del,
} = require("../Models/payment-methods.model");

const getAllPaymentMethods = async (req, res) => {
  try {
    result = await getAll();
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

const addNewPaymentMethods = async (req, res) => {
  try {
    const { body } = req;
    const data = await insert(body.payment_methods_name);
    res.status(200).json({
      msg: "Data has been added!",
      result: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "error",
      error,
    });
  }
};

const updatePaymentMethods = async (req, res) => {
  try {
    const { body, params } = req;
    const data = await update(body.payment_methods_name, params.id);
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

const deletePaymentMethods = async (req, res) => {
  try {
    const { params } = req;
    const data = await del(params.id);
    res.status(200).json({
      msg: `Payment method ${data.rows[0].payment_methods_name}, id = ${params.id} has been deleted!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error,
    });
  }
};

module.exports = {
  getAllPaymentMethods,
  addNewPaymentMethods,
  updatePaymentMethods,
  deletePaymentMethods,
};
