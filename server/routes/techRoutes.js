const express = require("express");
const router = express.Router();
const techStackController = require("../controllers/techStackController");
const upload = require("../middlewares/upload");

router.get("/:techName", techStackController.getTechByName);
router.get("/", techStackController.getAllTech);
router.post("/", upload.single("icon"), techStackController.createTech);
router.put("/:techName", upload.single("icon"), techStackController.updateTech);
router.patch(
  "/:techName",
  upload.single("icon"),
  techStackController.updateTechPartially
);
router.delete("/:techName", techStackController.deleteTech);

module.exports = router;

// ! REMINDER: Add auth middleware to protect this routes
