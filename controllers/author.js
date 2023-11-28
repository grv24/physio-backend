const { AuthorModel } = require("../models/registeredAuthor");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { BaseUser } = require("../models/baseUser");
const { emailSend } = require("../utils/emailSend");
const { verificationEmail } = require("../utils/emailtemplates");
const Journal = require("../models/journal");
const Manuscript = require("../models/manuscripts");
const Manuallyaddedauthor = require("../models/manuallyAddedAuthor");
const Multer = require("multer");
const fs = require("fs");
const ManuallyAddedReviewer = require("../models/manuallyAddedReviewers");
const SubmittedManuscript = require("../models/submittedManuscripts");
var moment = require("moment");

const fileStorageEngine = Multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "titlePage") {
      // if uploading titlePage
      cb(null, "./documents/titlePage");
    }
    if (file.fieldname === "coverLetter") {
      // if uploading coverLetter
      cb(null, "./documents/coverLetter");
    }
    if (file.fieldname === "manuscript") {
      // if uploading manuscript
      cb(null, "./documents/manuscript");
    }
    if (file.fieldname === "tables") {
      // if uploading tables
      cb(null, "./documents/tables");
    }
    if (file.fieldname === "figures") {
      // if uploading figures
      cb(null, "./documents/figures");
    }
    if (file.fieldname === "supplimentryFiles") {
      // if uploading supplimentryFiles
      cb(null, "./documents/supplimentryFiles");
    }
    if (file.fieldname === "ethicalApproval") {
      // if uploading ethicalApproval
      cb(null, "./documents/ethicalApproval");
    }
    if (file.fieldname === "coi") {
      // if uploading coi
      cb(null, "./documents/coi");
    }
    if (file.fieldname === "fi") {
      // if uploading coi
      cb(null, "./documents/fi");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

// Author Signup POST
exports.AuthorSignup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      success: false,
      errors: errors.array()[0].msg,
    });
  }

  const {
    prefix,
    userName,
    emailId,
    password,
    completeAddress,
    country,
    countrycode,
    state,
    statecode,
    city,
    zip,
    mobile,
    phone,
    academicDegree,
    institution,
    department,
    position,
    journalid,
  } = req.body;

  var user = new AuthorModel({
    PersonalDetails: {
      prefix: prefix,
      userName: userName,
      emailId: emailId,
      password: password,
      role: 0,
    },
    isAccountDisabled: true,
    Address: {
      completeAddress: completeAddress,
      country: country,
      countrycode: countrycode,
      state: state,
      statecode: statecode,
      city: city,
      zip: zip,
      phone: phone,
      mobile: mobile,
    },
    AuthorInformation: {
      academicDegree: academicDegree,
      institution: institution,
      department: department,
      position: position,
    },
    Journals: [journalid],
  });

  user
    .save()
    .then(
      (savedDoc) => {
        let addJournalId = Journal.updateOne(
          {
            _id: journalid,
          },
          {
            $push: { Authors: { authorid: savedDoc._id, manuscripts: [] } },
          },
          async (err, user) => {
            if (err || !user) {
              return res.status(400).json({ err: "something went wrong" });
            }

            const token = jwt.sign(
              { _id: savedDoc._id },
              process.env.TOKEN_KEY
            );

            const subject = "Verification Mail";

            const output = verificationEmail(token, savedDoc);

            let sendVerificationEmail = await emailSend(
              req,
              res,
              savedDoc,
              subject,
              output
            );

            return await res.json({
              success: true,
              msg: `Registration Done !!! A verification link has been sent to ${savedDoc.PersonalDetails.emailId}`,
            });
          }
        );
      },
      (unsavedDoc) => {
        if (unsavedDoc.code == 11000) {
          return res
            .status(400)
            .json({ success: false, error: "EmailId already in use" });
        }
        return res
          .status(400)
          .json({ success: false, error: "something went wrong" });
      }
    )
    .catch((error) => {
      console.log(error, "3");
      return res
        .status(400)
        .json({ success: false, error: "something went wrong" });
    });
};

