const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const connectDB = require("./db");
const pageRoutes = require("./routes/pageRoutes");
const techRoutes = require("./routes/techRoutes");
const projectRoutes = require("./routes/projectRoutes");
const cvRoutes = require("./routes/cv");
const serviceRoutes = require("./routes/servicesRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://yourdomain.com", "http://localhost:3001"]
      : ["http://localhost:3001", "http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
};

console.log(`CORS options: ${JSON.stringify(corsOptions)}`);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());

app.use(cors(corsOptions));

app.use("/api/pages", pageRoutes);
app.use("/api/tech", techRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api", cvRoutes);
app.use("/api/contact", contactRoutes);
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
