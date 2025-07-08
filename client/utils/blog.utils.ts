import type { Element } from "@xmldom/xmldom";

export const formatDate = (dateString: string, lang: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Baku",
  };

  return date.toLocaleDateString(lang === "az" ? "az-AZ" : "en-US", options);
};

export const cleanHTMLContent = (htmlContent: string): string => {
  if (!htmlContent) return "";

  // CDATA təmizlə
  let cleanContent = htmlContent.replace(/^\s*<!\[CDATA\[|\]\]>\s*$/g, "");

  // Medium statistika img tag-ini sil
  cleanContent = cleanContent.replace(/<img[^>]*stat\?event[^>]*>/g, "");

  // Lazımsız boşluqları təmizlə
  cleanContent = cleanContent.replace(/\s+/g, " ").trim();

  return cleanContent;
};

// @xmldom/xmldom Element tipi üçün xüsusi funksiya
export const getTextContentFromXML = (
  item: Element,
  tagName: string
): string => {
  const element = item.getElementsByTagName(tagName)[0];
  return element?.textContent || element?.firstChild?.nodeValue || "";
};

export const extractCategoriesFromXML = (item: Element): string[] => {
  const categoryElements = item.getElementsByTagName("category");
  const categories: string[] = [];

  for (let j = 0; j < categoryElements.length; j++) {
    const categoryText =
      categoryElements[j].textContent ||
      categoryElements[j].firstChild?.nodeValue;
    if (categoryText && categoryText.trim()) {
      categories.push(categoryText.trim());
    }
  }

  return categories;
};
