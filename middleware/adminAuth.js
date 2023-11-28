const jwt = require("jsonwebtoken");
const { BaseUser } = require("../models/baseUser");
const catchAsyncError = require("../utils/catchAsyncError");
const expError = require("../utils/expressError");

const AdminAuth = catchAsyncError(async function (req, res, next) {
  var authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({success: false, error:"Authorization Required"});

  var token = authHeader.split(" ")[1];
  const decode = jwt.verify(token, process.env.TOKEN_KEY);
  // if(!decode) return res.json({success:false, error:'Token Is Incorrect'})
  await BaseUser.findOne({
    _id: decode._id,
  })
    .then((res) => {
      if (!res) return res.status(401).json({success: false, error:"Please Authenticate"});

      // if (req.body.role >= res.PersonalDetails.role)
      // return res.status(401).json({success: false, error:"Access Denied"});

      if (res.PersonalDetails.role < 4)
      return res.status(401).json({success: false, error:"You Are Not Admin"});

      req.token = token;
      req.user = res;

      next();
    })
    .catch(function (err) {
      console.log(err);
    });
});

module.exports = AdminAuth;
