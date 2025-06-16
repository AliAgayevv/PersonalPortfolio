const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const upload = require("../middlewares/upload");

// GETs remain unchanged
router.get("/:componentName", pageController.getPageByComponent);
router.get("/", pageController.getAllPages);
router.post("/", upload.array("photos", 10), pageController.createPage);
router.put("/:componentName", pageController.updatePage);
router.patch(
  "/:componentName",
  upload.array("photos", 10),
  pageController.updatePagePartial
);

router.delete("/:componentName", pageController.deletePage);

module.exports = router;
