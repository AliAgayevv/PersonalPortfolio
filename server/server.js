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




const allowedOrigins = [
  process.env.FRONT_SERVER,
  "http://localhost:3001",
].filter(Boolean);

console.log(allowedOrigins)

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      console.log(`Blocked request with no origin header`);
      return callback(
        new Error("Not allowed by CORS policy - No origin header"),
        false
      );
    }

    if (allowedOrigins.includes(origin)) {
      console.log(`Allowed request from: ${origin}`);
      callback(null, true);
    } else {
      console.log(`Blocked request from unauthorized origin: ${origin}`);
      console.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
      callback(new Error("Not allowed by CORS policy"), false);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());

app.use((err, req, res, next) => {
  if (err && err.message.includes("Not allowed by CORS policy")) {
    return res.status(403).json({
      error: "Forbidden",
      message: "Access denied: Unauthorized origin",
      origin: req.headers.origin || "No origin header",
      allowedOrigins: allowedOrigins,
    });
  }
  next(err);
});

app.use("/api/pages", pageRoutes);
app.use("/api/tech", techRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api", cvRoutes);
app.use("/api/contact", contactRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource was not found",
  });
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
});
