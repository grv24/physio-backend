const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
var smtpTransport = require("nodemailer-smtp-transport");

const emailVerification = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "mail.anubhaanant.com",
      port: 465,
      secure: true,
      auth: {
        user: `support@anubhaanant.com`,
        pass: `01@AnubhaAnant`,
      },
    });

    const token = jwt.sign(
      {
        data: "Token Data",
      },
      "ourSecretKey",
      { expiresIn: "10m" }
    );

    const mailConfigurations = {
      // It should be a string of sender/server email
      from: '"Fred Foo 👻" <foo@example.com>',
      to: "krishnase21@gmail.com",

      // Subject of Email
      subject: "Email Verification",

      // This would be the text of email body
      text: `Hi! There, You have recently visited
		our website and entered your email.
		Please follow the given link to verify your email
		http://localhost:5000/verify/${token}
		Thanks`,
    };

    let informations = await transporter.sendMail(
      mailConfigurations
      //             , function (error, info) {
      //         if (error) throw Error(error);
      //         console.log('Email Sent Successfully');
      //         console.log(info);
      //    }
    );
    console.log("Message sent: %s", informations.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(informations));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = emailVerification;
