const argon = require("argon2");
const fs = require("fs");
const { sendMail } = require("../Helpers/sendMail.js");

const {
  getAll,
  getById,
  getUserProfile,
  insert,
  update,
  softDelete,
} = require("../Models/users.model");

const { insertToken } = require("../Models/auth.model");

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

const getUsersById = async (req, res) => {
  try {
    const result = await getUserProfile(req.userInfo.users_id);
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
    const { body, file } = req;
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

    let usersImage = "public/img/profile.jpg";
    if (file) {
      usersImage = "public/img/profile.jpg" + file.filename;
    }

    const hash = await argon.hash(body.users_password);
    const user = await insert(
      body.users_fullname,
      body.users_email,
      hash,
      body.users_phone,
      body.users_address,
      usersImage,
      body.roles_id
    );

    const tokenActivation = Math.random().toString(36).substr(2);
    await insertToken(user.rows[0].users_id, tokenActivation);

    const info = await sendMail({
      to: body.users_email,
      subject: "Email Activation",
      data: {
        email: body.users_email,
        tokenActivation: tokenActivation,
      },
    });

    res.status(200).json({
      msg: "Data has been added!",
      response: info.response,
    });
  } catch (error) {
    if (error.code == "23505") {
      if (req.file) {
        // delete image saat error constraint
        const dir = "./public/img/" + req.file.filenames;
        fs.unlink(dir, (err) => {
          if (err) throw err;
        });
      }
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
    const { body, params, file } = req;
    // if (
    //   !body.users_fullname ||
    //   !body.users_email ||
    //   !body.users_password ||
    //   !body.users_phone ||
    //   !body.users_address ||
    //   !body.roles_id
    // ) {
    //   return res.status(404).json({
    //     msg: "Some values not found!",
    //   });
    // }

    const dataById = await getById(params.id);

    let usersFullName = dataById.rows[0].users_fullname;
    let usersEmail = dataById.rows[0].users_email;
    let usersPassword = dataById.rows[0].users_password;
    let usersPhone = dataById.rows[0].users_phone;
    let usersAddress = dataById.rows[0].users_address;
    let usersImage = dataById.rows[0].users_image;
    let rolesId = dataById.rows[0].roles_id;

    if (body.users_fullname) usersFullName = body.users_fullname;
    if (body.users_email) usersEmail = body.users_email;
    if (body.users_password)
      usersPassword = await argon.hash(body.users_password);
    if (body.users_phone) usersPhone = body.users_phone;
    if (body.users_address) usersAddress = body.users_address;
    if (body.roles_id) rolesId = body.roles_id;
    if (file) usersImage = "public/img/" + file.filename;

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

    // jika gambar diubah
    if (file) {
      if (dataById.rows[0].users_image != "public/img/profile.jpg") {
        // delete image lama
        const dir = "./" + dataById.rows[0].users_image;
        fs.unlink(dir, (err) => {
          if (err) throw err;
        });
      }
    }

    if (data.rowCount == 0) {
      return res.status(500).json({
        msg: "Internal Server Error",
      });
    }
    res.status(200).json({
      msg: "Data has been updated!",
    });
  } catch (error) {
    if (error.code == "23505") {
      if (req.file) {
        // delete image saat error constraint
        const dir = "./public/img/" + req.file.filename;
        fs.unlink(dir, (err) => {
          if (err) throw err;
        });
      }

      return res.status(400).json({
        msg: "Duplicate Email or Phone!",
      });
    }
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { body, userInfo } = req;
    // if (
    //   !body.users_fullname ||
    //   !body.users_email ||
    //   !body.users_password ||
    //   !body.users_phone ||
    //   !body.users_address ||
    //   !body.roles_id
    // ) {
    //   return res.status(404).json({
    //     msg: "Some values not found!",
    //   });
    // }

    const dataById = await getById(userInfo.users_id);

    let usersFullName = dataById.rows[0].users_fullname;
    let usersEmail = dataById.rows[0].users_email;
    let usersPassword = dataById.rows[0].users_password;
    let usersPhone = dataById.rows[0].users_phone;
    let usersAddress = dataById.rows[0].users_address;
    let usersImage = dataById.rows[0].users_image;
    let rolesId = dataById.rows[0].roles_id;

    if (body.users_fullname) usersFullName = body.users_fullname;
    if (body.users_email) usersEmail = body.users_email;
    if (body.users_password)
      usersPassword = await argon.hash(body.users_password);
    if (body.users_phone) usersPhone = body.users_phone;
    if (body.users_address) usersAddress = body.users_address;
    if (body.roles_id) rolesId = body.roles_id;
    // if (file) usersImage = "public/img/" + file.filename;

    if (req.urlImage) {
      usersImage = req.urlImage;
    }

    const datas = await update(
      usersFullName,
      usersEmail,
      usersPassword,
      usersPhone,
      usersAddress,
      usersImage,
      rolesId,
      userInfo.users_id
    );

    // jika gambar diubah
    // if (file) {
    //   if (dataById.rows[0].users_image != "public/img/profile.jpg") {
    //     // delete image lama
    //     const dir = "./" + dataById.rows[0].users_image;
    //     fs.unlink(dir, (err) => {
    //       if (err) throw err;
    //     });
    //   }
    // }

    if (datas.rowCount == 0) {
      return res.status(502).json({
        msg: "Internal Server Error",
      });
    }
    res.status(200).json({
      msg: "Data has been updated!",
      data: { url: req.urlImage },
    });
  } catch (error) {
    if (error.code == "23505") {
      if (req.file) {
        // delete image saat error constraint
        const dir = "./public/img/" + req.file.filename;
        fs.unlink(dir, (err) => {
          if (err) throw err;
        });
      }

      return res.status(400).json({
        msg: "Duplicate Email or Phone!",
      });
    }
    res.status(501).json({
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
  getUsersById,
  addNewUsers,
  updateUsers,
  updateUserProfile,
  deleteUsers,
};
