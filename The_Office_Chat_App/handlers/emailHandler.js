const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    //* 1) Kreiranje na transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_ADRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    transporter.verify((err, succ) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent successfully");
      }
    });

    //* 2) Da gi definirame opcciite na emajlot,
    const mailOptions = {
      from: "Semos Academy <semos@academy.mk>",
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    //* 3) Da go ispratime emajlot
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendEmail;

