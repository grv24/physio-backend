var mongoose = require("mongoose");
const { BaseUser } = require("./baseUser");

const Author = new mongoose.Schema({

  Address:{
    completeAddress:{type:String, required:true},
    country:{type:String, required:true},
    countrycode:{type:String, required:true},
    state:{type:String, required:true},
    statecode:{type:String, required:true},
    city:{type:String},
    zip:{type:String, required:true},
    phone:String,
    mobile:{type:String, required:true}
  },
  AuthorInformation:{
    academicDegree:String,
    institution:String,
    department:String,
    position:String
  },
});

const AuthorModel = BaseUser.discriminator("author", Author);
module.exports = { AuthorModel };
