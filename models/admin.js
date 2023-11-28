var mongoose = require("mongoose");
const { BaseUser } = require("./baseUser");

const Admin = new mongoose.Schema({

  Address:{
    completeAddress:{type:String, required:true},
    country:{type:String, required:true},
    state:{type:String, required:true},
    city:{type:String, required:true},
    zip:{type:String, required:true},
    phone:String,
    mobile:{type:String, required:true}
  }
});

const AdminModel = BaseUser.discriminator("admin", Admin);
module.exports = { AdminModel };
