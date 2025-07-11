const mongoose = require("mongoose");
const techStackSchema = new mongoose.Schema(
  {
    techName: { type: String, required: true, unique: true },
    icon: { type: String, required: false },
    description: {
      az: { type: String, required: true },
      en: { type: String, required: true },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("TechStacks", techStackSchema);
