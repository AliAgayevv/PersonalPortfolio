import { BlogWebsiteRes, Article } from "@/types/blogInterface";

export class BlogService {
  private static readonly BASE_URL = "https://aghayev.dev";

  /**
   * Auth header-larını əldə edir
   */
  private static getAuthHeaders(): HeadersInit {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  /**
   * Base headers (auth olmadan)
   */
  private static getBaseHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  /**
   * Website bloqlarını əldə edir (public)
   */
  static async fetchWebsiteBlogs(
    lang: string = "az",
    format: "json" | "markdown" = "json"
  ): Promise<BlogWebsiteRes> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/api/blogs?lang=${lang}&format=${format}`,
        {
          cache: "no-store",
          headers: this.getBaseHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to fetch website articles:", error);
      return { success: false, data: [], count: 0 };
    }
  }

  /**
   * Admin üçün bütün blogları əldə edir
   */
  static async fetchAllBlogsAdmin(
    lang: string = "az",
    format: "json" | "markdown" = "json",
    status: "all" | "published" | "draft" = "all"
  ): Promise<BlogWebsiteRes> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/api/blogs/admin/all?lang=${lang}&format=${format}&status=${status}`,
        {
          method: "GET",
          cache: "no-store",
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Admin blogs fetch error:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to fetch admin articles:", error);
      return { success: false, data: [], count: 0 };
    }
  }

  /**
   * Tək blog məqaləsini əldə edir (public)
   */
  static async fetchSingleBlog(
    id: string,
    lang: string = "az",
    format: "json" | "markdown" = "markdown"
  ): Promise<Article> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/api/blogs/${id}?lang=${lang}&format=${format}`,
        {
          cache: "no-store",
          headers: this.getBaseHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch blog with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Admin üçün tək blog məqaləsini əldə edir
   */
  static async fetchSingleBlogAdmin(
    id: string,
    lang: string = "az",
    format: "json" | "markdown" = "json"
  ): Promise<any> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/api/blogs/admin/${id}?lang=${lang}&format=${format}`,
        {
          method: "GET",
          cache: "no-store",
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Admin blog fetch error:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch admin blog with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Blog yaradır
   */
  static async createBlog(blogData: Record<string, unknown>): Promise<Article> {
    try {
      console.log("Creating blog with data:", blogData);
      console.log("Using headers:", this.getAuthHeaders());

      const response = await fetch(`${this.BASE_URL}/api/blogs`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(blogData),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Create blog error response:", errorText);

        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }

        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to create blog:", error);
      throw error;
    }
  }

  /**
   * Blog yeniləyir
   */
  static async updateBlog(
    id: string,
    blogData: Record<string, unknown>
  ): Promise<any> {
    try {
      const response = await fetch(`${this.BASE_URL}/api/blogs/${id}`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Update blog error response:", errorText);

        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }

        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to update blog:", error);
      throw error;
    }
  }

  /**
   * Blog silir
   */
  static async deleteBlog(id: string): Promise<any> {
    try {
      const response = await fetch(`${this.BASE_URL}/api/blogs/${id}`, {
        method: "DELETE",
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Delete blog error response:", errorText);

        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }

        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to delete blog:", error);
      throw error;
    }
  }

  /**
   * Blog statistikalarını əldə edir
   */
  static async fetchBlogStats(): Promise<any> {
    try {
      const response = await fetch(`${this.BASE_URL}/api/blogs/admin/stats`, {
        method: "GET",
        cache: "no-store",
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to fetch blog stats:", error);
      return { success: false, data: null };
    }
  }

  /**
   * Medium məqalələrini və website bloqlarını birlikdə əldə edir
   */
  static async fetchAllArticles(
    lang: string = "az",
    mediumService?: { fetchArticles: () => Promise<Article[]> }
  ): Promise<{
    mediumArticles: Article[];
    websiteBlogs: BlogWebsiteRes;
  }> {
    const [mediumArticles, websiteBlogs] = await Promise.allSettled([
      mediumService ? mediumService.fetchArticles() : Promise.resolve([]),
      this.fetchWebsiteBlogs(lang),
    ]);

    return {
      mediumArticles:
        mediumArticles.status === "fulfilled" ? mediumArticles.value : [],
      websiteBlogs:
        websiteBlogs.status === "fulfilled"
          ? websiteBlogs.value
          : { success: false, data: [], count: 0 },
    };
  }
}
