import { MediumService } from "@/services/medium.service";

global.fetch = jest.fn();

const createMockXMLDoc = (hasItems = true) => ({
  getElementsByTagName: jest.fn().mockImplementation((tagName: string) => {
    if (tagName === "parsererror") {
      return [];
    }
    if (tagName === "item" && hasItems) {
      return [
        {
          getElementsByTagName: jest.fn().mockImplementation((tag: string) => {
            const mockData: Record<string, any[]> = {
              title: [{ textContent: "Test Article Title" }],
              link: [{ textContent: "https://medium.com/@test/article" }],
              pubDate: [{ textContent: "Wed, 04 Jun 2025 08:25:06 GMT" }],
              "dc:creator": [{ textContent: "Ali Aghayev" }],
              "content:encoded": [{ textContent: "<p>Test content</p>" }],
              category: [
                { textContent: "programming" },
                { textContent: "javascript" },
              ],
            };
            return mockData[tag] || [];
          }),
        },
      ];
    }
    return [];
  }),
});

jest.mock("@xmldom/xmldom", () => ({
  DOMParser: jest.fn().mockImplementation(() => ({
    parseFromString: jest.fn().mockImplementation((xmlText: string) => {
      if (xmlText === "Invalid XML content" || !xmlText.includes("<?xml")) {
        return {
          getElementsByTagName: jest
            .fn()
            .mockImplementation((tagName: string) => {
              if (tagName === "parsererror") {
                return [{ textContent: "XML parsing failed" }];
              }
              return [];
            }),
        };
      }
      return createMockXMLDoc(true);
    }),
  })),
}));

describe("MediumService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("fetchArticles", () => {
    it("should fetch and parse articles successfully", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: jest
          .fn()
          .mockResolvedValue(
            '<?xml version="1.0"?><rss><channel><item></item></channel></rss>'
          ),
      });

      const articles = await MediumService.fetchArticles();

      expect(articles).toHaveLength(1);
      expect(articles[0]).toEqual({
        title: "Test Article Title",
        link: "https://medium.com/@test/article",
        pubDate: "Wed, 04 Jun 2025 08:25:06 GMT",
        creator: "Ali Aghayev",
        content: "<p>Test content</p>",
        categories: ["programming", "javascript"],
        source: "medium",
      });
    });

    it("should handle fetch error gracefully", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const articles = await MediumService.fetchArticles();
      expect(articles).toEqual([]);
    });

    it("should handle network error", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      const articles = await MediumService.fetchArticles();
      expect(articles).toEqual([]);
    });

    it("should use correct fetch URL with proxy", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: jest
          .fn()
          .mockResolvedValue(
            '<?xml version="1.0"?><rss><channel></channel></rss>'
          ),
      });

      await MediumService.fetchArticles();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("api.allorigins.win"),
        expect.objectContaining({
          next: { revalidate: 3600 },
        })
      );
    });

    it("should handle malformed XML gracefully", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: jest.fn().mockResolvedValue("Invalid XML content"),
      });

      const articles = await MediumService.fetchArticles();
      expect(articles).toEqual([]);
    });
  });
});
