const catchAsyncError = require("../utils/catchAsyncError");

const verifyBalance = catchAsyncError(async function (req, res, next) {
  const creditReference = req.body.creditReference;

  if (!creditReference) return res.status(400).json({success: false, error:"Credit Reference Required"});

  if ( creditReference > req.user.AccountDetails.AvailableBalance ) {
    return res
      .status(400)
      .json({ success: false, message: "insufficient Funds !! Contact Upline" });
  }

  await next();
});

module.exports = verifyBalance;
