const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `uploads/download/`);
  },
  filename: (req, file, cb) => {
    console.log(file);
    //   const ext = file.mimetype.split("/")[1];
    //   cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    // console.log("fieldname " + file.fieldname)
    // console.log("Original name " + file.originalname);
    //let ext = path.extname(file.originalname) // path.extname() return the extension of file ex: - krishna.pdf then  ".pdf" return
    //let ext = path(file.originalname)
    let ext = file.originalname;

    //  console.log("in upload file "+ext);
    cb(null, Date.now() + "-" + ext);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (file.fieldname === "pdf") {
      if (file.mimetype == "application/pdf") {
        callback(null, true);
      } else {
        callback(null, false);
      }
    } else {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
        callback(null, true);
      } else {
        callback(null, false);
      }
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
});

module.exports = upload;
