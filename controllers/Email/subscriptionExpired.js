const nodemailer = require("nodemailer");
const subscriptionMails = require("../../utils/subscriptionMail");


const sendSubscriptionMails = async (fname, email) => {
  
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
    from: '"Physiotimes 👍" <support@anubhaanant.com>',
    to: `${email}`,
    subject: "Your Subscription Expire Today ", //options.subject
    html: subscriptionMails(fname),
  };
  // 3) Actually send the email
  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};
module.exports = sendSubscriptionMails;
