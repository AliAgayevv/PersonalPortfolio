const Blog = require("../models/Blog");

// Blog yaratmaq
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

    // Validation
    if (!blogId || !blogTitle || !blogDescription || !blogContent || !author) {
      return res.status(400).json({
        success: false,
        message: "Məcburi sahələr doldurulmalıdır",
      });
    }

    // Eyni blogId yoxlayırıq
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

// Bütün blogları əldə etmək
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

    // JSON format
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

// Tək blog əldə etmək
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

    // JSON format
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
