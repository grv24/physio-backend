const catchAsyncError = require("../utils/catchAsyncError");
const expError = require("../utils/expressError");

const verifyPassword = catchAsyncError(async function (req, res, next) {
  const masterPassword = req.body.masterPassword;

  if (!masterPassword) return res.status(400).json({success: false, error:"Master Password Required"});

  if (!req.user) return res.status(401).json({success: false, error:"Please Authenticate"});

  if (!req.user.authenticate(masterPassword)) {
    return res
      .status(400)
      .json({ success: false, error: "Master Pasword Incorrect" });
  }

  next();
});

module.exports = verifyPassword;
