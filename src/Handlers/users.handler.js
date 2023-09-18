const {
  getAll,
  insert,
  update,
  del,
  pagination,
} = require("../Models/users.model");

const getAllUsers = async (req, res) => {
  try {
    const { query } = req;
    let result;
    query.page && query.limit
      ? (result = await pagination(query.page, query.limit))
      : (result = await getAll());

    if (result.rows.length == 0) {
      return res.status(404).json({
        msg: "Users not found!",
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

const addNewUsers = async (req, res) => {
  try {
    const { body } = req;
    await insert(
      body.users_fullname,
      body.users_email,
      body.users_password,
      body.users_phone,
      body.users_address,
      body.users_image,
      body.roles_id
    );
    res.status(200).json({
      msg: "Data has been added!",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const updateUsers = async (req, res) => {
  try {
    const { body, params } = req;
    const data = await update(
      body.users_fullname,
      body.users_email,
      body.users_password,
      body.users_phone,
      body.users_address,
      body.users_image,
      body.roles_id,
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

const deleteUsers = async (req, res) => {
  try {
    const { params } = req;
    const data = await del(params.id);
    res.status(200).json({
      msg: `User ${data.rows[0].users_fullname}, id = ${params.id} has been deleted!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllUsers,
  addNewUsers,
  updateUsers,
  deleteUsers,
};
