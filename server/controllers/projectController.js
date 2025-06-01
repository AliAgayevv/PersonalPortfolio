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
  const language = req.headers["accept-language"] || "az";

  try {
    const projects = await Project.find();
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No projects found" });
    }
    const projectsData = projects.map((project) => ({
      _id: project._id,
      projectId: project.projectId,
      title: project.title,
      description: project.description[language] || {},
      image: project.image,
      techStack: project.techStack || [],
      liveLink: project.liveLink,
      githubLink: project.githubLink,
      timeLine: project.timeLine[language] || {},
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
    image,
    timeLine,
    liveLink,
    githubLink,
  } = req.body;

  try {
    const newProject = new Project({
      projectId: projectId.toLowerCase(),
      title,
      techStack: req.body.techStack || [],
      description,
      timeLine,
      liveLink,
      githubLink,
      image,
    });

    await newProject.save();
    res
      .status(201)
      .json({ message: "Project created successfully", newProject });
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
  const updateFields = req.body;

  try {
    const updatedProject = await Project.findOneAndUpdate(
      { projectId: projectId.toLowerCase() },
      { $set: updateFields },
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
    console.error("Error updating project partially:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
