const nodemailer = require("nodemailer");
const emailVarificationTemp = require("../../utils/emailVerificationTemplates");


const sendVerificationEmail = async (token, email) => {
  const verificationLink = `https://anubhaanant.com/verify-email?code=${token}`;

  const transporter = nodemailer.createTransport({
    host: "mail.anubhaanant.com",
    port: 465,
    secure: true,
    auth: {
      user: `support@anubhaanant.com`,
      pass: `01@AnubhaAnant`,
    },
  });

  const message = {
    from: '"Physiotimes 👍"<support@anubhaanant.com>',
    to: `${email}`,
    subject: "Verify your email address", //options.subject
    html: emailVarificationTemp(verificationLink),
  };
  // 3) Actually send the email
  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};
module.exports = sendVerificationEmail;