// Author Verification PUT
exports.verifyAuthor = async (req, res) => {
  if (req.user.isAccountDisabled == false) {
    return res.json({ success: false, error: "Already Verified" });
  }

  const verification = await BaseUser.updateOne(
    {
      _id: req.user._id,
    },
    {
      $set: {
        isAccountDisabled: false,
      },
    },
    (err, user) => {
      if (err || !user) {
        return res
          .status(400)
          .json({ success: false, error: "already verified!! Please Login" });
      }
      return res.json({ success: true, data: "user verified successfully" });
    }
  ).clone();
};

// Author Information Update PUT
exports.updateAuthorInformation = (req, res) => {
  const {
    prefix,
    userName,
    completeAddress,
    country,
    countrycode,
    state,
    statecode,
    city,
    zip,
    mobile,
    phone,
    academicDegree,
    institution,
    department,
    position,
  } = req.body;

  AuthorModel.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        "PersonalDetails.prefix": prefix,
        "PersonalDetails.userName": userName,
        Address: {
          completeAddress: completeAddress,
          country: country,
          countrycode: countrycode,
          state: state,
          statecode: statecode,
          city: city,
          zip: zip,
          phone: phone,
          mobile: mobile,
        },
        AuthorInformation: {
          academicDegree: academicDegree,
          institution: institution,
          department: department,
          position: position,
        },
      },
    },
    (err, user) => {
      if (err || !user) {
        return res.json({
          success: false,
          error: "No User Found !!!",
        });
      }

      return res.json({ success: true, msg: "Account Updated Successfully" });
    }
  );
};

exports.createManuscript_01 = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()[0].msg,
    });
  }

  const {
    articleType,
    issueType,
    specialIssue,
    policyText,
    policyAccepted,
    journalid,
  } = req.body;

  var manuscript = new Manuscript({
    ManuscriptPage1: {
      articleType: articleType,
      issue: {
        issueType: issueType,
        specialIssue: specialIssue,
      },
      policy: {
        policyText: policyText,
        policyAccepted: policyAccepted,
      },
    },
    authorid: req.user._id,
    journalid: journalid,
  });

  manuscript
    .save()
    .then(
      async (savedDoc) => {
        await Journal.updateOne(
          { _id: journalid, "Authors.authorid": req.user._id },
          {
            $push: {
              "Authors.$.manuscripts": savedDoc._id,
            },
          }
        );
        return res.status(200).json({ success: true, manuscript: savedDoc });
      },
      (unsavedDoc) => {
        return res.status(400).json({ success: false, error: unsavedDoc });
      }
    )
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
};

exports.updatemanuscript_01 = (req, res) => {
  const { articleType, issueType, specialIssue, policyText, policyAccepted } =
    req.body;

  Manuscript.updateOne(
    { _id: req.params.manuscriptId },
    {
      $set: {
        ManuscriptPage1: {
          articleType: articleType,
          issue: {
            issueType: issueType,
            specialIssue: specialIssue,
          },
          policy: {
            policyText: policyText,
            policyAccepted: policyAccepted,
          },
        },
      },
    },
    (err, savedDoc) => {
      console.log(err);
      if (err || !savedDoc) {
        return res.json({
          success: false,
          error: "No Manuscript Found !!! Try Again",
        });
      }

      return res
        .status(200)
        .json({ success: true, msg: "Manuscript Updated Successfully" });
    }
  );
};

exports.updatemanuscript_02 = (req, res) => {
  const { fullTitle, shortTitle, keywords, manuscriptTopics, abstract } =
    req.body;

  Manuscript.updateOne(
    { _id: req.params.manuscriptId },
    {
      $set: {
        ManuscriptPage2: {
          fullTitle: fullTitle,
          shortTitle: shortTitle,
          keywords: keywords,
          manuscriptTopics: manuscriptTopics,
          abstract: abstract,
        },
      },
    },
    (err, savedDoc) => {
      if (err || !savedDoc) {
        return res.json({
          success: false,
          error: "No Manuscript Found !!! Try Again",
        });
      }

      return res
        .status(200)
        .json({ success: true, msg: "Manuscript Updated Successfully" });
    }
  );
};

