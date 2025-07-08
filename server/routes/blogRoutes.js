const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

// POST /api/blogs - Blog yaratmaq
router.post("/", blogController.createBlog);

// GET /api/blogs - Bütün blogları əldə etmək
router.get("/", blogController.getAllBlogs);

// GET /api/blogs/:id - Tək blog əldə etmək
router.get("/:id", blogController.getBlogById);

module.exports = router;
