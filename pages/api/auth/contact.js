import nodemailer from 'nodemailer';

export default function (req, res) {
  const transporter = nodemailer.createTransport({
    port: 25,
    secure: false,
    host: process.env.MAIL_HOST,
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  const tUrl = `http://localhost:3000/verify?token=${req.body.message}`;


  console.log(tUrl);

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
      res.status(401).json({ message: err });
      return res;
    } else {
      console.log("mail sent");
      res.status(200).json({ message: "Mail sent" });
      return res;
    }
  });

}