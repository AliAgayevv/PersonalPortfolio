// routes/cv.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const router = express.Router();

// Everytime save the CV file as "cv.pdf" in the "uploads" directory.
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, "cv.pdf"),
});

// If the file already exists, we will not allow to upload a new one. (409 Conflict)
const uploadForCreate = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const targetPath = path.join(__dirname, "../uploads", "cv.pdf");
    if (fs.existsSync(targetPath)) {
      // If the file already exists, we reject the upload
      return cb(new multer.MulterError("LIMIT_FILE_EXISTS"));
    }
    cb(null, true);
  },
});

// PUT requests will overwrite the existing file.
const uploadForUpdate = multer({ storage });

router.get("/cv", (req, res) => {
  const filePath = path.join(__dirname, "../uploads", "cv.pdf");

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("CV file not found");
  }

  res.download(filePath, "cv.pdf", (err) => {
    if (err) {
      console.error("CV download error:", err);
      res.status(500).send("Error downloading CV");
    }
  });
});

// ─── POST /api/cv ────────────────────────────────────────────────────────────────
// IF exists, it will not allow to upload a new one. (409 Conflict)
// Else, it will create a new CV file on the uploads directory as "cv.pdf".
router.post("/cv", uploadForCreate.single("cv"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "No CV file uploaded or already exists." });
  }

  return res
    .status(201)
    .json({ message: "CV created successfully", filePath: req.file.path });
});

router.put("/cv", uploadForUpdate.single("cv"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No CV file uploaded" });
  }

  return res
    .status(200)
    .json({ message: "CV updated successfully", filePath: req.file.path });
});

module.exports = router;
