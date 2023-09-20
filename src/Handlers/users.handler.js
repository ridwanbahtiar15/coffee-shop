const {
  getAll,
  getById,
  insert,
  update,
  softDelete,
} = require("../Models/users.model");

const getAllUsers = async (req, res) => {
  try {
    const { query } = req;
    let result;
    query.page || query.limit
      ? (result = await getAll(query.page, query.limit))
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
    const dataById = await getById(params.id);

    let usersFullName = body.users_fullname;
    let usersEmail = body.users_email;
    let usersPassword = body.users_password;
    let usersPhone = body.users_phone;
    let usersAddress = body.users_address;
    let usersImage = body.users_image;
    let rolesId = body.roles_id;

    if (!usersFullName) usersFullName = dataById.rows[0].users_fullname;
    if (!usersEmail) usersEmail = dataById.rows[0].users_email;
    if (!usersPassword) usersPassword = dataById.rows[0].users_password;
    if (!usersPhone) usersPhone = dataById.rows[0].users_phone;
    if (!usersAddress) usersAddress = dataById.rows[0].users_address;
    if (!usersImage) usersImage = dataById.rows[0].users_image;
    if (!rolesId) rolesId = dataById.rows[0].roles_id;

    const data = await update(
      usersFullName,
      usersEmail,
      usersPassword,
      usersPhone,
      usersAddress,
      usersImage,
      rolesId,
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
    console.log(error);
  }
};

const deleteUsers = async (req, res) => {
  try {
    const { params } = req;
    const data = await softDelete(params.id);
    res.status(200).json({
      msg: `User ${data.rows[0].users_fullname}, id = ${params.id} has been soft deleted!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  addNewUsers,
  updateUsers,
  deleteUsers,
};
