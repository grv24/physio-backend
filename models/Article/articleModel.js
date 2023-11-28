const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const articleSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Please Enter Your Content"],
    },
    picture: String,
    topMagazine: {
      type: Boolean,
      default: false,
    },
    articleType: {
      type: String,
      default: "FREE",
      required: [true, "Please specify the article types free or paid!"],
    },
    issue: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "Issue",
    },
  },
  {
    timestamps: true,
  }
);

articleSchema.plugin(uniqueValidator);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
