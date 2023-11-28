const Faqs = require("../../models/footer/faqsModel");

const createFaqs = async (req, res) => {
  try {
    const { faqs } = req.body;

    if (!faqs) {
      return res
        .status(400)
        .json({ message: "Please enter your FAQS!" });
    }

    const data = await Faqs.create({
        faqs,
    });

    if (data) {
      return res.status(201).json({ message: data });
    } else {
      return res
        .status(400)
        .json({ message: "Something wrong while creating FAQS." });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getFaqs = async (req, res) => {
  try {
    const data = await Faqs.findOne();
    if (!data) {
      return res.status(404).json({ message: "No data in Faqs!" });
    }
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateFaqs = async (req, res) => {
  try {
    const { id } = req.params;

    const { faqs } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Please Enter a Valid ID." });
    }
    if (!faqs) {
      return res.status(400).json({ message: "No data Updated!" });
    }
    const data = await Faqs.findById(id);
    if (!data) {
      return res.status(400).json({ message: "FAQS Data not Found With this ID." });
    }

    if (faqs) {
      data.faqs = faqs;
    }

    await data.save();

    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
    createFaqs,
  getFaqs,
  updateFaqs,
};
