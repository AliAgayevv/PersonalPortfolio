const mongoose = require("mongoose");

const multilingualFieldSchema = new mongoose.Schema(
  {
    az: { type: String, required: true },
    en: { type: String, required: true },
  },
  { _id: false }
);

const pageSchema = new mongoose.Schema(
  {
    // This mean content is a map of multilingual fields
    // where each key is a string and the value is a multilingualFieldSchema
    // For example, content: { title: { az: "Başlıq", en: "Title" } }
    // This allows you to have multiple multilingual fields in the content
    // object, each with its own key.
    // The componentName is a unique identifier for the page
    // and is required to be unique in the database.

    componentName: { type: String, required: true, unique: true },
    // Not required
    photos: {
      type: [String],
      default: [],
      required: false,
    },
    az: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: true,
    },
    en: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Page", pageSchema);
