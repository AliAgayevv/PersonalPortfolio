const Project = require("../models/Project");

// [GET] /api/project/:projectId
exports.getProjectById = async (req, res) => {
  const { projectId } = req.params;
  const language = req.headers["accept-language"] || "az";

  try {
    const project = await Project.findOne({
      projectId: projectId.toLowerCase(),
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const projectData = {
      _id: project._id,
      title: project.title,
      description: project.description[language] || {},
      image: project.image,
      techStack: project.techStack || [],
      liveLink: project.liveLink,
      githubLink: project.githubLink,
      timeLine: project.timeLine[language] || {},
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
    res.status(200).json(projectData);
  } catch (err) {
    console.error("Error fetching project by name:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// [GET] /api/projects
exports.getAllProjects = async (req, res) => {
  const language = req.headers["accept-language"];

  try {
    const projects = await Project.find();
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No projects found" });
    }
    const projectsData = projects.map((project) => ({
      _id: project._id,
      projectId: project.projectId,
      title: project.title,
      description: project.description[language] || project.description,
      image: project.image,
      techStack: project.techStack || [],
      liveLink: project.liveLink,
      githubLink: project.githubLink,
      timeLine: project.timeLine[language] || project.timeLine,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }));
    res.status(200).json(projectsData);
  } catch (err) {
    console.error("Error fetching all projects:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// [POST] /api/projects
exports.createProject = async (req, res) => {
  const {
    projectId,
    title,
    description,
    timeLine,
    liveLink,
    githubLink,
    techStack: techStackData,
  } = req.body;

  try {
    // Handle main project image
    const image =
      req.files && req.files.find((file) => file.fieldname === "image")
        ? `/uploads/${
            req.files.find((file) => file.fieldname === "image").filename
          }`
        : null;

    // Process tech stack with icons
    const techStack = req.files
      ? processTechStackWithIcons(techStackData, req.files)
      : typeof techStackData === "string"
      ? JSON.parse(techStackData)
      : techStackData;

    const newProject = new Project({
      projectId: projectId.toLowerCase(),
      title,
      techStack,
      description,
      timeLine,
      liveLink,
      githubLink,
      image,
    });

    await newProject.save();
    res.status(201).json({
      message: "Project created successfully",
      newProject,
    });
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// [PUT] /api/projects/:projectId
exports.updateProject = async (req, res) => {
  const { projectId } = req.params;
  const {
    title,
    description,
    image,
    techStack,
    timeLine,
    githubLink,
    liveLink,
  } = req.body;

  try {
    const updatedProject = await Project.findOneAndUpdate(
      { projectId: projectId.toLowerCase() },
      { title, description, image, techStack, timeLine, githubLink, liveLink },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project updated successfully",
      updatedProject,
    });
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// [DELETE] /api/projects/:projectId
exports.deleteProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const deletedProject = await Project.findOneAndDelete({
      projectId: projectId.toLowerCase(),
    });

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project deleted successfully",
      deletedProject,
    });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// [PATCH] /api/projects/:projectId
exports.updateProjectPartial = async (req, res) => {
  const { projectId } = req.params;
  const updateFields = { ...req.body };

  try {
    console.log("=== PATCH DEBUG START ===");
    console.log("Project ID:", projectId);
    console.log("Request Files:", req.files);
    console.log("Request Body:", req.body);
    console.log("Update Fields Initial:", updateFields);

    // Handle main project image
    if (req.files && req.files.length > 0) {
      const imageFile = req.files.find((file) => file.fieldname === "image");
      if (imageFile) {
        updateFields.image = `/uploads/${imageFile.filename}`;
        console.log("New image URL:", updateFields.image);
      }
    }

    // Handle tech stack with icons
    if (updateFields.techStack) {
      console.log("Tech Stack Before Processing:", updateFields.techStack);

      if (req.files && req.files.length > 0) {
        console.log("Processing with files...");
        updateFields.techStack = processTechStackWithIcons(
          updateFields.techStack,
          req.files
        );
        console.log("Tech Stack After Processing:", updateFields.techStack);
      } else if (typeof updateFields.techStack === "string") {
        try {
          updateFields.techStack = JSON.parse(updateFields.techStack);
          console.log("Tech Stack After JSON Parse:", updateFields.techStack);
        } catch (parseError) {
          console.error("Error parsing techStack:", parseError);
          return res.status(400).json({
            message: "Invalid techStack format",
            error: parseError.message,
          });
        }
      }
    }

    console.log("Final Update Fields:", JSON.stringify(updateFields, null, 2));

    const updatedProject = await Project.findOneAndUpdate(
      { projectId: projectId.toLowerCase() },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    console.log("Updated Project Tech Stack:", updatedProject.techStack);
    console.log("=== PATCH DEBUG END ===");

    res.status(200).json({
      message: "Project updated successfully",
      updatedProject,
    });
  } catch (err) {
    console.error("Error updating project partially:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

// Improved helper function with better error handling
const processTechStackWithIcons = (techStackData, files) => {
  let techStack = [];

  try {
    console.log("=== PROCESSING TECH STACK ===");
    console.log("Tech stack data:", techStackData);
    console.log(
      "Available files:",
      files.map((f) => ({
        fieldname: f.fieldname,
        filename: f.filename,
        originalname: f.originalname,
      }))
    );

    // Parse techStack if it's a string
    const parsedTechStack =
      typeof techStackData === "string"
        ? JSON.parse(techStackData)
        : techStackData;

    if (Array.isArray(parsedTechStack)) {
      techStack = parsedTechStack.map((tech, index) => {
        const techStackIcon = files.find(
          (file) =>
            file.fieldname === `techStackIcon_${index}` ||
            file.fieldname === `techStackIcon[${index}]` ||
            file.fieldname === `techStack[${index}][icon]`
        );

        const result = {
          name: tech.name,
          icon: `/uploads/${techStackIcon.filename}`,
        };

        console.log(`Tech ${index} (${tech.name}):`, result);
        return result;
      });
    }

    console.log("Final tech stack:", techStack);
    return techStack;
  } catch (error) {
    console.error("Error processing tech stack:", error);
    throw new Error(`Tech stack processing failed: ${error.message}`);
  }
};
// Compare this snippet from server/server.js:
