const argon = require("argon2");

const { createUser } = require("../Models/auth.model");

const register = async (req, res) => {
  const {
    body: {
      users_fullname,
      users_email,
      users_password,
      users_phone,
      users_address,
      users_image,
      roles_id,
    },
  } = req;

  try {
    const hash = await argon.hash(users_password);
    // create user
    await createUser(
      users_fullname,
      users_email,
      hash,
      users_phone,
      users_address,
      users_image,
      roles_id
    );

    res.status(201).json({
      msg: "User success registered!",
    });
  } catch (error) {
    if (error.code == "23505")
      return res.status(500).json({
        msg: "Duplicate Email or Phone!",
      });
    res.status(500).json({
      msg: "Internal Server Error",
    });
    console.log(error);
  }
};

module.exports = { register };
