const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    blogId: { type: String, required: true, unique: true },
    blogTitle: {
      az: { type: String, required: true },
      en: { type: String, required: true },
    },
    blogDescription: {
      az: { type: String, required: true },
      en: { type: String, required: true },
    },
    blogContent: {
      az: { type: String, required: true },
      en: { type: String, required: true },
    },
    blogCreatedTime: {
      az: { type: String, required: true },
      en: { type: String, required: true },
    },
    images: [{ type: String, required: false }],
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
