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
  // fetchArticles metodu Medium RSS feed-dən məqalələri yükləyir
  // və XML formatından Article tipinə çevirir.
  // Əgər yükləmə zamanı xəta baş verərsə, boş array qaytarır.
  // Bu metod Next.js-in revalidate xüsusiyyətindən istifadə edir.
  // PROXY_URL ilə Medium RSS URL-i birləşdirilir ki, CORS problemləri yaranmasın.
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
      // Private metodu çağıraraq XML mətnini Article tipinə çeviririk
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

      // Add error handling for XML parsing
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");

      // Check if parsing was successful
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
      // Catch XML parsing errors
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
