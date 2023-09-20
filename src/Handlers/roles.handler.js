const {
  getAll,
  getById,
  insert,
  update,
  del,
} = require("../Models/roles.model");

const getAllRoles = async (req, res) => {
  try {
    const result = await getAll();
    if (result.rows.length == 0) {
      return res.status(404).json({
        msg: "Roles not found!",
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

const addNewRoles = async (req, res) => {
  try {
    const { body } = req;
    await insert(body.roles_name);
    res.status(200).json({
      msg: "Data has been added!",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const updateRoles = async (req, res) => {
  try {
    const { body, params } = req;
    const dataById = await getById(params.id);
    let rolesName = body.roles_name;
    if (!rolesName) rolesName = dataById.rows[0].roles_name;

    const data = await update(rolesName, params.id);
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

const deleteRoles = async (req, res) => {
  try {
    const { params } = req;
    const data = await del(params.id);
    res.status(200).json({
      msg: `Role ${data.rows[0].roles_name}, id = ${params.id} has been deleted!`,
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
  getAllRoles,
  addNewRoles,
  updateRoles,
  deleteRoles,
};