exports.addcoauthor = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      success: false,
      errors: errors.array()[0].msg,
    });
  }

  const {
    prefix,
    userName,
    emailId,
    academicDegree,
    institution,
    country,
    countrycode,
    state,
    statecode,
    city,
    mobile,
    iscorrespondingauthor,
    iscoauthor,
  } = req.body;

  var coauthor = new Manuallyaddedauthor({
    Author: {
      prefix: prefix,
      userName: userName,
      emailId: emailId,
      academicDegree: academicDegree,
      institution: institution,
      state: state,
      statecode: statecode,
      city: city,
      country: country,
      countrycode: countrycode,
      mobile: mobile,
      iscorrespondingauthor: iscorrespondingauthor,
      iscoauthor: iscoauthor,
    },
    manuscriptId: req.params.manuscriptId,
  });

  coauthor
    .save()
    .then(
      (savedDoc) => {
        return res.status(200).json({
          success: true,
          savedDoc: savedDoc,
          msg: "coauthor added successfully",
        });
      },
      (unsavedDoc) => {
        if (unsavedDoc.code == 11000) {
          return res.json({ success: false, error: "EmailId cannot be added" });
        }
        return res.json({ success: false, error: "something went wrong" });
      }
    )
    .catch((error) => {
      return res.json({ success: false, error: "something went wrong" });
    });
};

exports.updatecoauthor = (req, res) => {
  const {
    prefix,
    userName,
    emailId,
    academicDegree,
    institution,
    country,
    countrycode,
    state,
    statecode,
    city,
    mobile,
    iscorrespondingauthor,
    iscoauthor,
  } = req.body;

  Manuallyaddedauthor.updateOne(
    { _id: req.params.coauthorId },
    {
      $set: {
        Author: {
          prefix: prefix,
          userName: userName,
          emailId: emailId,
          academicDegree: academicDegree,
          institution: institution,
          state: state,
          statecode: statecode,
          city: city,
          country: country,
          countrycode: countrycode,
          mobile: mobile,
          iscorrespondingauthor: iscorrespondingauthor,
          iscoauthor: iscoauthor,
        },
      },
    },
    (err, savedDoc) => {
      if (err || !savedDoc) {
        return res.json({
          success: false,
          error: "Co Author Not Updated !!! Try Again",
        });
      }

      return res
        .status(200)
        .json({ success: true, msg: "Co Author Updated Successfully" });
    }
  );
};

exports.deletecoauthor = (req, res) => {
  try {
    Manuallyaddedauthor.deleteOne(
      { _id: req.params.coauthorId },
      async (err, deletedDoc) => {
        if (err || !deletedDoc) {
          return res.json({ success: false, error: "something went wrong" });
        }

        if (deletedDoc.deletedCount === 0) {
          return res.json({
            success: false,
            error: "You Cannot Delete The Prime Author",
          });
        }
        return res
          .status(200)
          .json({ success: true, msg: "author deleted successfully" });
      }
    );
  } catch (error) {
    return res.json({ success: false, error: "something went wrong" });
  }
};

