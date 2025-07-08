const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  try {
    const {
      blogId,
      blogTitle,
      blogDescription,
      blogContent,
      blogCreatedTime,
      author,
      tags,
      images,
      isPublished = false,
    } = req.body;

    if (!blogId || !blogTitle || !blogDescription || !blogContent || !author) {
      return res.status(400).json({
        success: false,
        message: "Məcburi sahələr doldurulmalıdır",
      });
    }

    const existingBlog = await Blog.findOne({ blogId });
    if (existingBlog) {
      return res.status(409).json({
        success: false,
        message: "Bu blogId artıq mövcuddur",
      });
    }

    const newBlog = new Blog({
      blogId,
      blogTitle,
      blogDescription,
      blogContent,
      blogCreatedTime,
      author,
      tags: tags || [],
      images: images || [],
      isPublished,
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      message: "Blog uğurla yaradıldı",
      data: newBlog,
    });
  } catch (error) {
    console.error("Blog creation error:", error);
    res.status(500).json({
      success: false,
      message: "Server xətası baş verdi",
      error: error.message,
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const { lang = "az", format = "json" } = req.query;

    const blogs = await Blog.find({ isPublished: true }).sort({
      createdAt: -1,
    });

    if (format === "markdown") {
      const markdownBlogs = blogs.map((blog) => {
        const title = blog.blogTitle[lang] || blog.blogTitle.az;
        const description =
          blog.blogDescription[lang] || blog.blogDescription.az;
        const content = blog.blogContent[lang] || blog.blogContent.az;
        const createdTime =
          blog.blogCreatedTime[lang] || blog.blogCreatedTime.az;

        return {
          id: blog.blogId,
          markdown: `# ${title}

> ${description}

**Tarix:** ${createdTime}
**Müəllif:** ${blog.author}
${blog.tags.length > 0 ? `**Tag-lar:** ${blog.tags.join(", ")}` : ""}

---

${content}

${
  blog.images.length > 0
    ? `\n## Şəkillər\n${blog.images
        .map((img) => `![Image](${img})`)
        .join("\n")}`
    : ""
}
          `,
          meta: {
            id: blog.blogId,
            title: title,
            author: blog.author,
            createdAt: blog.createdAt,
            tags: blog.tags,
            images: blog.images,
          },
        };
      });

      return res.status(200).json({
        success: true,
        count: markdownBlogs.length,
        data: markdownBlogs,
      });
    }

    const jsonBlogs = blogs.map((blog) => ({
      id: blog.blogId,
      title: blog.blogTitle[lang] || blog.blogTitle.az,
      description: blog.blogDescription[lang] || blog.blogDescription.az,
      content: blog.blogContent[lang] || blog.blogContent.az,
      createdTime: blog.blogCreatedTime[lang] || blog.blogCreatedTime.az,
      author: blog.author,
      tags: blog.tags,
      images: blog.images,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    }));

    res.status(200).json({
      success: true,
      count: jsonBlogs.length,
      data: jsonBlogs,
    });
  } catch (error) {
    console.error("Blog fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Server xətası baş verdi",
      error: error.message,
    });
  }
};
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const { lang = "az", format = "json" } = req.query;

    const blog = await Blog.findOne({ blogId: id, isPublished: true });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog tapılmadı",
      });
    }

    if (format === "markdown") {
      const title = blog.blogTitle[lang] || blog.blogTitle.az;
      const description = blog.blogDescription[lang] || blog.blogDescription.az;
      const content = blog.blogContent[lang] || blog.blogContent.az;
      const createdTime = blog.blogCreatedTime[lang] || blog.blogCreatedTime.az;

      const markdown = `# ${title}

> ${description}

**Tarix:** ${createdTime}
**Müəllif:** ${blog.author}
${blog.tags.length > 0 ? `**Tag-lar:** ${blog.tags.join(", ")}` : ""}

---

${content}

${
  blog.images.length > 0
    ? `\n## Şəkillər\n${blog.images
        .map((img) => `![Image](${img})`)
        .join("\n")}`
    : ""
}
      `;

      return res.status(200).json({
        success: true,
        data: {
          id: blog.blogId,
          markdown: markdown,
          meta: {
            id: blog.blogId,
            title: title,
            author: blog.author,
            createdAt: blog.createdAt,
            tags: blog.tags,
            images: blog.images,
          },
        },
      });
    }

    const jsonBlog = {
      id: blog.blogId,
      title: blog.blogTitle[lang] || blog.blogTitle.az,
      description: blog.blogDescription[lang] || blog.blogDescription.az,
      content: blog.blogContent[lang] || blog.blogContent.az,
      createdTime: blog.blogCreatedTime[lang] || blog.blogCreatedTime.az,
      author: blog.author,
      tags: blog.tags,
      images: blog.images,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    };

    res.status(200).json({
      success: true,
      data: jsonBlog,
    });
  } catch (error) {
    console.error("Blog fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Server xətası baş verdi",
      error: error.message,
    });
  }
};

// Admin-only
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      blogTitle,
      blogDescription,
      blogContent,
      blogCreatedTime,
      author,
      tags,
      images,
      isPublished,
    } = req.body;

    if (!blogTitle || !blogDescription || !blogContent || !author) {
      return res.status(400).json({
        success: false,
        message: "Məcburi sahələr doldurulmalıdır",
      });
    }

    const blog = await Blog.findOne({ blogId: id });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog tapılmadı",
      });
    }

    blog.blogTitle = blogTitle;
    blog.blogDescription = blogDescription;
    blog.blogContent = blogContent;
    blog.blogCreatedTime = blogCreatedTime;
    blog.author = author;
    blog.tags = tags || [];
    blog.images = images || [];
    blog.isPublished = isPublished;

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog uğurla yeniləndi",
      data: blog,
    });
  } catch (error) {
    console.error("Blog update error:", error);
    res.status(500).json({
      success: false,
      message: "Server xətası baş verdi",
      error: error.message,
    });
  }
};

