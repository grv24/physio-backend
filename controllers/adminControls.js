const { body, validationResult } = require("express-validator");
const { AdminModel } = require("../models/admin");
const Journal = require("../models/journal");
const SubmittedManuscript = require("../models/submittedManuscripts");
var moment = require("moment");
const { BaseUser } = require("../models/baseUser");
const User = require("../models/User/userModel");
const Order = require("../models/Order/Order");

exports.createAdmin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()[0].msg,
    });
  }

  const {
    userName,
    emailId,
    password,
    completeAddress,
    country,
    state,
    city,
    zip,
    phone,
    mobile,
  } = req.body;

  //  ADMIN SIGNUP
  var user = new AdminModel({
    PersonalDetails: {
      userName: userName,
      emailId: emailId,
      password: password,
      role: 4,
    },
    Address: {
      completeAddress: completeAddress,
      country: country,
      state: state,
      city: city,
      zip: zip,
      phone: phone,
      mobile: mobile,
    },
  });
  // }

  user.save(async (err, user) => {
    if (err) {
      if (err.code == 11000) {
        return res
          .status(400)
          .json({ success: false, error: "LoginId already taken" });
      } else {
        console.log(err);
        return res
          .status(400)
          .json({ success: false, error: "Something Went Wrong" });
      }
    }
    let displayUser = await res.json({ success: true, userdetails: user });
  });
};

//Add Journal
exports.addJournal = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()[0].msg,
    });
  }

  const {
    JournalTitle,
    AboutJournal,
    AboutUniversity,
    AboutScopeOfJournal,
    AboutJournalPublication,
  } = req.body;

  //  ADMIN SIGNUP
  var journal = new Journal({
    AboutUs: {
      JournalTitle: JournalTitle,
      AboutJournal: AboutJournal,
      AboutUniversity: AboutUniversity,
      AboutScopeOfJournal: AboutScopeOfJournal,
      AboutJournalPublication: AboutJournalPublication,
    },
  });

  journal
    .save()
    .then(
      (savedDoc) => {
        let addJournalId = AdminModel.updateOne(
          {
            _id: req.user._id,
          },
          {
            $push: { Journals: journal._id },
          },
          (err, user) => {
            if (err || !user) {
              return res.status(400).json({ err: "something went wrong" });
            }
            return res
              .status(200)
              .json({ success: true, journalDetails: journal });
          }
        );
      },
      (unsavedDoc) => {
        return res
          .status(400)
          .json({ success: false, error: "something went wrong" });
      }
    )
    .catch((error) => {
      return res
        .status(400)
        .json({ success: false, error: "something went wrong" });
    });
};

// Update Journal
exports.updateJournal = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()[0].msg,
    });
  }

  const {
    JournalTitle,
    AboutJournal,
    AboutUniversity,
    AboutScopeOfJournal,
    AboutJournalPublication,
  } = req.body;

  req.params.journalId &&
    Journal.updateOne(
      {
        _id: req.params.journalId,
      },
      {
        $set: {
          "AboutUs.JournalTitle": JournalTitle,
          "AboutUs.AboutJournal": AboutJournal,
          "AboutUs.AboutUniversity": AboutUniversity,
          "AboutUs.AboutScopeOfJournal": AboutScopeOfJournal,
          "AboutUs.AboutJournalPublication": AboutJournalPublication,
        },
      },
      (err, updatedJournal) => {
        if (err || !updatedJournal) {
          return res
            .status(400)
            .json({ success: false, error: "something went wrong" });
        }
        return res
          .status(200)
          .json({ success: true, message: "Journal Updated Successfully" });
      }
    );
};

exports.createUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()[0].msg,
    });
  }

  const {
    userName,
    emailId,
    password,
    accountType,
    role,
    accountDisabled,
    creditReference,
    exposureLimit,
  } = req.body;

  //  ADMIN SIGNUP
  var user = new AdminModel({
    PersonalDetails: {
      userName: userName,
      emailId: emailId,
      password: password,
      role: role,
    },
    isAccountDisabled: accountDisabled,
    AccountDetails: {
      AccountType: accountType,
      creditReference: creditReference,
      Balance: creditReference,
      AvailableBalance: creditReference,
      ExposureLimit: exposureLimit,
    },
    UplineId: req.user._id,
  });
  // }

  user.save(async (err, user) => {
    if (err) {
      // console.log(err);
      if (err.code == 11000) {
        return res
          .status(400)
          .json({ success: false, error: "LoginId already taken" });
      } else {
        return res
          .status(400)
          .json({ success: false, error: "Something Went Wrong" });
      }
    }
    let displayUser = await res.json({ success: true, userdetails: user });
  });
};


exports.allUsers = (req, res) => {
  User.find({}, { password: 0 }).exec(async (err, allUsers) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: "No Users Found",
      });
    }

    let response = await res.status(200).json({
      success: true,
      data: allUsers,
    });
  });
};

exports.allAuthors = (req, res) => {
  BaseUser.find({__type:"author"}, { password: 0 }).exec(async (err, allAuthors) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: "No Authors Found",
      });
    }

    let response = await res.status(200).json({
      success: true,
      data: allAuthors,
    });
  });
};

exports.accountLockUnlock = (req, res) => {
  try {
    if (req.body) {
      const changeUserVisibilityStatus =
        req.body.status &&
        BaseUser.updateOne(
          {
            _id: req.params.userId,
          },
          {
            $set: {
              isAccountDisabled: req.body.status,
            },
          },
          (err, user) => {
            if (err) {
              return res.status(400).json({ err: "something went wrong" });
            }
            res.json({ success: true, message: "Account Status Changed" });
          }
        );
    } else {
      throw new Error("no status present", 201);
    }
  } catch (error) {
    console.log(error);
  }
};

