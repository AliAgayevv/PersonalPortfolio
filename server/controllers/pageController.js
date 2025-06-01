const Page = require("../models/Page");

// [GET] /api/pages/:componentName
exports.getPageByComponent = async (req, res) => {
  const { componentName } = req.params;
  const language = req.headers["accept-language"] || "az";

  try {
    const page = await Page.findOne({ componentName });

    if (!page) {
      return res.status(404).json({ message: "Component not found" });
    }

    // Send just with selected language
    const pageData = {
      _id: page._id,
      componentName: page.componentName,
      photos: page.photos,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
      content: page[language] || {},
    };

    res.status(200).json(pageData);
  } catch (err) {
    console.error("Error fetching page by component:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// [GET] /api/pages
exports.getAllPages = async (req, res) => {
  // Send the pages data based on the requested language
  const language = req.headers["accept-language"] || "az";
  try {
    const pages = await Page.find();
    if (!pages || pages.length === 0) {
      return res.status(404).json({ message: "No components found" });
    }
    const pagesData = pages.map((page) => ({
      _id: page._id,
      componentName: page.componentName,
      photos: page.photos,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
      content: page[language] || {},
    }));
    res.status(200).json(pagesData);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// [POST] /api/pages
exports.createPage = async (req, res) => {
  try {
    const photos = req.files ? req.files.map((file) => file.path) : [];
    const newPage = new Page({
      ...req.body,
      photos, // Save file paths
    });
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
    const photos = req.files ? req.files.map((file) => file.path) : [];

    const updateData = {
      ...req.body,
      ...(photos.length > 0 && { photos }),
    };

    const updated = await Page.findOneAndUpdate(
      { componentName },
      { $set: updateData },
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

// [PATCH] /api/pages/:componentName
exports.updatePagePartial = async (req, res) => {
  const { componentName } = req.params;
  console.log("Partial update request for component:", componentName);

  const updateFields = req.body;

  // Handle uploaded photos
  if (req.files && req.files.length > 0) {
    const photoPaths = req.files.map((file) => `/uploads/${file.filename}`);

    // Merge with existing photos if needed (optional)
    updateFields.photos = photoPaths;
  }

  try {
    const updatedPage = await Page.findOneAndUpdate(
      { componentName },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedPage) {
      return res.status(404).json({ message: "Page not found" });
    }

    res.status(200).json({
      message: "Page updated successfully",
      updatedPage,
    });
  } catch (err) {
    console.error("Error updating Page partially:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
