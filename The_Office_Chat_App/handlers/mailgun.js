const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.PRIVATE_API_KEY,
});

const sendMailGun = async (options) => {
  //* 1) Definirrame email opcii

  const emailData = {
    from: "Mailgun Sandbox <postmaster@sandboxcccf3b4422d949f6bde09b31f4d6afee.mailgun.org>",
    to: options.email,
    subject: options.subject,
    text: options.messages,
  };

  //* 2) Isprakjame email koristejki Mailgun

  await mg.messages.create(
    "sandboxcccf3b4422d949f6bde09b31f4d6afee.mailgun.org",
    emailData
  );
};

module.exports = sendMailGun;