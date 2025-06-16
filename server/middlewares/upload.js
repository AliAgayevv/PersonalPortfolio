const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const sanitized = path
      .parse(file.originalname)
      .name.replace(/[^a-zA-Z0-9]/g, "");
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, Date.now() + "-" + sanitized + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [".jpg", ".jpeg", ".png", ".pdf"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only JPG, JPEG, PNG, and PDF files are allowed."
        ),
        false
      );
    }
  },
});

module.exports = upload;