exports.getcoauthors = (req, res) => {
  try {
    Manuallyaddedauthor.find({ manuscriptId: req.params.manuscriptId }).exec(
      async (err, allUsers) => {
        if (err || !allUsers) {
          return res.json({
            success: false,
            error: "No Authors Found",
          });
        }

        return res.status(200).json({
          success: true,
          data: allUsers,
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      error: "No Authors Found",
    });
  }
};

exports.updatemanuscript_03 = (req, res) => {
  const { Authors } = req.body;

  Manuscript.updateOne(
    { _id: req.params.manuscriptId },
    {
      $set: {
        ManuscriptPage3: {
          Authors: Authors,
        },
      },
    },
    (err, savedDoc) => {
      if (err || !savedDoc) {
        return res.json({
          success: false,
          error: "No Authors Found !!! Try Again",
        });
      }

      return res
        .status(200)
        .json({ success: true, msg: "Manuscript Updated Successfully" });
    }
  );
};

exports.updatemanuscript_04 = async (req, res) => {
  await Manuscript.findOne({ _id: req.params.manuscriptId })
    .then((savedDoc) => {
      req.manuscriptDoc = savedDoc;
    })
    .catch((err) => {
      return res.json({ success: false, error: err });
    });

  let deletePicture = (doc) => {
    if (doc === "titlePage") {
      req.manuscriptDoc.ManuscriptPage4.titlePage &&
        fs.unlink(
          req.manuscriptDoc.ManuscriptPage4.titlePage,
          (err, delPic) => {
            if (err) {
              return;
            }
            return;
          }
        );
    }
    if (doc === "coverLetter") {
      req.manuscriptDoc.ManuscriptPage4.coverLetter &&
        fs.unlink(
          req.manuscriptDoc.ManuscriptPage4.coverLetter,
          (err, delPic) => {
            if (err) {
              return;
            }
            return;
          }
        );
    }
    if (doc === "manuscript") {
      req.manuscriptDoc.ManuscriptPage4.manuscript &&
        fs.unlink(
          req.manuscriptDoc.ManuscriptPage4.manuscript,
          (err, delPic) => {
            if (err) {
              return;
            }
            return;
          }
        );
    }
    if (doc === "tables") {
      req.manuscriptDoc.ManuscriptPage4.tables &&
        fs.unlink(req.manuscriptDoc.ManuscriptPage4.tables, (err, delPic) => {
          if (err) {
            return;
          }
          return;
        });
    }
    if (doc === "figures") {
      req.manuscriptDoc.ManuscriptPage4.figures &&
        fs.unlink(req.manuscriptDoc.ManuscriptPage4.figures, (err, delPic) => {
          if (err) {
            return;
          }
          return;
        });
    }
    if (doc === "supplimentryFiles") {
      req.manuscriptDoc.ManuscriptPage4.supplimentryFiles &&
        fs.unlink(
          req.manuscriptDoc.ManuscriptPage4.supplimentryFiles,
          (err, delPic) => {
            if (err) {
              return;
            }
            return;
          }
        );
    }
    if (doc === "ethicalApproval") {
      req.manuscriptDoc.ManuscriptPage4.ethicalApproval &&
        fs.unlink(
          req.manuscriptDoc.ManuscriptPage4.ethicalApproval,
          (err, delPic) => {
            if (err) {
              return;
            }
            return;
          }
        );
    }
    if (doc === "coi") {
      req.manuscriptDoc.ManuscriptPage4.coi &&
        fs.unlink(req.manuscriptDoc.ManuscriptPage4.coi, (err, delPic) => {
          if (err) {
            return;
          }
          return;
        });
    }
    if (doc === "fi") {
      req.manuscriptDoc.ManuscriptPage4.fi &&
        fs.unlink(req.manuscriptDoc.ManuscriptPage4.fi, (err, delPic) => {
          if (err) {
            return;
          }
          return;
        });
    }
  };

  (await req.files.titlePage)
    ? deletePicture(req.files.titlePage[0].fieldname)
    : null;
  (await req.files.coverLetter)
    ? deletePicture(req.files.coverLetter[0].fieldname)
    : null;
  (await req.files.manuscript)
    ? deletePicture(req.files.manuscript[0].fieldname)
    : null;
  (await req.files.tables)
    ? deletePicture(req.files.tables[0].fieldname)
    : null;
  (await req.files.figures)
    ? deletePicture(req.files.figures[0].fieldname)
    : null;
  (await req.files.supplimentryFiles)
    ? deletePicture(req.files.supplimentryFiles[0].fieldname)
    : null;
  (await req.files.ethicalApproval)
    ? deletePicture(req.files.ethicalApproval[0].fieldname)
    : null;
  (await req.files.coi) ? deletePicture(req.files.coi[0].fieldname) : null;
  (await req.files.fi) ? deletePicture(req.files.fi[0].fieldname) : null;

  const {
    manuscript,
    coverLetter,
    titlePage,
    tables,
    ethicalApproval,
    supplimentryFiles,
    figures,
    coi,
    fi,
  } = req.body;

  await Manuscript.updateOne(
    { _id: req.params.manuscriptId },
    {
      $set: {
        ManuscriptPage4: {
          titlePage: req.files.titlePage
            ? req.files.titlePage[0].path
            : titlePage,
          coverLetter: req.files.coverLetter
            ? req.files.coverLetter[0].path
            : coverLetter,
          manuscript: req.files.manuscript
            ? req.files.manuscript[0].path
            : manuscript,
          tables: req.files.tables ? req.files.tables[0].path : tables,
          figures: req.files.figures ? req.files.figures[0].path : figures,
          supplimentryFiles: req.files.supplimentryFiles
            ? req.files.supplimentryFiles[0].path
            : supplimentryFiles,
          ethicalApproval: req.files.ethicalApproval
            ? req.files.ethicalApproval[0].path
            : ethicalApproval,
          coi: req.files.coi ? req.files.coi[0].path : coi,
          fi: req.files.fi ? req.files.fi[0].path : fi,
        },
      },
    },
    (err, savedDoc) => {
      if (err || !savedDoc) {
        return res.json({
          success: false,
          error: "Documents Not Updated Successfully !!! Try Again",
        });
      }

      return res.status(200).json({
        success: true,
        data: savedDoc,
        msg: "Manuscript Documents Updated Successfully",
      });
    }
  ).clone();
};

exports.upload = Multer({
  storage: fileStorageEngine,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "titlePage") {
      if (
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/msword" ||
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        // check file type to be pdf, doc, or docx
        cb(null, true);
      } else {
        return cb(new Error("Only pdf and word format allowed for titlepage!"));
      }
    }
    if (file.fieldname === "coverLetter") {
      if (
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/msword" ||
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        // check file type to be pdf, doc, or docx
        cb(null, true);
      } else {
        return cb(
          new Error("Only pdf and word format allowed for coverletter!")
        );
      }
    }
    if (file.fieldname === "manuscript") {
      if (
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/msword" ||
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        // check file type to be pdf, doc, or docx
        maxSize = 15000000;
        cb(null, true);
      } else {
        return;
      }
    }
    if (file.fieldname === "tables") {
      if (
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/msword" ||
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        // check file type to be pdf, doc, or docx
        cb(null, true);
      } else {
        return cb(new Error("Only pdf and word format allowed for tables!"));
      }
    }
    if (file.fieldname === "figures") {
      if (
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/msword" ||
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        // check file type to be pdf, doc, or docx
        cb(null, true);
      } else {
        return cb(new Error("Only pdf and word format allowed for figures!"));
      }
    }
    if (file.fieldname === "supplimentryFiles") {
      if (
        file.mimetype === "application/pdf" || //pdf
        file.mimetype === "application/msword" || //word
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || //msword
        file.mimetype === "image/jpg" || //image
        file.mimetype === "application/vnd.ms-powerpoint" || //ppt
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.presentationml.pr" //pptx
      ) {
        // check file type to be pdf, doc, or docx
        cb(null, true);
      } else {
        return cb(
          new Error(
            "Only jpeg, pdf ppt and word format allowed for supplimentry files"
          )
        );
      }
    }
    if (file.fieldname === "ethicalApproval") {
      if (
        file.mimetype === "application/pdf" || //pdf
        file.mimetype === "application/msword" || //word
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || //msword
        file.mimetype === "image/jpg" || //image
        file.mimetype === "application/vnd.ms-powerpoint" || //ppt
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.presentationml.pr" //pptx
      ) {
        // check file type to be pdf, doc, or docx
        cb(null, true);
      } else {
        return cb(
          new Error(
            "Only jpeg, pdf ppt and word format allowed for ethicalApproval "
          )
        );
      }
    }
    if (file.fieldname === "coi") {
      // if uploading resume
      if (
        file.mimetype === "application/pdf" || //pdf
        file.mimetype === "application/msword" || //word
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || //msword
        file.mimetype === "image/jpg" || //image
        file.mimetype === "application/vnd.ms-powerpoint" || //ppt
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.presentationml.pr" //pptx
      ) {
        // check file type to be pdf, doc, or docx
        cb(null, true);
      } else {
        return cb(
          new Error("Only jpeg, pdf ppt and word format allowed for coi")
        );
      }
    }
    if (file.fieldname === "fi") {
      // if uploading resume
      if (
        file.mimetype === "application/pdf" || //pdf
        file.mimetype === "application/msword" || //word
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || //msword
        file.mimetype === "image/jpg" || //image
        file.mimetype === "application/vnd.ms-powerpoint" || //ppt
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.presentationml.pr" //pptx
      ) {
        // check file type to be pdf, doc, or docx
        cb(null, true);
      } else {
        return cb(
          new Error("Only jpeg, pdf ppt and word format allowed for fi")
        );
      }
    }
  },
  limits: {
    fileSize: 15000000, // 15MB
  },
});

