const ReturnPolicy = require("../../models/footer/returnPolicyModel");

const returnPolicy = async (req, res) => {
  try {
    const { returnPolicy } = req.body;

    if (!returnPolicy) {
      return res
        .status(400)
        .json({ message: "Please enter your Return Policy!" });
    }

    const data = await ReturnPolicy.create({
        returnPolicy,
    });

    if (data) {
      return res.status(201).json({ message: data });
    } else {
      return res
        .status(400)
        .json({ message: "Something wrong while creating Return Policy." });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getReturnPolicy = async (req, res) => {
  try {
    const data = await ReturnPolicy.findOne();
    if (!data) {
      return res.status(404).json({ message: "No data in Return Policy!" });
    }
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateReturnPolicy = async (req, res) => {
  try {
    const { id } = req.params;

    const { returnPolicy } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Please Enter a Valid ID." });
    }
    if (!returnPolicy) {
      return res.status(400).json({ message: "No data Updated!" });
    }
    const data = await ReturnPolicy.findById(id);
    if (!data) {
      return res.status(400).json({ message: "Return Policy Data not Found With this ID." });
    }

    if (returnPolicy) {
      data.returnPolicy = returnPolicy;
    }

    await data.save();

    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  returnPolicy,
  getReturnPolicy,
  updateReturnPolicy,
};
