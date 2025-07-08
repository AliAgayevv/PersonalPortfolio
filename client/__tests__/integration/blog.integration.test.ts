import { MediumService } from "@/services/medium.service";
import { formatDate, cleanHTMLContent } from "@/utils/blog.utils";

describe("Blog Integration Tests", () => {
  it("should integrate service and utils correctly", async () => {
    // Mock successful response with PROPER XML format
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () =>
        Promise.resolve(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Test Blog</title>
    <description>Test Description</description>
    <item>
      <title><![CDATA[Test Integration Article]]></title>
      <link>https://medium.com/@test/integration</link>
      <pubDate>Wed, 04 Jun 2025 08:25:06 GMT</pubDate>
      <dc:creator>Ali Aghayev</dc:creator>
      <content:encoded><![CDATA[<p>Integration test content</p>]]></content:encoded>
      <category>integration</category>
      <category>testing</category>
    </item>
  </channel>
</rss>`),
    });

    const articles = await MediumService.fetchArticles();

    expect(articles).toHaveLength(1);

    const article = articles[0];

    // Test that service correctly processes the data
    expect(article.title).toBe("Test Integration Article");
    expect(article.categories).toEqual(["integration", "testing"]);

    // Test that utils can process the service output
    const formattedDate = formatDate(article.pubDate, "en");
    const cleanContent = cleanHTMLContent(article.content);

    expect(formattedDate).toContain("June");
    expect(cleanContent).toBe("<p>Integration test content</p>");
  });

  it("should handle empty XML response", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () =>
        Promise.resolve(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Empty Blog</title>
  </channel>
</rss>`),
    });

    const articles = await MediumService.fetchArticles();
    expect(articles).toHaveLength(0);
  });

  it("should handle malformed XML gracefully", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve("Invalid XML content"),
    });

    const articles = await MediumService.fetchArticles();
    expect(articles).toHaveLength(0);
  });
});
