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
  origin: function (origin, callback) {
    const allowedOrigin = process.env.FRONT_SERVER;

    // Allow requests with no origin (mobile apps, curl, Postman, etc.)
    if (!origin) return callback(null, false);

    // Check if the origin matches exactly
    if (origin === allowedOrigin) {
      callback(null, true);
    } else {
      console.log(`Blocked request from unauthorized origin: ${origin}`);
      callback(new Error("Not allowed by CORS policy"), false);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept-Language"],
};

console.log(`Allowed origin: ${process.env.FRONT_SERVER}`);

// Additional security middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigin = process.env.FRONT_SERVER;

  // If there's no origin header, reject the request
  if (!origin) {
    console.log(`Blocked request with no origin header from ${req.ip}`);
    return res.status(403).json({
      error: "Forbidden",
      message: "Requests without origin header are not allowed",
    });
  }

  // If origin doesn't match, reject with detailed error
  if (origin !== allowedOrigin) {
    console.log(
      `Blocked unauthorized request from: ${origin} (Expected: ${allowedOrigin})`
    );
    return res.status(403).json({
      error: "Forbidden",
      message: "Access denied: Unauthorized origin",
      allowedOrigin: allowedOrigin,
    });
  }

  next();
});

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