exports.deletedocument = async (req, res) => {
  const { documentPath, documentCategory } = req.body;

  (await documentPath) &&
    fs.unlink(documentPath, (err, delPic) => {
      if (err) {
        return;
      }
    });
  await Manuscript.updateOne(
    { _id: req.params.manuscriptId },
    {
      $set: {
        ["ManuscriptPage4." + documentCategory]: "",
      },
    }
  );
  return await res.status(200).json({ success: true, msg: "document deleted" });
};

exports.addreviewer = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      success: false,
      errors: errors.array()[0].msg,
    });
  }

  const {
    prefix,
    userName,
    emailId,
    academicDegree,
    institution,
    country,
    countrycode,
    state,
    statecode,
    city,
    mobile,
  } = req.body;

  var reviewer = new ManuallyAddedReviewer({
    Reviewer: {
      prefix: prefix,
      userName: userName,
      emailId: emailId,
      academicDegree: academicDegree,
      institution: institution,
      state: state,
      statecode: statecode,
      city: city,
      country: country,
      countrycode: countrycode,
      mobile: mobile,
    },
    manuscriptId: req.params.manuscriptId,
  });

  reviewer
    .save()
    .then(
      (savedDoc) => {
        return res.status(200).json({
          success: true,
          savedDoc: savedDoc,
          msg: "reviewer added successfully",
        });
      },
      (unsavedDoc) => {
        if (unsavedDoc.code == 11000) {
          return res.json({ success: false, error: "EmailId already in use" });
        }
        return res.json({ success: false, error: "something went wrong" });
      }
    )
    .catch((error) => {
      return res.json({ success: false, error: "something went wrong" });
    });
};

