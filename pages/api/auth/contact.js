import nodemailer from 'nodemailer';
// import lib from 'lib';
// import HttpsProxyAgent from 'http-proxy-agent';

// const proxyAgent = new HttpsProxyAgent('http://mit4998:Smederevo123@10.21.2.24:3128/');

export default function (req, res) {
  const transporter = nodemailer.createTransport({
    port: 25,
    secure: false,
    host: "mail-hub.zelsd.rs",
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  // Using Node.js 14.x +
  // use "lib" package from npm
  // make API request
  // let result = lib.url.temporary['@0.3.0'];
  // console.log(result);
  //.create({
  //   url: `"http://localhost:3000/api/auth/verify/"${req.body.message}`, // required
  //   ttl: 150
  // });

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