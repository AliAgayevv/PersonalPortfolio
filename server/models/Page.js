const mongoose = require("mongoose");

// {
//   "title": {
//     "az": "Azərbaycanca",
//     "en": "English"
//   },
//   "description": {
//     "az": "Bu, azərbaycan dilindəki tərcümədir.",
//     "en": "This is the translation in Azerbaijani."
//   },
//   "greeting": {
//     "az": "Salam, dünya!",
//     "en": "Hello, world!"
//   },
//   "farewell": {
//     "az": "Sağ ol, dünya!",
//     "en": "Goodbye, world!"
//   }
// }

const pageSchema = new mongoose.Schema({
  pageTitle: {
    az: { type: String, required: true },
    en: { type: String, required: true },
  },
});
const Page = mongoose.model("Page", pageSchema);
