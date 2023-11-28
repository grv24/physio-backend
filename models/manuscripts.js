const mongoose = require("mongoose");

// Basically Issue

const manuscriptSchema = mongoose.Schema({
  // 1-Page 
  ManuscriptPage1: {
    articleType: {
      type: String,
      trim:true,
    },
    issue: {
      issueType: {
        type: String,
        enum: ["Regular", "Special"],
        default: "Regular",
      },
      specialIssue: {
        type: String,
        default: "No Special Issue",
      },
    },
    policy: {
      policyText: {
        type: String,
        required: true,
        trim:true,
      },
      policyAccepted: {
        type: Boolean,
        default: false,
      },
    },
  },

  //2-Page More about manuscript
  ManuscriptPage2: {
    fullTitle: {
      type: String,
      trim:true,
    },
    shortTitle: {
      type: String,
      trim:true,
    },
    keywords: [{ type: String, trim:true, }],
    manuscriptTopics: { type: String, trim:true, },
    abstract: {
      type: String,
      maxLength: 500,
      trim:true,
    },
  },

  //3-Page AddAuthors with serial number
  ManuscriptPage3: {
    Authors: [{
      Prefix:String,
      userName:String,
      emailId:String,
      academicDegree:String,
      institution: {type:String},
      city: {type:String },
      mobile: {type:Number},
      state: {type:String, required:[true, 'state is required']},
      statecode: {type:String, required:[true, 'state is required']},
      country: {type:String, required:[true, 'country is required']},
      countrycode: {type:String, required:[true, 'country is required']},
      isCorrespondingAuthor:{type:Boolean, default:false}
    }]
  },

  //4-Page  {File uploads}
  ManuscriptPage4: {
    titlePage: { type: String }, //maximum - 1mb word/pdf
    coverLetter: { type: String }, //maximum - 1mb word/pdf
    manuscript: { type: String }, //maximum - 15mb word/pdf
    tables: String, // ppt/word
    figures: String, // ppt/word
    supplimentryFiles: String, // word/pdf/ppt/jpeg
    ethicalApproval: String, // word/pdf/ppt/jpeg
    coi: String, // word/pdf/ppt/jpeg
    fi: String, // word/pdf/ppt/jpeg
  },

  //5-Page  {Suggested Reviewers}
  ManuscriptPage5: {
    Reviewers: [{
      Prefix:String,
      userName:String,
      emaildId:String,
      academicDegree:String,
      institution: {type:String},
      city: {type:String},
      mobile: {type:Number},
      state: {type:String, required:[true, 'state is required']},
      statecode: {type:String, required:[true, 'state is required']},
      country: {type:String, required:[true, 'country is required']},
      countrycode: {type:String, required:[true, 'country is required']},
    }]
  },

  //6-Page {Final Submit}
  ManuscriptPage6: {
    respondToTheQuestions: [],
    generalInformation: [],
  },
  isManuscriptInComplete: { type: Boolean, default: true },
  authorid: {
    type: mongoose.Schema.Types.ObjectId,
    trim: true,
    ref: "author",
    default: null,
  },
  journalid: {
    type: mongoose.Schema.Types.ObjectId,
    trim: true,
    ref: "journal",
    default: null,
  },
},{timestamps:true});

const Manuscript = mongoose.model("manuscript", manuscriptSchema);

module.exports = Manuscript;
