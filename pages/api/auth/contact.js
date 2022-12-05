import nodemailer from 'nodemailer';
import { config } from "../../../config";

export default async function (req, res) {
  const transporter = nodemailer.createTransport({
    port: 25,
    secure: false,
    host: config.mailHost,
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  const tUrl = `http://10.21.57.43:3000/verify/${req.body.message}`;

  // let result = await fetch('http://url.api.stdlib.com/temporary@0.3.0/create', {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json, text/plain, */*',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(tempUrl),
  // })

  // console.log(result);

  const mailOption = {
    from: 'nextSyndicate@hbisserbia.rs',
    to: `${req.body.email}`,
    subject: 'Verify NextSyndicate Account',
    html: `<a href=${tUrl}>Verify</a>`,
  };

  transporter.sendMail(mailOption, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
    console.log("email data", data);
    res.status(200).json({ message: "Email sent" });
    return data;
  });

}