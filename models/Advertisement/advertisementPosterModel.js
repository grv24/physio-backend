const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const advertisementPosterSchema = mongoose.Schema(
    {

        advertisementPoster: {
           type:String,
           
        },
         
    },
    {
        timestamps: true  
    }
)

advertisementPosterSchema.plugin(uniqueValidator);

const AdvertisementPoster = mongoose.model("AdvertisementPoster", advertisementPosterSchema);

module.exports = AdvertisementPoster;