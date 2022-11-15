import nodemailer from 'nodemailer';

export default function (req, res) {
  //let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: 'demo@demo.gmail',
      pass: 'password',
    },
    secure: true,
  });
  console.log(req.body)
}