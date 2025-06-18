const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// Create multer instance for multiple files

// Alternative approach using array upload for tech stack icons

router.get("/", contactController.getContactInfo);
router.post("/", contactController.sendContactForm);
router.get("/:contactId", contactController.getContactById);
router.delete("/:contactId", contactController.deleteContactById);

module.exports = router;
