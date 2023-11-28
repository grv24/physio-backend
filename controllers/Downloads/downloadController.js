const Download = require("../../models/Download/downloadModel");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const util = require('util');
const path = require("path");
const stat = util.promisify(fs.stat);

const uploadFile =asyncHandler( async (req, res) => {
  try {
    const { bookname, downloadType } = req.body;
    if (!bookname) {
      return res.status(400).json({ message: "Please Enter required fields!" });
    }
   let fileType = downloadType;
   if(!fileType){
    fileType="PAID"
   }else{
    fileType="FREE"
   }
    let file = new Download({
      author: req.user.id,
      bookname: bookname,
      downloadType: fileType
    });

    if (req.files.img) {
      file.coverImg = req.files.img[0].path;
    }
    if (req.files.pdf) {
      file.pdffile = req.files.pdf[0].path;
    }

    if (req.file) {
      return res
        .status(400)
        .json({ message: "Please Enter Cover Image and PDF file" });
    }

    file.save();

    return res.status(200).json({ message: file });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
const getFile = async (req, res) => {
  try {
    const { id } = req.params;
    const files = await Download.findById(id);
    return res.status(200).json(files);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getAllFiles = async (req, res) => {
  try {
    const files = await Download.find();
    const filesWithSize = await Promise.all(files.map(async (file) => {
      const filePath = path.join(__dirname, '..', '..', file.pdffile);
      const fileStats = await stat(filePath);
      return {
        _id: file._id,
        bookname:file.bookname,
        coverImg:file.coverImg,
        pdffile: file.pdffile,
        size: fileStats.size,
        createdAt:file.createdAt,
        updatedAt:file.updatedAt
      };
    }));
    return res.status(200).json(filesWithSize);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateFileById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const {bookname, downloadType} =req.body;
    let img ;
    let pdf ;
    if(req.file){
      img = req.file.img;
       pdf = req.file.pdf;
    }
    
    console.log(req.body);
    if (!img && !pdf && !bookname && !downloadType) {
      return res
        .status(400)
        .json({ message: "No Data Changed." });
    }
    const data = await Download.findById(id);
    if (img) {
      fs.unlink(data.coverImg, (err) => {
        if (err) {
          return res.status(400).json({ message: err });
        }
      });
      data.coverImg = img;
    }
    if (pdf) {
      fs.unlink(data.pdffile, (err) => {
        if (err) {
          return res.status(400).json({ message: err });
        }
      });
      data.pdffile = pdf;
    }
    if(bookname){
      data.bookname = bookname;
    }

    if(downloadType){
      data.downloadType =downloadType;
    }
    await data.save();
    return res.status(200).json({ message: "Data updated successfully." });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
const deleteFile = async (req, res) => {
  // try {
  // } catch (error) {
  // }
};

module.exports = {
  uploadFile,
  getFile,
  getAllFiles,
  updateFileById,
  deleteFile,
};