// Admin-only
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findOne({ blogId: id });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog tapılmadı",
      });
    }

    await Blog.deleteOne({ blogId: id });

    res.status(200).json({
      success: true,
      message: "Blog uğurla silindi",
    });
  } catch (error) {
    console.error("Blog delete error:", error);
    res.status(500).json({
      success: false,
      message: "Server xətası baş verdi",
      error: error.message,
    });
  }
};

// Admin-only
exports.getAllBlogsAdmin = async (req, res) => {
  try {
    const { lang = "az", format = "json", status = "all" } = req.query;

    let query = {};
    if (status === "published") {
      query.isPublished = true;
    } else if (status === "draft") {
      query.isPublished = false;
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });

    if (format === "markdown") {
      const markdownBlogs = blogs.map((blog) => {
        const title = blog.blogTitle[lang] || blog.blogTitle.az;
        const description =
          blog.blogDescription[lang] || blog.blogDescription.az;
        const content = blog.blogContent[lang] || blog.blogContent.az;
        const createdTime =
          blog.blogCreatedTime[lang] || blog.blogCreatedTime.az;

        return {
          id: blog.blogId,
          markdown: `# ${title}

> ${description}

**Tarix:** ${createdTime}
**Müəllif:** ${blog.author}
**Status:** ${blog.isPublished ? "Nəşr edilib" : "Qaralama"}
${blog.tags.length > 0 ? `**Tag-lar:** ${blog.tags.join(", ")}` : ""}

---

${content}

${
  blog.images.length > 0
    ? `\n## Şəkillər\n${blog.images
        .map((img) => `![Image](${img})`)
        .join("\n")}`
    : ""
}
          `,
          meta: {
            id: blog.blogId,
            title: title,
            author: blog.author,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
            tags: blog.tags,
            images: blog.images,
            isPublished: blog.isPublished,
          },
        };
      });

      return res.status(200).json({
        success: true,
        count: markdownBlogs.length,
        data: markdownBlogs,
      });
    }

    const jsonBlogs = blogs.map((blog) => ({
      id: blog.blogId,
      title: blog.blogTitle[lang] || blog.blogTitle.az,
      description: blog.blogDescription[lang] || blog.blogDescription.az,
      content: blog.blogContent[lang] || blog.blogContent.az,
      createdTime: blog.blogCreatedTime[lang] || blog.blogCreatedTime.az,
      author: blog.author,
      tags: blog.tags,
      images: blog.images,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      isPublished: blog.isPublished,
    }));

    res.status(200).json({
      success: true,
      count: jsonBlogs.length,
      data: jsonBlogs,
    });
  } catch (error) {
    console.error("Admin blog fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Server xətası baş verdi",
      error: error.message,
    });
  }
};

// Admin-only
exports.getBlogByIdAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { lang = "az", format = "json" } = req.query;

    const blog = await Blog.findOne({ blogId: id });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog tapılmadı",
      });
    }

    if (format === "markdown") {
      const title = blog.blogTitle[lang] || blog.blogTitle.az;
      const description = blog.blogDescription[lang] || blog.blogDescription.az;
      const content = blog.blogContent[lang] || blog.blogContent.az;
      const createdTime = blog.blogCreatedTime[lang] || blog.blogCreatedTime.az;

      const markdown = `# ${title}

> ${description}

**Tarix:** ${createdTime}
**Müəllif:** ${blog.author}
**Status:** ${blog.isPublished ? "Nəşr edilib" : "Qaralama"}
${blog.tags.length > 0 ? `**Tag-lar:** ${blog.tags.join(", ")}` : ""}

---

${content}

${
  blog.images.length > 0
    ? `\n## Şəkillər\n${blog.images
        .map((img) => `![Image](${img})`)
        .join("\n")}`
    : ""
}
      `;

      return res.status(200).json({
        success: true,
        data: {
          id: blog.blogId,
          markdown: markdown,
          meta: {
            id: blog.blogId,
            title: title,
            author: blog.author,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
            tags: blog.tags,
            images: blog.images,
            isPublished: blog.isPublished,
          },
        },
      });
    }

    const jsonBlog = {
      id: blog.blogId,
      blogTitle: blog.blogTitle,
      blogDescription: blog.blogDescription,
      blogContent: blog.blogContent,
      blogCreatedTime: blog.blogCreatedTime,
      author: blog.author,
      tags: blog.tags,
      images: blog.images,
      isPublished: blog.isPublished,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    };

    res.status(200).json({
      success: true,
      data: jsonBlog,
    });
  } catch (error) {
    console.error("Admin blog fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Server xətası baş verdi",
      error: error.message,
    });
  }
};

exports.getBlogStats = async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ isPublished: true });
    const draftBlogs = await Blog.countDocuments({ isPublished: false });

    const recentBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("blogId blogTitle author createdAt isPublished");

    const tagStats = await Blog.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          total: totalBlogs,
          published: publishedBlogs,
          draft: draftBlogs,
        },
        recentBlogs: recentBlogs.map((blog) => ({
          id: blog.blogId,
          title: blog.blogTitle.az || blog.blogTitle.en,
          author: blog.author,
          createdAt: blog.createdAt,
          isPublished: blog.isPublished,
        })),
        popularTags: tagStats.map((tag) => ({
          name: tag._id,
          count: tag.count,
        })),
      },
    });
  } catch (error) {
    console.error("Blog stats error:", error);
    res.status(500).json({
      success: false,
      message: "Server xətası baş verdi",
      error: error.message,
    });
  }
};
