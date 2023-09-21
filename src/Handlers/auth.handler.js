const argon = require("argon2");
const jwt = require("jsonwebtoken");
const { jwtKey, issuer } = require("../Configs/environments");
const { createUser, getUserByEmail } = require("../Models/auth.model");

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
  }
};

const login = async (req, res) => {
  const { body } = req;
  try {
    const result = await getUserByEmail(body.users_email);
    // check data
    if (!result.rows.length)
      return res.status(404).json({
        msg: "Email not registered!",
      });

    const { users_fullname, users_email, users_password, roles_id } =
      result.rows[0];

    // check password
    const checkPass = await argon.verify(users_password, body.users_password);
    if (!checkPass)
      return res.status(401).json({
        msg: "Email or Password wrong!",
      });

    // create token jwt
    const payload = {
      users_fullname,
      users_email,
      roles_id,
    };
    jwt.sign(payload, jwtKey, { expiresIn: "5m", issuer }, (err, token) => {
      if (err) throw err;
      res.status(200).json({
        msg: `Welcome ${users_fullname}`,
        data: {
          token,
          userInfo: {
            users_fullname,
            users_email,
            roles_id,
          },
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = { register, login };
