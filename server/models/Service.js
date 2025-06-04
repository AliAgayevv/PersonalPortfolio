const mongoose = require("mongoose");
const serviceSchema = new mongoose.Schema(
  {
    serviceName: { type: String, required: true, unique: true },
    title: {
      az: { type: String, required: true },
      en: { type: String, required: true },
    },
    description: {
      az: { type: String, required: true },
      en: { type: String, required: true },
    },
    techStack: {
      type: [
        {
          name: { type: String, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Service", serviceSchema);
