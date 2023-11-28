const jwt = require("jsonwebtoken");
const { BaseUser } = require("../models/baseUser");
const catchAsyncError = require("../utils/catchAsyncError");

const UserAuth = catchAsyncError(async function (req, res, next) {
  var authHeader = req.headers.authorization;
  if (!authHeader)
    return res
      .status(401)
      .json({ success: false, error: "Authorization Required" });

  var token = authHeader.split(" ")[1];
  const decode = jwt.verify(token, process.env.TOKEN_KEY);
  // if(!decode) return res.json({swuccess:false, error:'Token Is Incorrect'})
  await BaseUser.findOne({
    _id: decode._id,
  }).then((data) => {
    if (!data || null)
      return res
        .status(401)
        .json({ success: false, error: "Please Authenticate" });
    req.token = token;
    req.user = data;
    next();
  });
});

module.exports = UserAuth;
