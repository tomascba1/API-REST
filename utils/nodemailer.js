const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.emailuser,
      pass: process.env.emailpass
    }
  });

  module.exports = transporter