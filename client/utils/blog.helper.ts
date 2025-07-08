import { Article, BlogWebsiteArticles } from "@/types/blogInterface";

/**
 * Məqalənin website artikel olub-olmadığını yoxlayır
 */
export const isWebsiteArticle = (
  article: Article | BlogWebsiteArticles
): article is BlogWebsiteArticles => {
  return "id" in article;
};

/**
 * Markdown mətni HTML-ə çevirir (sadə versiya)
 * Produksiya üçün marked və ya remark istifadə etmək tövsiyə olunur
 */
export const renderMarkdownAsHTML = (markdown: string): string => {
  return markdown
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(
      /!\[([^\]]*)\]\(([^\)]*)\)/gim,
      '<img alt="$1" src="$2" class="rounded-lg" />'
    )
    .replace(
      /\[([^\]]*)\]\(([^\)]*)\)/gim,
      '<a href="$2" class="text-blue-600 hover:underline">$1</a>'
    )
    .replace(
      /```([^`]*)```/gim,
      '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>'
    )
    .replace(
      /`([^`]*)`/gim,
      '<code class="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm">$1</code>'
    )
    .replace(/^\- (.*$)/gim, "<li>$1</li>")
    .replace(/^\* (.*$)/gim, "<li>$1</li>")
    .replace(/(\r\n|\n|\r)/gm, "<br />");
};

/**
 * Məqalə məlumatlarını normallaşdırır
 */
export interface NormalizedArticleData {
  title: string;
  content: string;
  pubDate: string;
  categories: string[];
  link: string;
  source: "Website" | "Medium";
  isMarkdown: boolean;
}

export const normalizeArticleData = (
  article: Article | BlogWebsiteArticles,
  isWebsite: boolean
): NormalizedArticleData => {
  if (isWebsite) {
    const blogArticle = article as BlogWebsiteArticles;
    return {
      title: blogArticle.title,
      content: blogArticle.content,
      pubDate: blogArticle.createdTime,
      categories: blogArticle.tags,
      link: `/blog/${blogArticle.id}`,
      source: "Website",
      isMarkdown: true,
    };
  } else {
    const mediumArticle = article as Article;
    return {
      title: mediumArticle.title,
      content: mediumArticle.content,
      pubDate: mediumArticle.pubDate,
      categories: mediumArticle.categories,
      link: mediumArticle.link,
      source: "Medium",
      isMarkdown: false,
    };
  }
};

/**
 * Məzmunu müəyyən uzunluqda kəsir və müvafiq formata çevirir
 */
export const processArticleContent = (
  content: string,
  isMarkdown: boolean,
  maxLength: number,
  cleanHTMLContent: (html: string) => string
): string => {
  const truncatedContent = content.slice(0, maxLength);

  if (isMarkdown) {
    return renderMarkdownAsHTML(truncatedContent) + "...";
  } else {
    return cleanHTMLContent(truncatedContent) + "...";
  }
};
