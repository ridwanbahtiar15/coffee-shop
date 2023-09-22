const argon = require("argon2");
const fs = require("fs");

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
    if (
      !body.users_fullname ||
      !body.users_email ||
      !body.users_password ||
      !body.users_phone ||
      !body.users_address ||
      !body.roles_id
    ) {
      return res.status(404).json({
        msg: "Some values not found!",
      });
    }

    let usersImage = "profile.jpg";
    if (req.file) {
      usersImage = req.file.filename;
    }

    const hash = await argon.hash(body.users_password);
    await insert(
      body.users_fullname,
      body.users_email,
      hash,
      body.users_phone,
      body.users_address,
      usersImage,
      body.roles_id
    );

    res.status(200).json({
      msg: "Data has been added!",
    });
  } catch (error) {
    if (error.code == "23505") {
      // delete image saat error constraint
      const dir = "./public/img/" + req.file.filename;
      fs.unlink(dir, (err) => {
        if (err) throw err;
      });
      return res.status(400).json({
        msg: "Duplicate Email or Phone!",
      });
    }
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
    let usersImage = dataById.rows[0].users_image;
    let rolesId = body.roles_id;

    if (!usersFullName) usersFullName = dataById.rows[0].users_fullname;
    if (!usersEmail) usersEmail = dataById.rows[0].users_email;
    if (!usersPassword) usersPassword = dataById.rows[0].users_password;
    if (!usersPhone) usersPhone = dataById.rows[0].users_phone;
    if (!usersAddress) usersAddress = dataById.rows[0].users_address;
    if (!rolesId) rolesId = dataById.rows[0].roles_id;

    // jika gambar diubah
    if (req.file) {
      // delete image lama
      const dir = "./public/img/" + dataById.rows[0].users_image;
      fs.unlink(dir, (err) => {
        if (err) throw err;
      });
      usersImage = req.file.filename;
    }

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
  }
};

module.exports = {
  getAllUsers,
  addNewUsers,
  updateUsers,
  deleteUsers,
};
