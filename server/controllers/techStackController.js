const TechStack = require("../models/TechStack");

// [GET] /api/tech/:techName
exports.getTechByName = async (req, res) => {
  const { techName } = req.params;
  const language = req.headers["accept-language"] || "az";
  // Convert techName to lowercase
  techName.toLowerCase();
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
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// [POST] /api/tech
exports.createTech = async (req, res) => {
  const { techName, icon, title, description } = req.body;

  techName.toLowerCase();
  try {
    const newTech = new TechStack({
      techName,
      icon,
      title,
      description,
    });
    await newTech.save();
    res.status(201).json(newTech);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// [PUT] /api/tech/:techName
exports.updateTech = async (req, res) => {
  const { techName } = req.params;
  const { icon, title, description } = req.body;
  try {
    const updatedTech = await TechStack.findOneAndUpdate(
      { techName },
      { icon, title, description },
      { new: true }
    );
    if (!updatedTech) {
      return res.status(404).json({ message: "Tech not found" });
    }
    res.status(200).json(updatedTech);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// [PATCH] /api/tech/:techName
exports.updateTechPartially = async (req, res) => {
  const { techName } = req.params;
  const { icon, title, description } = req.body;
  try {
    const updatedTech = await TechStack.findOneAndUpdate(
      { techName },
      { icon, title, description },
      { new: true }
    );
    if (!updatedTech) {
      return res.status(404).json({ message: "Tech not found" });
    }
    res.status(200).json(updatedTech);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// [DELETE] /api/tech/:techName
exports.deleteTech = async (req, res) => {
  const { techName } = req.params;
  try {
    const deletedTech = await TechStack.findOneAndDelete({ techName });
    if (!deletedTech) {
      return res.status(404).json({ message: "Tech not found" });
    }
    res.status(200).json({ message: "Tech deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
