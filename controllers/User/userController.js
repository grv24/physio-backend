const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../../models/User/userModel");
const Subscription = require("../../models/Subscription/subscriptionModel");
const sendVerificationEmail = require("../Email/emailVarification1");
const fs = require("fs");

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { fname, lname, email, password, mobile } = req.body;

    if (!fname || !lname || !email || !password || !mobile) {
      return res
        .status(400)
        .json({ message: "Please Enter all the Required fields" });
    }
    if (!(password.length >= 8)) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 character" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      if (userExists.isVerified === true) {
        return res.status(400).json({ message: "User already exists" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        userExists.fname = fname;
        userExists.lname = lname;
        userExists.mobile = mobile;
        userExists.password = hashedPassword;
        await userExists.save();
        // let userProfilePic = await ProfilePic.findOne({ user: userExists._id });
        let token = generateToken(userExists._id);
        let newData = {
          _id: userExists.id,
          fname: userExists.fname,
          lname: userExists.lname,
          email: userExists.email,
          mobile: userExists.mobile,
          role: userExists.role,
          isVerified: userExists.isVerified,
          profilePic: userExists.profilePic,
          token: token,
        };
        await sendVerificationEmail(token, email);
        return res.status(201).json(newData);
      }
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      fname,
      lname,
      email,
      mobile,
      password: hashedPassword,
    });

    if (user) {
      let token = generateToken(user._id);

      await sendVerificationEmail(token, email);

      return res.status(201).json({
        _id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        mobile: user.mobile,
        isVerified: user.isVerified,
        profilePic: user.profilePic,
        token: token,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Something wrong while user Account!" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let expiry = decoded.exp;

    // Searching for a user with the given verification code

    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User with this verification code not found!" });
    }

    // Mark the user's account as verified
    let today = Date.now().toString().slice(0, 10) * 1;
    let diffDate = today < expiry;

    if (user.isVerified == false && diffDate) {
      user.isVerified = true;
      await user.save();
      return res.status(200).json({ message: "User Verified" });
    } else if (user.isVerified == true && diffDate) {
      return res.status(400).json({ message: "User Already Verified!" });
    } else {
      return res
        .status(401)
        .json({ message: "Verification Link has Expired!" });
    }

    // Redirect the user to a page that confirms their email address has been verified
    // res.redirect('/email-verified');
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const loginUser = asyncHandler(async (req, res) => {
  try {
    // const { password } = req.body;

    let user;
    let password;
    user = req.user;
    password = req.password;
    req.token = generateToken(user._id);
    // console.log(req.subscription);
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({
        _id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        isVerified: user.isVerified,
        profilePic: user.profilePic,
        token: generateToken(user._id),
        subscription:
          req.subscription == null || undefined ? "" : req.subscription,
      });
    } else {
      return res.status(400).json({ message: "Passwords do not match!" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

const getUserById = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User Not Logged In!" });
    }
    const userData = await User.findOne({ _id: req.user._id });
    if (!userData) {
      return res.status(404).json({ message: "User Data Not Found!" });
    }
    //const profilePic = await ProfilePic.findOne({ user: userData._id });

    return res.status(200).json({
      _id: userData.id,
      fname: userData.fname,
      lname: userData.lname,
      email: userData.email,
      mobile: userData.mobile,
      role: userData.role,
      isVerified: userData.isVerified,
      profilePic: userData.profilePic,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { password, lname, fname, mobile } = req.body;
    if (!req.user) {
      return res.status(400).json({ message: "User not Logged In!" });
    }
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    var updatedUser;

    if (password && password != "") {
      if (!(password.length >= 8)) {
        return res
          .status(400)
          .json({ message: "Password must be at least 8 character" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updatedUser = {
        fname: fname ? fname : user.fname,
        lname: lname ? lname : user.lname,
        mobile: mobile ? mobile : user.mobile,
        password: hashedPassword,
        token: generateToken(user._id),
      };
    } else {
      updatedUser = {
        fname: fname ? fname : user.fname,
        lname: lname ? lname : user.lname,
        mobile: mobile ? mobile : user.mobile,
        token: generateToken(user._id),
      };
    }

    const updateUser = await User.findByIdAndUpdate(req.user._id, updatedUser, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json(updateUser);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// delete Account function give functionality to user to delete his/her account

const deleteAccount = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User not Logged In!" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const userId = user._id;
    // console.log(user._id);
    // const datas = await Books.find({ user: req.user.id });
    // for (let i = 0; i < datas.length; i++) {
    //   let newId = datas[i].id;
    //   await Books.findByIdAndDelete(newId);
    // }
    await User.findByIdAndDelete(userId);
    return res.status(202).json({ id: userId });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
const forgotPassword = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;

    if ((!email && !mobile) || !password) {
      return res
        .status(400)
        .json({ status: "Please enter a valid email or Phonenumber" });
    }

    const user = await User.findOne({
      $or: [{ email: email }, { mobile: mobile }],
    });

    if (!user) {
      return res.status(400).json({
        message: "No user found with these credentials!",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      message: "Password updated successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const updateProfilePic = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User not logged In!" });
    }
    let file = req.file;
    if (!file) {
      return res.status(400).json({ message: "You have not send any file" });
    }

    const updateProfile = await User.findOne({ _id: req.user._id });

    let pic = updateProfile.profilePic;

    if (file) {
      if (pic) {
        fs.unlink(pic, (err, pic) => {
          if (err) return;
          return;
        });
      }
    }
    updateProfile.profilePic = req.file.path;

    await updateProfile.save();
    // if we not use await keyword then value will be updated but event loop will go to next line
    // and  get profile picture fisrt and gives previous stored value. always use await keyword.

    return res.status(200).json({ message: updateProfile });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

module.exports = {
  registerUser,
  verifyEmail,
  loginUser,
  getUserById,
  updateUser,
  deleteAccount,
  forgotPassword,
  updateProfilePic,
};
