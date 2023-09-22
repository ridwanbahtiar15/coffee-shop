const {
  getAll,
  getById,
  insert,
  update,
  del,
} = require("../Models/deliveries.model");

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
    if (!body.deliveries_name || !body.deliveries_cost) {
      return res.status(404).json({
        msg: "Some values not found!",
      });
    }
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
    if (!body.deliveries_name || !body.deliveries_cost) {
      return res.status(404).json({
        msg: "Some values not found!",
      });
    }
    const dataById = await getById(params.id);
    let deliveriesName = dataById.rows[0].deliveries_name;
    let deliveriesCost = dataById.rows[0].deliveries_cost;

    if (body.deliveries_name) deliveriesName = body.deliveries_name;
    if (body.deliveries_cost) deliveriesCost = body.deliveries_cost;

    const data = await update(deliveriesName, deliveriesCost, params.id);
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
  getAllDeliveries,
  addNewDeliveries,
  updateDeliveries,
  deleteDeliveries,
};
