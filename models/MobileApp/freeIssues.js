const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const freeIssuesSchema = mongoose.Schema({

    freeIssues: {
        type: String
    },
   

})

freeIssuesSchema.plugin(uniqueValidator);

const FreeIssues = mongoose.model("FreeIssues", freeIssuesSchema);

module.exports = FreeIssues;