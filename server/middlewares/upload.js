const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Uploads klasörünün var olduğundan emin olun
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Uploads directory created at:", uploadDir);
}

const storage = multer.diskStorage({
  // ⚠️ Bu eksikti! Destination eklendi
  destination: function (req, file, cb) {
    console.log("Saving file to:", uploadDir);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const sanitized = path
      .parse(file.originalname)
      .name.replace(/[^a-zA-Z0-9]/g, "");
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = Date.now() + "-" + sanitized + ext;

    console.log("Generated filename:", filename);
    console.log("File fieldname:", file.fieldname);

    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    console.log("Processing file:", file.fieldname, file.mimetype);

    const allowedTypes = [".jpg", ".jpeg", ".png", ".pdf"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(ext)) {
      console.log("File accepted:", file.originalname);
      cb(null, true);
    } else {
      console.log("File rejected:", file.originalname, "Extension:", ext);
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
