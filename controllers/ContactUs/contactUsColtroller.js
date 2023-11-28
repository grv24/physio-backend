const nodemailer = require("nodemailer");
const contactUs = require("../../utils/emailContactUs");
var smtpTransport = require('nodemailer-smtp-transport');

const sendMails = async (req, res) => {
  try {
    const { iwantto, name, place, email, mobile, message } = req.body;
    const fillUserDetail = contactUs(iwantto, name, place, email, mobile, message );
  

    const transporter = nodemailer.createTransport({
      host: "mail.anubhaanant.com",
      port: 465,
      secure: true,
      auth: {
        user: `support@anubhaanant.com`,
        pass: `01@AnubhaAnant`,
      },
    });

    let info = await transporter.sendMail({
      from: '"Physiotimes" <support@anubhaanant.com>',
      to: "support@anubhaanant.com",
      subject: "Contact to You",
      html: `${fillUserDetail}`,
      
    },
   
    );

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.status(200).json({message : "Email Sent Successfully"});

  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = sendMails;
