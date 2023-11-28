const mongoose = require("mongoose");

const manuallyaddedauthorSchema = mongoose.Schema({
  Author: {
    prefix: {type:String, required:[true, 'prefix required']},
    userName: {type:String, required:[true, 'Name is required']},
    emailId: {type:String, required:[true, 'Email Id required']},
    academicDegree: {type:String},
    institution: {type:String},
    city: {type:String },
    state: {type:String, required:[true, 'state is required']},
    statecode: {type:String, required:[true, 'state is required']},
    country: {type:String, required:[true, 'country is required']},
    countrycode: {type:String, required:[true, 'country is required']},
    mobile: {type:Number},
    iscorrespondingauthor: Boolean,
    iscoauthor: Boolean,
  },
  manuscriptId: {
    type: mongoose.Schema.Types.ObjectId,
    trim: true,
    ref: "manuscript",
    required:true
  },
},{timestamps:true});

const Manuallyaddedauthor = mongoose.model(
  "ManuallyAddedAuthor",
  manuallyaddedauthorSchema
);

module.exports = Manuallyaddedauthor;
