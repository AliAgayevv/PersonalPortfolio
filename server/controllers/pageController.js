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

exports.updatePagePartial = async (req, res) => {
  const { componentName } = req.params;

  try {
    const existingPage = await Page.findOne({ componentName });

    if (!existingPage) {
      return res.status(404).json({ message: "Page not found" });
    }

    const updateFields = req.body;

    // 1. FOTOLAR (əlavə edirsə)
    if (req.files && req.files.length > 0) {
      const newPhotos = req.files.map((file) => `/uploads/${file.filename}`);
      existingPage.photos = [...(existingPage.photos || []), ...newPhotos];
    }

    // 2. MULTILANGUAGE sahələr üçün merge
    ["az", "en"].forEach((lang) => {
      if (updateFields[lang]) {
        Object.entries(updateFields[lang]).forEach(([key, value]) => {
          existingPage[lang].set(key, value);
        });
      }
    });

    // 3. Qalan sahələr (əgər photos-dan və multilingual-dan başqa sahə varsa)
    const { az, en, photos, ...otherFields } = updateFields;
    Object.entries(otherFields).forEach(([key, value]) => {
      existingPage[key] = value;
    });

    const updatedPage = await existingPage.save();

    res.status(200).json({
      message: "Page updated successfully",
      updatedPage,
    });
  } catch (err) {
    console.error("Error in partial update:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
