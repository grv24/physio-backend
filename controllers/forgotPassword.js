const { emailSend } = require("../utils/emailSend");
const { forgotpasswordEmail, adminforgotpasswordEmail } = require("../utils/emailtemplates");
const { body, validationResult, oneOf } = require("express-validator");
const jwt = require("jsonwebtoken");
const { BaseUser } = require("../models/baseUser");

//author
exports.forgotPassword = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()[0].msg,
    });
  }

  const { emailId } = req.body;

  BaseUser.findOne({ 'PersonalDetails.emailId':emailId }, async(err, user) => {
    if (err || !user) {
      return res.status(422).json({
        error: "User Email doesnot exist",
      });
    }

    const token1 = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });


    const subject = 'Forgot Password'

    const output = forgotpasswordEmail(token1, user);

    let sendForgotPasswordEmail = emailSend(req, res, user, subject, output);

    await res.json({
        msg: "A Forgot Password link has been sent to the mentioned email-Id If it's present in our system",
      });
  });
};

//admin
exports.adminforgotPassword = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()[0].msg,
    });
  }

  const { emailId } = req.body;

  BaseUser.findOne({ 'PersonalDetails.emailId':emailId }, async(err, user) => {
    if (err || !user) {
      return res.status(422).json({
        error: "User Email doesnot exist",
      });
    }

    const token1 = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });


    const subject = 'Forgot Password'

    const output = adminforgotpasswordEmail(token1, user);

    let sendForgotPasswordEmail = emailSend(req, res, user, subject, output);

    await res.json({
        msg: "A Forgot Password link has been sent to the mentioned email-Id If it's present in our system",
      });
  });
};
