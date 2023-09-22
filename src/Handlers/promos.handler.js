const {
  getAll,
  getById,
  insert,
  update,
  del,
} = require("../Models/promos.model");

const getAllPromos = async (req, res) => {
  try {
    const result = await getAll();
    if (result.rows.length == 0) {
      return res.status(404).json({
        msg: "Promo not found!",
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

const addNewPromos = async (req, res) => {
  try {
    const { body } = req;
    if (!body.promos_name || !body.promos_start || !body.promos_end) {
      return res.status(404).json({
        msg: "Some values not found!",
      });
    }
    await insert(body.promos_name, body.promos_start, body.promos_end);
    res.status(200).json({
      msg: "Data has been added!",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const updatePromos = async (req, res) => {
  try {
    const { body, params } = req;
    if (!body.promos_name || !body.promos_start || !body.promos_end) {
      return res.status(404).json({
        msg: "Some values not found!",
      });
    }
    const dataById = await getById(params.id);

    let promosName = dataById.rows[0].promos_name;
    let promosStart = dataById.rows[0].promos_start;
    let promosEnd = dataById.rows[0].promos_end;

    if (body.promos_name) promosName = body.promos_name;
    if (body.promos_start) promosStart = body.promos_start;
    if (body.promos_end) promosEnd = body.promos_end;

    const data = await update(promosName, promosStart, promosEnd, params.id);

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

const deletePromos = async (req, res) => {
  try {
    const { params } = req;
    const data = await del(params.id);
    res.status(200).json({
      msg: `Promo ${data.rows[0].promos_name}, id = ${params.id} has been deleted!`,
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
  getAllPromos,
  addNewPromos,
  updatePromos,
  deletePromos,
};
