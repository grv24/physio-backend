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

const HeaderText = mongoose.model("HeaderText", headerTextSchema);

module.exports = HeaderText;