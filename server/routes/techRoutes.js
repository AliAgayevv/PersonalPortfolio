const express = require("express");
const router = express.Router();
const techStackController = require("../controllers/techStackController");

router.get("/:techName", techStackController.getTechByName);
router.get("/", techStackController.getAllTech);
// ! REMINDER: Add auth middleware to protect this routes
router.post("/", techStackController.createTech);
router.put("/:techName", techStackController.updateTech);
router.patch("/:techName", techStackController.updateTechPartially);
router.delete("/:techName", techStackController.deleteTech);

module.exports = router;
