const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { BaseUser } = require("../models/baseUser");
const Journal = require("../models/journal");
const { AuthorModel } = require("../models/registeredAuthor");

// ****************** UserVisibilityByAdmin ***********************

exports.UserVisibility = async (req, res) => {
  const changeUserVisibilityStatus = await User.findOneAndUpdate(
    {
      _id: req.params.user,
    },
    {
      $set: {
        disabled: req.body.disabled,
      },
    },
    (err, user) => {
      if (err) {
        return res.status(400).json({ err: "something went wrong" });
      }
      res.json({ success: true, message: "user visibility Changed" });
    }
  );
};

// ********************** Admin signin ***********************
exports.adminSignin = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()[0].msg,
    });
  }

  BaseUser.findOne(
    { "PersonalDetails.emailId": req.body.emailId },
    async (err, user) => {
      if (err || !user) {
        return res.status(422).json({
          success: false,
          errors: "No User Found !!!",
        });
      }

      if (!user.authenticate(req.body.password)) {
        return res
          .status(400)
          .json({ success: false, errors: "password didnot match" });
      }
		
	  if (user.PersonalDetails.role < 4) {
        return res.status(422).json({
          success: false,
          errors: "Only Admin Id's Allowed",
        });
      }

      if (user.isAccountDisabled == true) {
        return res.status(422).json({
          success: false,
          errors: "Your Account Has Been Banned!! Contact Developer",
        });
      }

      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY);

      user.PersonalDetails.salt = undefined;
      user.PersonalDetails.encry_password = undefined;

      res.cookie("token", token, { expire: new Date() + 9999 });

      return res.json({ token, user: user });
    }
  );
};

// ********************** User signin ***********************
exports.signin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()[0].msg,
    });
  }

  const { emailId, password, journalid } = req.body;

  try {
    let firstQuery = await BaseUser.findOne(
      { "PersonalDetails.emailId": emailId },
      async (err, user) => {
        if (err || !user) {
          return res.status(422).json({
            success: false,
            errors: "No User Found !!!",
          });
        }

        if (!user.authenticate(password)) {
          return res
            .status(400)
            .json({ success: false, errors: "password didnot match" });
        }

        if (user.isAccountDisabled == true) {
          return res.status(400).json({
            success: false,
            errors:
              "Sorry We Didnot Found Your Account !! Please Check Your Email",
          });
        }

        if (user.PersonalDetails.role == 4) {
          return res.status(422).json({
            success: false,
            errors: "Access Denied",
          });
        }

        if (user.__type == "author") {
          const index = await user.Journals.findIndex(
            (object) => object.toString() === journalid
          );

          if (index === -1) {
            try {
              let addJournal = await AuthorModel.updateOne(
                { _id: user._id },
                { $push: { Journals: journalid } }
              );

              let addAuthorToJournal = await Journal.updateOne(
                { _id: journalid },
                { $push: { Authors: { authorid: user._id, manuscripts: [] } } }
              );
            } catch (error) {
              return res.status(422).json({
                success: false,
                error: "some technical errors occured",
              });
            }
          }

          BaseUser.findOne(
            { "PersonalDetails.emailId": emailId },
            (err, user) => {
              if (err || !user) {
                return res.status(422).json({
                  success: false,
                  errors: "No User Found !!!",
                });
              }

              const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY);

              user.PersonalDetails.salt = undefined;
              user.PersonalDetails.encry_password = undefined;
              user.Journals = undefined;

              res.cookie("token", token, { expire: new Date() + 9999 });

              return res
                .status(200)
                .json({ token: token, user: user, journal: journalid });
            }
          );
        }
      }
    ).clone();
  } catch (error) {
    console.log(error);
  }
};

// ************************** signout ****************************

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout",
  });
};

exports.getalljounals = (req, res) => {
  try {
    Journal.find().then(
      (savedDoc) => {
        return res.status(200).json({ success: true, allJournals: savedDoc });
      },
      (unsavedDoc) => {
        return res.status(422).json({ success: false, error: unsavedDoc });
      }
    );
  } catch (error) {
    return res.status(422).json({ success: false, error: error });
  }
};
