const { getAll, insert, update, del } = require("../Models/deliveries.model");

const getAllDeliveries = async (req, res) => {
  try {
    const result = await getAll();
    if (result.rows.length == 0) {
      return res.status(404).json({
        msg: "Deliveries not found!",
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

const addNewDeliveries = async (req, res) => {
  try {
    const { body } = req;
    await insert(body.deliveries_name, body.deliveries_cost);
    res.status(200).json({
      msg: "Data has been added!",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const updateDeliveries = async (req, res) => {
  try {
    const { body, params } = req;
    const data = await update(
      body.deliveries_name,
      body.deliveries_cost,
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

const deleteDeliveries = async (req, res) => {
  try {
    const { params } = req;
    const data = await del(params.id);
    res.status(200).json({
      msg: `Deliveries ${data.rows[0].deliveries_name}, id = ${params.id} has been deleted!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllDeliveries,
  addNewDeliveries,
  updateDeliveries,
  deleteDeliveries,
};
