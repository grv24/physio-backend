const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const articleFilesSchema = mongoose.Schema(
  {
    files: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

articleFilesSchema.plugin(uniqueValidator);

const articleFiles = mongoose.model("articleFiles", articleFilesSchema);

module.exports = articleFiles;
