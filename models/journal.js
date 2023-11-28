var mongoose = require("mongoose");

// Basically Publication like Physiotimes

const JournalSchema = new mongoose.Schema({

  AboutUs: {
    JournalTitle: String,
    AboutJournal: String,
    AboutUniversity: String,
    AboutScopeOfJournal: String,
    AboutJournalPublication: String,
  },
  Authors: [
    {
      authorid:{
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: "author",
        default: null,
      },
      manuscripts:[{
          type: mongoose.Schema.Types.ObjectId,
          trim: true,
          ref: "manuscript",
          default: null,
      }],
      _id:false
    },
  ],
  Reviewer: [
    {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "reviewer",
      default: null,
    },
  ],
  Editor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "editor",
      default: null,
    },
  ],
  AssociateEditor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "associateeditor",
      default: null,
    },
  ],
  SubAdmin: [
    {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "subadmin",
      default: null,
    },
  ]
},{timestamps:true});

const Journal = mongoose.model("journal", JournalSchema);

module.exports = Journal;
