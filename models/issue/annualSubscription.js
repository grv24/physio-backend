const moment = require("moment/moment");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const annualSubscriptionSchema = mongoose.Schema({

    defaultPicture:String,
    issuePicture:[],
    description:String,
    volNumber:Number,
    category:[
        {categoryType:String, categoryPrice:Number}
    ],
    price:Number,
    pdfFile:String
})

annualSubscriptionSchema.plugin(uniqueValidator);

const AnnualSubscription = mongoose.model("AnnualSubscription", annualSubscriptionSchema);

module.exports = AnnualSubscription;