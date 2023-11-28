const nodemailer = require("nodemailer");
const inquiryForm = require("../../utils/emailInquiryForm");
var smtpTransport = require('nodemailer-smtp-transport');

const inquiryForms = async (req, res) => {
  try {
    const { nameOfCompany, contactPerson ,mobile , email , iAmInterestedIn,country, city, state, yourComments } = req.body;

      if (!email || !mobile) {
          return res.status(400).json({message:"Please Enter Email and Mobile Number!"})
      }
    const fillUserDetail = inquiryForm(nameOfCompany, contactPerson ,mobile , email , iAmInterestedIn,country, city, state, yourComments );
  

    let transporter = nodemailer.createTransport(smtpTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',  
      port: 587,
      secure: false,
      auth: {
        user: `krishnakumar778187@gmail.com`,
        pass: `pgzzcyggrncvktvi`,
      },
    }));

    let info = await transporter.sendMail({
      from: '"Physiotimes" <foo@example.com>',
      to: "krishnase21@gmail.com",
      subject: "Contact to You",
      html: `${fillUserDetail}`,
      
    },
   
    );

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
   return res.status(200).json({message : "Email Sent Successfully"});

  } catch (error) {
  return  res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = inquiryForms;
