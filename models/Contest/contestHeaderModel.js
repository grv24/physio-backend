const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const headerTextSchema = mongoose.Schema({

    title: {
        type: String
    },
    subTitle: {
        type: String
    }

})

headerTextSchema.plugin(uniqueValidator);

const ContestHeaderText = mongoose.model("ContestHeaderText", headerTextSchema);

module.exports = ContestHeaderText;