var nodemailer = require("nodemailer");

exports.emailSend = (req,res,user,subject,output) => {

  async function sendMail() {

    const transporter = nodemailer.createTransport({
      host: "mail.anubhaanant.com",
      port: 465,
      secure: true,
      auth: {
        user: `support@anubhaanant.com`,
        pass: `01@AnubhaAnant`,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Physiotimes 👍" <support@anubhaanant.com>', // sender address
      to: user.PersonalDetails.emailId, // list of receivers
      subject:subject,
      html: output, // html body
    });
  }
  sendMail().catch(err => console.log(err))
};
