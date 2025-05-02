const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

router.get("/:componentName", pageController.getPageByComponent);
// ! REMINDER: Add auth middleware to protect this routes
router.post("/", pageController.createPage);
router.put("/:componentName", pageController.updatePage);
router.delete("/:componentName", pageController.deletePage);

module.exports = router;