exports.updatereviewer = (req, res) => {
  const {
    prefix,
    userName,
    emailId,
    academicDegree,
    institution,
    country,
    countrycode,
    state,
    statecode,
    city,
    mobile,
  } = req.body;

  ManuallyAddedReviewer.updateOne(
    { _id: req.params.reviewerId },
    {
      $set: {
        Reviewer: {
          prefix: prefix,
          userName: userName,
          emailId: emailId,
          academicDegree: academicDegree,
          institution: institution,
          state: state,
          statecode: statecode,
          city: city,
          country: country,
          countrycode: countrycode,
          mobile: mobile,
        },
      },
    },
    (err, savedDoc) => {
      if (err || !savedDoc) {
        return res.json({
          success: false,
          error: "Reviewer Not Updated !!! Try Again",
        });
      }

      return res
        .status(200)
        .json({ success: true, msg: "Reviewer Updated Successfully" });
    }
  );
};

exports.deletereviewer = (req, res) => {
  try {
    ManuallyAddedReviewer.deleteOne(
      { _id: req.params.reviewerId },
      async (err, deletedDoc) => {
        if (err || !deletedDoc) {
          return res.json({ success: false, error: "something went wrong" });
        }
        return res
          .status(200)
          .json({ success: true, msg: "author deleted successfully" });
      }
    );
  } catch (error) {
    return res.json({ success: false, error: "something went wrong" });
  }
};

