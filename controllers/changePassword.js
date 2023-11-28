const { BaseUser } = require("../models/baseUser");
const { body, validationResult } = require("express-validator");
const expError = require("../utils/expressError");
var crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

// Change Own Password
exports.changePassword = (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      success:false,
      errors: errors.array()[0].msg,
    });
  }

    const { oldPassword, newPassword } = req.body;

    if (oldPassword && newPassword) {

      BaseUser.findOne({ _id: req.user._id }, (err, user) => {
        if (err || !user) {
          return res.json({
            success:false,
            error: "No User Found! Create a Account.",
          });
        }

        if (!user.authenticate(oldPassword)) {
          return res.json({success:false, error: "old password didnot match" });
        }

        if (newPassword === oldPassword) {
          return res.json({
            success: false,
            error:
              "Your New Password Should be different from old Password !!",
          });
        }

        if (newPassword) {
          req.body.salt = uuidv1();
          req.body.encry_password = crypto
            .createHmac("sha256", req.body.salt)
            .update(newPassword)
            .digest("hex");

          BaseUser.findByIdAndUpdate(
            { _id: req.user._id },
            {
              $set: {
                "PersonalDetails.salt": req.body.salt,
                "PersonalDetails.encry_password": req.body.encry_password,
              },
            },
            { new: true, useFindAndModify: false },
            (err, user) => {
              if (err) {
                return res.json({
                  success: false,
                  error: "Something Went Wrong !! Try Again",
                });
              } else {
                return res.json({
                  success: true,
                  message: "Password Changed Successfully",
                });
              }
            }
          );
        } else {
          return res.json({success:false, error:"only password fields allowed"});
        }
      });
    }

    else {
      req.body.salt = uuidv1();
      req.body.encry_password = crypto
        .createHmac("sha256", req.body.salt)
        .update(newPassword)
        .digest("hex");

      BaseUser.findByIdAndUpdate(
        { _id: req.user._id },
        {
          $set: {
            "PersonalDetails.salt": req.body.salt,
            "PersonalDetails.encry_password": req.body.encry_password,
          },
        },
        { new: true, useFindAndModify: false },
        (err, user) => {
          if (err || !user) {
            return res.json({
              success: false,
              error: "Something Went Wrong !! Try Again",
            });
          }
           return res.json({
              success: true,
              message: "Password Changed Successfully",
            });
        }
      );
    } 
};
