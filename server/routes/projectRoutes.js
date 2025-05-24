const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.get("/:projectId", projectController.getProjectById);
router.get("/", projectController.getAllProjects);
router.post("/", projectController.createProject);
router.put("/:projectId", projectController.updateProject);
router.delete("/:projectId", projectController.deleteProject);
router.patch("/:projectId", projectController.updateProjectPartial);

module.exports = router;