// Change staff passwords
exports.changeUserPassword = (req, res) => {
  const { newPassword } = req.body;

  BaseUser.findOne({ _id: req.params._id }, (err, user) => {
    if (err || !user) {
      return res.status(422).json({
        error: "No User Found! Create a Account.",
      });
    }

    if (newPassword) {
      req.body.salt = uuid();
      req.body.encry_password = crypto
        .createHmac("sha256", req.body.salt)
        .update(newPassword)
        .digest("hex");

      BaseUser.findByIdAndUpdate(
        { _id: req.params._id },
        {
          $set: {
            "PersonalDetails.salt": req.body.salt,
            "PersonalDetails.encry_password": req.body.encry_password,
          },
        },
        { new: true, useFindAndModify: false },
        (err, user) => {
          if (err) {
            return res.status(400).json({
              success: false,
              error: "Something Went Wrong !! Try Again",
            });
          }
          (user.salt = undefined),
            (user.encry_password = undefined),
            res.json({
              success: true,
              message: "Password Changed Successfully",
              data: user,
            });
        }
      );
    } else {
      return res.json("only password fields allowed");
    }
  });
};

// Delete/Close Staff Account
exports.closeUserAccount = (req, res) => {
  try {
    BaseUser.deleteOne({ _id: req.params.userId }, async (err, sellershop) => {
      if (err) {
        return res.status(400).json({ success: false, error: "not in db" });
      }
      await BaseUser.deleteMany(
        { uplineId: req.params.userId },
        (err, user) => {
          if (err) {
            return;
          }
          return res.status(200).json({
            success: true,
            message: "Account Closed successfully",
          });
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updatemanuscriptActivity = (req, res) => {
  SubmittedManuscript.updateOne(
    { manuscriptid: req.params.manuscriptId },
    {
      $set: {
        status: "Pending"
      },
      $push: {
        activities: { activity: "UR", activityDate: moment().format() },
      },
    },
    (err, savedDoc) => {
      if (err || !savedDoc) {
        return res.json({
          success: false,
          error: "No User Found !!!",
        });
      }

      return res
        .status(200)
        .json({ success: true, msg: "Manuscript Updated Successfully" });
    }
  );
};

exports.getAdminDetails = (req, res) => {
  try {
    if (req.user) {
      return res.status(200).json(req.user);
    } else {
      return res.status(200).json({ error: "Token Invalid Or Expired" });
    }
  } catch (error) {
    return res.status(200).json({ error: error });
  }
};

exports.updateAdminDetails = async (req, res) => {
  try {
    if (req.user) {
      const { Address, PersonalDetails } = req.body;

      if (PersonalDetails.emailId) {
        const Id = await BaseUser.findOne({
          "PersonalDetails.emailId": PersonalDetails.emailId,
        });
        if (Id) {
          if (Id.PersonalDetails.emailId != req.user.PersonalDetails.emailId) {
            return res.status(400).json({success:false, error: "emailId Already Present" });
          }
        } else {
          req.user.PersonalDetails.emailId = PersonalDetails.emailId;
        }
      }

      if (Address.completeAddress) {
        req.user.Address.completeAddress = Address.completeAddress;
      }

      if (Address.country) {
        req.user.Address.country = Address.country;
      }

      if (Address.state) {
        req.user.Address.state = Address.state;
      }

      if (Address.city) {
        req.user.Address.city = Address.city;
      }

      if (Address.zip) {
        req.user.Address.zip = Address.zip;
      }
      if (Address.mobile) {
        req.user.Address.mobile = Address.mobile;
      }

      await req.user
        .save()
        .then(
          (onsuccess) => {
            return res
              .status(200)
              .json({ success: true, message: "Field Updated" });
          },
          (onunsuccess) => {
            return res
              .status(200)
              .json({ success: false, message: "Field not Updated" });
          }
        )
        .catch((err) => {
          return res.status(400).json({ error: err });
        });
    } else {
      return res.status(400).json({ error: "Token Invalid Or Expired" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};


exports.getAllSubmittedManuscriptOfAuthorsWithAuthorId = (req, res) => {
  SubmittedManuscript.find({ authorid: req.params.authorid })
    .sort('-createdAt')
    .populate({ path: "manuscriptid" })
    .exec((err, manuscriptDoc) => {
      if (err || !manuscriptDoc) {
        return res.status(422).json({ success: false, error: err });
      }

      return res.status(200).json({ success: true, data: manuscriptDoc });
    });
};

exports.getAllLatestSubmittedManuscript = (req, res) => {
  SubmittedManuscript.find({})
    .sort('-createdAt')
    .populate({ path: "manuscriptid" })
    .exec((err, manuscriptDoc) => {
      if (err || !manuscriptDoc) {
        return res.status(422).json({ success: false, error: err });
      }

      return res.status(200).json({ success: true, data: manuscriptDoc });
    });
};


// GET ALL ORDERS
exports.getAllOrders = (req,res) => {
  Order.find({})
  .sort('-createdAt')
  .populate({ path: "user" })
  .exec((err, orders) => {
    if (err || !orders) {
      return res.status(422).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, orders: orders });
  });
}

// GET ALL USER ORDERS
exports.getUserOrders = (req,res) => {
  Order.find({user:req.params.customerId})
  .sort('-createdAt')
  .populate({ path: "user" })
  .exec((err, orders) => {
    if (err || !orders) {
      return res.status(422).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, orders: orders });
  });
}
