const Page = require("../models/Page");

// [GET] /api/pages/:componentName
exports.getPageByComponent = async (req, res) => {
  const { componentName } = req.params;
  try {
    const page = await Page.findOne({ componentName });
    if (!page) {
      return res.status(404).json({ message: "Component not found" });
    }
    res.status(200).json(page);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// [GET] /api/pages
exports.getAllPages = async (req, res) => {
  try {
    const pages = await Page.find();
    res.status(200).json(pages);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// [POST] /api/pages
exports.createPage = async (req, res) => {
  try {
    const newPage = new Page(req.body);
    await newPage.save();
    res.status(201).json(newPage);
  } catch (err) {
    res.status(400).json({ message: "Validation error", error: err.message });
  }
};

// [PUT] /api/pages/:componentName
exports.updatePage = async (req, res) => {
  const { componentName } = req.params;
  try {
    const updated = await Page.findOneAndUpdate(
      { componentName },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Component not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};

// [DELETE] /api/pages/:componentName
exports.deletePage = async (req, res) => {
  const { componentName } = req.params;
  try {
    const deleted = await Page.findOneAndDelete({ componentName });
    if (!deleted) {
      return res.status(404).json({ message: "Component not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
