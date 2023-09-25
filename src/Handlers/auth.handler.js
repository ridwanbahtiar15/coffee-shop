const argon = require("argon2");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { jwtKey, issuer } = require("../Configs/environments");
const { singleUpload } = require("../Middlewares/diskUpload");
const { sendMail } = require("../Helpers/sendMail.js");

const db = require("../Configs/postgre.js");

const {
  createUser,
  getUserByEmail,
  insertToken,
  checkUserEmail,
  checkUserToken,
  updateUserActive,
  delUserToken,
  checkUserActive,
} = require("../Models/auth.model");

const register = async (req, res) => {
  singleUpload("users_image")(req, res, async (err) => {
    try {
      const {
        body: {
          users_fullname,
          users_email,
          users_password,
          users_phone,
          users_address,
          roles_id,
        },
      } = req;

      if (
        !users_fullname ||
        !users_email ||
        !users_password ||
        !users_phone ||
        !users_address ||
        !roles_id
      ) {
        return res.status(404).json({
          msg: "Some values not found!",
        });
      }

      if (err) {
        return res.status(401).json({
          msg: err.message,
        });
      }

      if (req.fileValidationError) {
        return res.status(401).json({
          msg: req.fileValidationError,
        });
      }

      let usersImage = "profile.jpg";
      if (req.file) {
        usersImage = req.file.filename;
      }

      const hash = await argon.hash(users_password);
      // create user
      const user = await createUser(
        users_fullname,
        users_email,
        hash,
        users_phone,
        users_address,
        usersImage,
        roles_id
      );

      const tokenActivation = Math.random().toString(36).substr(2);
      await insertToken(user.rows[0].users_id, tokenActivation);

      const info = await sendMail({
        to: users_email,
        subject: "Email Activation",
        data: {
          email: users_email,
          tokenActivation: tokenActivation,
        },
      });

      res.status(201).json({
        msg: "User success registered, Please check your email to activate!",
        response: info.response,
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
  });
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

    const { users_id, users_fullname, users_email, users_password, roles_id } =
      result.rows[0];

    // check password
    const checkPass = await argon.verify(users_password, body.users_password);
    if (!checkPass)
      return res.status(401).json({
        msg: "Email or Password wrong!",
      });

    // check user active
    const checkActive = await checkUserActive(users_email);
    if (!checkActive.rows.length)
      return res.status(401).json({
        msg: "User not Active, Please Activation!",
      });

    // create token jwt
    const payload = {
      users_id,
      users_fullname,
      users_email,
      roles_id,
    };
    jwt.sign(payload, jwtKey, { expiresIn: "20m", issuer }, (err, token) => {
      if (err) throw err;
      res.status(200).json({
        msg: `Welcome ${users_fullname}`,
        data: {
          token,
          userInfo: {
            users_id,
            users_fullname,
            users_email,
            roles_id,
          },
        },
      });
      const sql =
        "insert into users_tokenjwt (users_id, token_jwt) values ($1, $2)";
      const values = [users_id, token];
      db.query(sql, values);
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const activation = async (req, res) => {
  try {
    const { query } = req;

    // cek email ada tidak
    const checkUser = await checkUserEmail(query.email);
    if (!checkUser.rows[0])
      return res.status(400).json({
        msg: "Users not registered!",
      });

    // cek token ada tidak
    const checkToken = await checkUserToken(query.token);
    if (!checkToken.rows[0])
      return res.status(400).json({
        msg: "Token Invalid!",
      });

    // update isActive = 1
    // delete field token
    await updateUserActive(query.email);
    await delUserToken(query.token);

    res.status(201).json({
      msg: "User success activated, Please login!",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const logout = async (req, res) => {
  const authHeader = req.header("Authorization");
  const token = authHeader.split(" ")[1];

  // cek token dari db
  const sql = "delete from users_tokenjwt where token_jwt = $1";
  const values = [token];
  const tokenJwt = await db.query(sql, values);

  if (tokenJwt.rowCount == 1) {
    return res.status(200).json({
      msg: "Success Logout!",
    });
  }
};

module.exports = { register, login, activation, logout };
