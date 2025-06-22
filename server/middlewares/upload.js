const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Uploads klasörünün var olduğundan emin olun
const uploadDir = path.join(__dirname, "../uploads");

console.log("Multer upload directory:", uploadDir);
console.log("Upload directory exists:", fs.existsSync(uploadDir));

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("✅ Created uploads directory");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("🔄 Multer destination called for:", file.fieldname);
    console.log("🔄 Saving to:", uploadDir);

    // Directory'nin yazılabilir olduğunu kontrol et
    try {
      fs.accessSync(uploadDir, fs.constants.W_OK);
      console.log("✅ Directory is writable");
    } catch (err) {
      console.log("❌ Directory is not writable:", err.message);
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    console.log("🔄 Generating filename for:", file.originalname);

    const sanitized = path
      .parse(file.originalname)
      .name.replace(/[^a-zA-Z0-9]/g, "");
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = Date.now() + "-" + sanitized + ext;

    console.log("✅ Generated filename:", filename);
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    fieldSize: 2 * 1024 * 1024, // 2MB for text fields
  },
  fileFilter: (req, file, cb) => {
    console.log("🔄 File filter checking:", {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
    });

    const allowedTypes = [".jpg", ".jpeg", ".png", ".pdf"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(ext)) {
      console.log("✅ File accepted:", file.originalname);
      cb(null, true);
    } else {
      console.log("❌ File rejected:", file.originalname, "Extension:", ext);
      cb(
        new Error(
          `Invalid file type: ${ext}. Only JPG, JPEG, PNG, and PDF files are allowed.`
        ),
        false
      );
    }
  },
  onError: function (err, next) {
    console.log("❌ Multer error:", err);
    next(err);
  },
});

// Error handling middleware ekleyin
upload.errorHandler = (err, req, res, next) => {
  console.log("❌ Upload error handler:", err.message);
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File too large" });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ message: "Unexpected field" });
    }
  }
  next(err);
};

module.exports = upload;
