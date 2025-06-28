const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const upload = require("../middlewares/upload");

// Create multer instance for multiple files
const uploadMultiple = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "techStackIcon_0", maxCount: 1 },
  { name: "techStackIcon_1", maxCount: 1 },
  { name: "techStackIcon_2", maxCount: 1 },
  { name: "techStackIcon_3", maxCount: 1 },
  { name: "techStackIcon_4", maxCount: 1 },
  // Add more as needed based on your max tech stack size
]);

// Alternative approach using array upload for tech stack icons
const uploadFlexible = upload.any(); // This accepts any field names

router.get("/:projectId", projectController.getProjectById);
router.get("/", projectController.getAllProjects);
router.post("/", uploadFlexible, projectController.createProject);
router.put("/:projectId", projectController.updateProject);
router.delete("/:projectId", projectController.deleteProject);
// projectRoutes.js'de
router.patch(
  "/:projectId",
  (req, res, next) => {
    console.log("🔄 PATCH route hit for:", req.params.projectId);
    console.log("🔄 Content-Type:", req.headers["content-type"]);
    next();
  },
  uploadFlexible,
  (req, res, next) => {
    console.log("🔄 After multer - Files:", req.files?.length || 0);
    if (req.files) {
      req.files.forEach((file) => {
        console.log("📁 File processed:", {
          fieldname: file.fieldname,
          filename: file.filename,
          size: file.size,
          path: file.path,
        });
      });
    }
    next();
  },
  projectController.updateProjectPartial
);

module.exports = router;
