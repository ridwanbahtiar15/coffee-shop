const jwt = require("jsonwebtoken");
const { jwtKey, issuer } = require("../Configs/environments");

const isLogin = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({
      msg: "Please Login!",
    });
  }
  // jika ada header authorization yg dikirimkan
  const token = authHeader.split(" ")[1];
  jwt.verify(token, jwtKey, { issuer }, (err, data) => {
    if (err) {
      switch (err.name) {
        case "TokenExpiredError":
          return res.status(401).json({
            msg: "Access ended, Please login again",
          });
        case "NotBeforeError":
          return res.status(401).json({
            msg: "Your access not started yet, Please access on time",
          });
      }
      return res.status(403).json({
        msg: "Invalid Token!",
      });
    }
    req.userInfo = data;
    next();
  });
};

module.exports = { isLogin };
