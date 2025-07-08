import { Article } from "@/types/blogInterface";
import type { Element } from "@xmldom/xmldom";
import {
  getTextContentFromXML,
  extractCategoriesFromXML,
} from "@/utils/blog.utils";
import {
  MEDIUM_RSS_URL,
  PROXY_URL,
  CACHE_REVALIDATE_TIME,
} from "@/constants/blog.constants";

export class MediumService {
  // The fetchArticles method fetches articles from the Medium RSS feed
  // and converts them from XML format to the Article type.
  // If an error occurs during the fetch, it returns an empty array.
  // This method uses the revalidate feature of Next.js.
  // The Medium RSS URL is combined with the PROXY_URL to avoid CORS issues.

  static async fetchArticles(): Promise<Article[]> {
    try {
      const response = await fetch(
        PROXY_URL + encodeURIComponent(MEDIUM_RSS_URL),
        {
          next: { revalidate: CACHE_REVALIDATE_TIME },
        }
      );

      if (!response.ok) {
        throw new Error("RSS feed yüklənə bilmədi");
      }

      const xmlText = await response.text();
      // XML -> Article type
      return this.parseXMLToArticles(xmlText);
    } catch (error) {
      console.error("Medium articles fetch error:", error);
      return [];
    }
  }

  private static async parseXMLToArticles(xmlText: string): Promise<Article[]> {
    try {
      const { DOMParser } = await import("@xmldom/xmldom");
      const parser = new DOMParser();

      const xmlDoc = parser.parseFromString(xmlText, "text/xml");

      const parseError = xmlDoc.getElementsByTagName("parsererror")[0];
      if (parseError) {
        console.warn("XML parsing failed:", parseError.textContent);
        return [];
      }

      const items = xmlDoc.getElementsByTagName("item");
      const articles: Article[] = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i] as any;
        const article = this.parseXMLItemToArticle(item);
        articles.push(article);
      }

      return articles;
    } catch (error) {
      console.warn("XML parsing error:", error);
      return [];
    }
  }

  private static parseXMLItemToArticle(item: Element): Article {
    const title = getTextContentFromXML(item, "title")
      .replace(/^\s*<!\[CDATA\[|\]\]>\s*$/g, "")
      .trim();

    const link = getTextContentFromXML(item, "link");
    const pubDate = getTextContentFromXML(item, "pubDate");
    const creator = getTextContentFromXML(item, "dc:creator") || "Ali Aghayev";
    const contentEncoded = getTextContentFromXML(item, "content:encoded");
    const categories = extractCategoriesFromXML(item);

    return {
      title,
      link,
      pubDate,
      creator,
      content: contentEncoded,
      categories,
      source: "medium",
    };
  }
}
