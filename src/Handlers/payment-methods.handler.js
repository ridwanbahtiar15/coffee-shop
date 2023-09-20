const {
  getAll,
  getById,
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
    if (!body.payment_methods_name) {
      return res.status(404).json({
        msg: "Some values not found!",
      });
    }
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
    const dataById = await getById(params.id);
    let paymentMethodsName = body.payment_methods_name;
    if (!paymentMethodsName)
      paymentMethodsName = dataById.rows[0].payment_methods_name;

    const data = await update(paymentMethodsName, params.id);

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

module.exports = {
  getAllPaymentMethods,
  addNewPaymentMethods,
  updatePaymentMethods,
  deletePaymentMethods,
};
