const TechStack = require("../models/TechStack");

// [GET] /api/tech/:techName
exports.getTechByName = async (req, res) => {
  let { techName } = req.params;
  const language = req.headers["accept-language"] || "az";

  // Convert techName to lowercase

  try {
    const findedTech = await TechStack.findOne({ techName });
    if (!findedTech) {
      return res.status(404).json({ message: "Tech not found" });
    }

    const techData = {
      _id: findedTech._id,
      techName: findedTech.techName,
      icon: findedTech.icon,
      createdAt: findedTech.createdAt,
      updatedAt: findedTech.updatedAt,
      description: findedTech.description[language] || {},
    };

    res.status(200).json(techData);
  } catch (err) {
    console.error("Error fetching tech by name:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// [GET] /api/tech
exports.getAllTech = async (req, res) => {
  const language = req.headers["accept-language"] || "az";

  try {
    const techs = await TechStack.find();
    if (!techs || techs.length === 0) {
      return res.status(404).json({ message: "No tech stacks found" });
    }

    const techsData = techs.map((tech) => ({
      _id: tech._id,
      techName: tech.techName,
      icon: tech.icon,
      createdAt: tech.createdAt,
      updatedAt: tech.updatedAt,
      description: tech.description[language] || {},
    }));

    res.status(200).json(techsData);
  } catch (err) {
    console.error("Error fetching all tech stacks:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// [POST] /api/tech
exports.createTech = async (req, res) => {
  let { techName, description } = req.body;

  // Handle uploaded icon file
  const icon = req.file ? `/uploads/${req.file.filename}` : "";

  try {
    const newTech = new TechStack({
      techName,
      icon,
      description,
    });

    await newTech.save();
    res.status(201).json({
      message: "Tech stack created successfully",
      newTech,
    });
  } catch (err) {
    console.error("Error creating tech stack:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// [PUT] /api/tech/:techName
exports.updateTech = async (req, res) => {
  let { techName } = req.params;
  const { description } = req.body;

  // Convert techName to lowercase
  techName = techName.toLowerCase();

  try {
    const updateFields = { description };

    // Handle uploaded icon file
    if (req.file) {
      updateFields.icon = `/uploads/${req.file.filename}`;
    }

    const updatedTech = await TechStack.findOneAndUpdate(
      { techName },
      updateFields,
      { new: true }
    );

    if (!updatedTech) {
      return res.status(404).json({ message: "Tech not found" });
    }

    res.status(200).json({
      message: "Tech stack updated successfully",
      updatedTech,
    });
  } catch (err) {
    console.error("Error updating tech stack:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// [PATCH] /api/tech/:techName
exports.updateTechPartially = async (req, res) => {
  let { techName } = req.params;
  const updateFields = req.body;

  // Convert techName to lowercase

  try {
    // Handle uploaded icon file
    if (req.file) {
      updateFields.icon = `/uploads/${req.file.filename}`;
    }

    const updatedTech = await TechStack.findOneAndUpdate(
      { techName },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedTech) {
      return res.status(404).json({ message: "Tech not found" });
    }

    res.status(200).json({
      message: "Tech stack updated successfully",
      updatedTech,
    });
  } catch (err) {
    console.error("Error updating tech stack partially:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// [DELETE] /api/tech/:techName
exports.deleteTech = async (req, res) => {
  let { techName } = req.params;

  // Convert techName to lowercase

  try {
    const deletedTech = await TechStack.findOneAndDelete({ techName });

    if (!deletedTech) {
      return res.status(404).json({ message: "Tech not found" });
    }

    res.status(200).json({
      message: "Tech deleted successfully",
      deletedTech,
    });
  } catch (err) {
    console.error("Error deleting tech stack:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
