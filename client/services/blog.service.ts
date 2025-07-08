import { BlogWebsiteRes, Article } from "@/types/blogInterface";

export class BlogService {
  private static readonly BASE_URL = "http://localhost:4000";
  //TODO:    Change this to your actual base URL

  static async fetchWebsiteBlogs(
    lang: string = "az",
    format: "json" | "markdown" = "json"
  ): Promise<BlogWebsiteRes> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/api/blogs?lang=${lang}&format=${format}`,
        {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": lang,
          },
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

  static async fetchSingleBlog(
    id: string,
    lang: string = "az",
    format: "json" | "markdown" = "markdown"
  ): Promise<any> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/api/blogs/${id}?lang=${lang}&format=${format}`,
        {
          cache: "no-store",
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

  static async fetchAllArticles(
    lang: string = "az",
    mediumService?: any
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
