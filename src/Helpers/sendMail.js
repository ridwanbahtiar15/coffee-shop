const { createTransport } = require("nodemailer");
const mustache = require("mustache");
const fs = require("fs");
const path = require("path");

const oauthClient = require("../Configs/oauth");

const {
  authService: service,
  authType: type,
  authUser: user,
  clientId,
  clientSecret,
  refreshToken,
} = require("../Configs/environments");

const sendMail = ({ to, subject, data }) => {
  const accessToken = oauthClient.getAccessToken();
  const transporter = createTransport({
    service,
    auth: {
      type,
      user,
      clientId,
      clientSecret,
      refreshToken,
      accessToken,
    },
  });

  const dirFile = path.join(__dirname, "../Templates/html/test-mail.html");
  const template = fs.readFileSync(dirFile, "utf-8");

  const mailOptions = {
    from: '"COFFEE SHOP" <ridwanbahtiar15@gmail.com>',
    to,
    subject,
    html: mustache.render(template, { to, data }),
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendMail };
