const {
  getAll,
  insert,
  update,
  del,
} = require("../Models/payment-methods.model");

const getAllPaymentMethods = async (req, res) => {
  try {
    const result = await getAll();
    if (result.rows.length == 0) {
      return res.status(404).json({
        msg: "Payment Methods not found!",
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
  }
};

const addNewPaymentMethods = async (req, res) => {
  try {
    const { body } = req;
    await insert(body.payment_methods_name);
    res.status(200).json({
      msg: "Data has been added!",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
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
      msg: "Data has been updated!",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
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
    });
  }
};

module.exports = {
  getAllPaymentMethods,
  addNewPaymentMethods,
  updatePaymentMethods,
  deletePaymentMethods,
};
