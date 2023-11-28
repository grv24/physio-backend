const RefundPolicy = require("../../models/footer/refundPolicyModel");

const refundPolicy = async (req, res) => {
  try {
    const { refundPolicy } = req.body;

    if (!refundPolicy) {
      return res
        .status(400)
        .json({ message: "Please enter your Refund Policy!" });
    }

    const data = await RefundPolicy.create({
        refundPolicy,
    });

    if (data) {
      return res.status(201).json({ message: data });
    } else {
      return res
        .status(400)
        .json({ message: "Something wrong while creating Refund Policy." });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getRefundPolicy = async (req, res) => {
  try {
    const data = await RefundPolicy.findOne();
   
    if (!data) {
      return res.status(404).json({ message: "No data in Refund Policy!" });
    }
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateRefundPolicy = async (req, res) => {
  try {
    const { id } = req.params;

    const { refundPolicy } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Please Enter a Valid ID." });
    }
    if (!refundPolicy) {
      return res.status(400).json({ message: "No data Updated!" });
    }
    const data = await RefundPolicy.findById(id);
    if (!data) {
      return res.status(400).json({ message: "Refund Policy Data not Found With this ID." });
    }

    if (refundPolicy) {
      data.refundPolicy = refundPolicy;
    }

    await data.save();

    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
    refundPolicy,
  getRefundPolicy,
  updateRefundPolicy,
};
