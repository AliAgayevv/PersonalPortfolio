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

const adminRoutes = require("./routes/adminRoutes");

const blogsRoutes = require("./routes/blogRoutes");


const app = express();

const allowedOrigins = [
  process.env.FRONT_SERVER,
  "http://localhost:3000", //TODO: BUNU SIL
  "http://localhost:3001",
  "http://45.85.146.73:3001",
].filter(Boolean);

const corsOptions = {
  // TODO: Uncomment this
  // origin: function (origin, callback) {
  //   if (!origin) return callback(null, true);
  //   if (allowedOrigins.includes(origin)) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS policy"), false);
  //   }
  // },
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
};

app.use(cors(corsOptions));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

// TODO: uncomment this
// app.use((err, req, res, next) => {
//   if (err && err.message.includes("Not allowed by CORS policy")) {
//     return res.status(403).json({
//       error: "Forbidden",
//       message: "Access denied: Unauthorized origin",
//       origin: req.headers.origin || "No origin header",
//       allowedOrigins: allowedOrigins,
//     });
//   }
//   next(err);
// });

app.use("/api/blogs", blogsRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/tech", techRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api", cvRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource was not found",
  });
});

connectDB();
// TODO: 4000 et
const port = process.env.NODE_ENV === "production" ? 5000 : 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