exports.getreviewers = (req, res) => {
  try {
    ManuallyAddedReviewer.find({ manuscriptId: req.params.manuscriptId }).exec(
      async (err, allUsers) => {
        if (err || !allUsers) {
          return res.json({
            success: false,
            error: "No Reviewer Found",
          });
        }

        return res.status(200).json({
          success: true,
          data: allUsers,
        });
      }
    );
  } catch (error) {
    return res.json({
      success: false,
      error: "No Reviewer Found",
    });
  }
};

exports.updatemanuscript_05 = (req, res) => {
  const { Reviewers } = req.body;

  Manuscript.updateOne(
    { _id: req.params.manuscriptId },
    {
      $set: {
        ManuscriptPage5: {
          Reviewers: Reviewers,
        },
      },
    },
    (err, savedDoc) => {
      if (err || !savedDoc) {
        console.log(err);
        return res.json({
          success: false,
          error: "No User Found !!!",
        });
      }

      console.log(savedDoc);

      return res
        .status(200)
        .json({ success: true, msg: "Manuscript Updated Successfully" });
    }
  );
};

exports.updatemanuscript_06 = (req, res) => {
  const { respondToTheQuestions, generalInformation } = req.body;
  Manuscript.findByIdAndUpdate(
    { _id: req.params.manuscriptId },
    {
      $set: {
        ManuscriptPage6: {
          respondToTheQuestions: respondToTheQuestions,
          generalInformation: generalInformation,
        },
        isManuscriptInComplete: false,
      },
    },
    async (err, savedDoc) => {
      if (err || !savedDoc) {
        return res.json({
          success: false,
          error: "No User Found !!!",
        });
      }

      let lastContact = await SubmittedManuscript.find({})
        .sort({ _id: -1 })
        .limit(1);

      var savedManuscript = new SubmittedManuscript({
        id: lastContact[0] ? lastContact[0].id + 1 : 1,
        submissionName: "PHYSIOTIMES",
        currentYear: moment().year(),
        manuscriptid: savedDoc._id,
        authorid: savedDoc.authorid,
        journalid: savedDoc.journalid,
        status: "Submitted",
        activities: [{ activity: "", activityDate: moment().format() }],
        currentlyHandling: "admin",
        assignTo: "admin",
      });

      await savedManuscript.save();

      return await res
        .status(200)
        .json({ success: true, msg: "Manuscript Submitted Successfully" });
    }
  );
};

exports.getmanuscript = (req, res) => {
  Manuscript.findOne(
    { _id: req.params.manuscriptId },
    async (err, manuscriptDoc) => {
      if (err || !manuscriptDoc) {
        return res.status(422).json({ success: false, error: err });
      }

      return res.status(200).json({ success: true, data: manuscriptDoc });
    }
  );
};

exports.getAllManuscriptOfAuthorsWithJournalId = (req, res) => {
  Journal.findOne({ _id: req.params.journalid }, async (err, manuscriptDoc) => {
    if (err || !manuscriptDoc) {
      return res.status(422).json({ success: false, error: err });
    }

    const filteredArray = await manuscriptDoc.Authors.filter(
      (author) => author.authorid.toString() === req.user._id.toString()
    )[0];

    return await res
      .status(200)
      .json({ success: true, data: filteredArray.manuscripts });
  }).populate({ path: "Authors.manuscripts" });
};

exports.getAllSubmittedManuscriptOfAuthorsWithJournalId = (req, res) => {
  SubmittedManuscript.find(
    { journalid: req.params.journalid },
    async (err, manuscriptDoc) => {
      if (err || !manuscriptDoc) {
        return res.status(422).json({ success: false, error: err });
      }

      const filteredArray = await manuscriptDoc.filter((doc) => {
        return doc.authorid.toString() === req.user._id.toString() && doc;
      });

      return await res.status(200).json({ success: true, data: filteredArray });
    }
  ).populate({ path: "manuscriptid" });
};

exports.deletemanuscript = (req, res) => {
  Manuscript.deleteOne(
    { _id: req.params.manuscriptId },
    (err, manuscriptDoc) => {
      if (err || !manuscriptDoc) {
        return res.status(422).json({ success: false, error: err });
      }
      return res.status(200).json({
        success: true,
        data: manuscriptDoc,
        msg: "delete successfully",
      });
    }
  );
};
