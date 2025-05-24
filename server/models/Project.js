const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
  {
    projectId: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    description: {
      az: { type: String, required: true },
      en: { type: String, required: true },
    },
    image: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Project", projectSchema);
