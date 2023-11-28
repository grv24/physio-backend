const asyncHandler = require("express-async-handler");
const Advertisment = require("../../models/advertismentModel");
const Subscription= require("../../models/subscriptionModel");

const postData = async (req, res) => {
  try {
    const { title, data, articleType } = req.body;

    console.log(title, data);
    if (!title || !data) {
      res.status(400).json({ message: "Enter all required fields" });
    }
    let files = [];
    req.files.forEach((file) => {
      let path = file.path ? file.path : null;
      files.push(path);
    });
    // console.log(files)

    const datas = await Article.create({
      title,
      data,
      files: files,
      articleType
    });

    if (datas) {
      res.status(201).json({
        data: datas,
      });
    } else {
     return res.status(400).json({ message: "Data not Created!" });
    }
  } catch (error) {
  return  res.status(400).json({ message: error.message });
  }
};
const getAllDataForFree = async (req, res, message) => {
  try {
    const files = await Article.find({ articleType: "FREE" });
    if (files) {
      return res.status(200).json({ files: files, message: message });
    } else {
     return res.status(400).json({ message: "Their is no free Articles!" });
    }
  } catch (error) {
    console.log(error);
  return  res.status(400).json({ message: error.message });
  }
};
const getAllDataForPaid = async (req, res) => {
  try {
    const subscription = await Subscription.find({ user: req.user.id });

    if (!subscription) {
      return await getAllDataForFree(
        req,
        res,
        "Your have not subscribed yet !! PLease subscribe"
      );
    }
    if (
      subscription.status == "active" &&
      subscription.expiryDate < Date.now()
    ) {
      return await getAllDataForFree(
        req,
        res,
        "Your Subscription had been expired"
      );
    }
    if (
      subscription.status == "active" &&
      subscription.expiryDate > Date.now()
    ) {
      const files = await Article.find();
      if (files) {
        return res.status(200).json(files);
      } else {
       return res.status(400).json({ message: "" });
      }
    }
  } catch (error) {
   return res.status(400).json({ message: error });
  }
};

const getDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const files = await Article.findById(id);
    if (files) {
      return res.status(200).json(files);
    } else {
     return res.status(400).json({ message: "Something Wrong!" });
    }
  } catch (error) {
   return res.status(400).json({ message: error });
  }
};

module.exports = {
  postData,
  getDataById,
  getAllDataForFree,
  getAllDataForPaid,
};
