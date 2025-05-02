const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const connectDB = ruquire("./db");

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

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
