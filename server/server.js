const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const connectDB = require("./db");
const pageRoutes = require("./routes/pageRoutes");
const techRoutes = require("./routes/techRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(express.json());

app.use(cors(corsOptions));

app.use("/api/pages", pageRoutes);
app.use("/api/tech", techRoutes);
app.use("/api/projects", projectRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
