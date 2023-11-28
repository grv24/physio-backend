const mongoose = require("mongoose");

const submittedmanuscriptSchema = mongoose.Schema({
    id:Number,
    submissionName:String,
    currentYear:String,
    manuscriptid: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: "manuscript",
        required:true
    },
    authorid: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: "author",
        required:true
    },
    journalid: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: "journal",
        required:true
    },
    status:String,
    activities:[
        {
            _id:false,
            activity:"",
            activityDate:String
        }
    ],
    currentlyHandling:String,
    assignTo:String

}, { timestamps:true })

const SubmittedManuscript = mongoose.model("submittedmanuscript", submittedmanuscriptSchema);

module.exports = SubmittedManuscript;