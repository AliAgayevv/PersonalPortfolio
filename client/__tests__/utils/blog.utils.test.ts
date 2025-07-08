import { formatDate, cleanHTMLContent } from "@/utils/blog.utils";

describe("Blog Utils", () => {
  describe("formatDate", () => {
    it("should format date correctly for Azerbaijani locale", () => {
      const testDate = "Wed, 04 Jun 2025 08:25:06 GMT";
      const result = formatDate(testDate, "az");

      expect(result).toContain("2025");
      expect(result).toContain("iyun");
    });

    it("should format date correctly for English locale", () => {
      const testDate = "Wed, 04 Jun 2025 08:25:06 GMT";
      const result = formatDate(testDate, "en");

      expect(result).toContain("2025");
      expect(result).toContain("June");
    });

    it("should return empty string for invalid date", () => {
      const result = formatDate("", "az");
      expect(result).toBe("");
    });

    it("should handle null/undefined date string", () => {
      const result = formatDate(null as any, "az");
      expect(result).toBe("");
    });
  });

  describe("cleanHTMLContent", () => {
    it("should remove CDATA wrapper from content", () => {
      const htmlWithCDATA = "<![CDATA[<p>Test content</p>]]>";
      const result = cleanHTMLContent(htmlWithCDATA);

      expect(result).toBe("<p>Test content</p>");
      expect(result).not.toContain("CDATA");
    });

    it("should remove Medium stat tracking images", () => {
      const htmlWithStat =
        '<p>Content</p><img src="https://medium.com/_/stat?event=post.clientViewed" width="1" height="1">';
      const result = cleanHTMLContent(htmlWithStat);

      expect(result).toBe("<p>Content</p>");
      expect(result).not.toContain("stat?event");
    });

    it("should clean excessive whitespace", () => {
      const htmlWithSpaces = "<p>Too   much    space</p>";
      const result = cleanHTMLContent(htmlWithSpaces);

      expect(result).toBe("<p>Too much space</p>");
    });

    it("should return empty string for empty input", () => {
      expect(cleanHTMLContent("")).toBe("");
      expect(cleanHTMLContent(null as any)).toBe("");
      expect(cleanHTMLContent(undefined as any)).toBe("");
    });

    it("should handle complex HTML content", () => {
      const complexHTML = `
        <![CDATA[
          <p>Test <strong>bold</strong> content</p>
          <pre>code block</pre>
          <img src="https://medium.com/_/stat?event=test">
        ]]>
      `;
      const result = cleanHTMLContent(complexHTML);

      expect(result).toContain("<p>Test <strong>bold</strong> content</p>");
      expect(result).toContain("<pre>code block</pre>");
      expect(result).not.toContain("CDATA");
      expect(result).not.toContain("stat?event");
    });
  });
});
