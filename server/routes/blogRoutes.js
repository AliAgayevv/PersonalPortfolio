const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const adminController = require("../controllers/adminController");

// Public routes (authentication tələb etmir)
// GET /api/blogs - Bütün nəşr edilmiş blogları əldə etmək
router.get("/", blogController.getAllBlogs);

// GET /api/blogs/:id - Tək nəşr edilmiş blog əldə etmək
router.get("/:id", blogController.getBlogById);

// Admin routes (authentication tələb edir)
// GET /api/blogs/admin/all - Admin üçün bütün blogları əldə etmək
router.get(
  "/admin/all",
  adminController.verifyToken,
  blogController.getAllBlogsAdmin
);

// GET /api/blogs/admin/stats - Blog statistikaları
router.get(
  "/admin/stats",
  adminController.verifyToken,
  blogController.getBlogStats
);

// GET /api/blogs/admin/:id - Admin üçün tək blog əldə etmək
router.get(
  "/admin/:id",
  adminController.verifyToken,
  blogController.getBlogByIdAdmin
);

// POST /api/blogs - Blog yaratmaq
router.post("/", adminController.verifyToken, blogController.createBlog);

// PUT /api/blogs/:id - Blog yeniləmək
router.put("/:id", adminController.verifyToken, blogController.updateBlog);

// DELETE /api/blogs/:id - Blog silmək
router.delete("/:id", adminController.verifyToken, blogController.deleteBlog);

module.exports = router;
