const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
  {
    projectId: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    description: {
      az: { type: String, required: true },
      en: { type: String, required: true },
    },
    liveLink: { type: String, required: false },
    githubLink: { type: String, required: false },
    timeLine: {
      az: { type: String, required: true },
      en: { type: String, required: true },
    },
    techStack: {
      type: [
        {
          name: { type: String, required: true },
          icon: { type: String, required: true },
        },
      ],
    },
    image: { type: String, required: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Project", projectSchema);
