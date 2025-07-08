import React from "react";
import Link from "next/link";
import {
  Article,
  BlogTranslations,
  BlogWebsiteArticles,
} from "@/types/blogInterface";
import { formatDate, cleanHTMLContent } from "@/utils/blog.utils";
import { MAX_BLOG_LETTER_LENGTH } from "@/constants/blog.constants";
import {
  isWebsiteArticle,
  normalizeArticleData,
  processArticleContent,
} from "@/utils/blog.helper";
import CtaButton from "../CtaButton";

interface ArticleCardProps {
  article: Article | BlogWebsiteArticles;
  translations: BlogTranslations;
  lang: string;
  isWebsiteArticle?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  translations,
  lang,
  isWebsiteArticle: forceWebsiteType = false,
}) => {
  // Məqalənin növünü müəyyən edirik
  const isWebsite = forceWebsiteType || isWebsiteArticle(article);

  // Məlumatları normallaşdırırıq
  const articleData = normalizeArticleData(article, isWebsite);

  // Məzmunu emal edirik
  const processedContent = processArticleContent(
    articleData.content,
    articleData.isMarkdown,
    MAX_BLOG_LETTER_LENGTH,
    cleanHTMLContent
  );

  // Tarix formatını müəyyən edirik
  const formattedDate = isWebsite
    ? articleData.pubDate
    : formatDate(articleData.pubDate, lang);

  // Badge rəngini müəyyən edirik
  const badgeColorClass = isWebsite ? "bg-green-500" : "bg-orange-500";

  // Read more button mətnini müəyyən edirik
  const readMoreText = isWebsite
    ? (translations as BlogTranslations).websiteReadMore ||
      translations.readMore
    : translations.readMore;

  return (
    <article className="bg-transparent">
      {/* Article Header */}
      <div className="p-6 border-1 rounded-2xl border-[#00000069]">
        <div
          className={`inline-block text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 ${badgeColorClass}`}
        >
          {articleData.source}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
          {articleData.title}
        </h2>

        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
          <span className="font-medium">{formattedDate}</span>
          <span></span>
        </div>

        {articleData.categories && articleData.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {articleData.categories.map((category, catIndex) => (
              <span
                key={catIndex}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Article Content */}
      <div className="py-6">
        <div
          className="prose prose-lg max-w-none
            prose-headings:text-gray-800 prose-headings:font-bold
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
            prose-strong:text-gray-900 prose-strong:font-bold
            prose-em:italic
            prose-ul:my-4 prose-ol:my-4 prose-li:mb-2
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500
            prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
            prose-blockquote:italic prose-blockquote:my-6
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4
            prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-6
            prose-code:bg-gray-100 prose-code:text-red-600 prose-code:px-2
            prose-code:py-1 prose-code:rounded prose-code:text-sm
            prose-pre:prose-code:bg-transparent prose-pre:prose-code:text-inherit
            prose-pre:prose-code:p-0
            prose-img:rounded-lg prose-img:my-6
            prose-figure:my-6 prose-figcaption:text-center prose-figcaption:italic
            prose-figcaption:text-gray-600 prose-figcaption:mt-2 prose-figcaption:text-sm
            max-h-96 overflow-y-auto"
          dangerouslySetInnerHTML={{
            __html: processedContent,
          }}
        />
      </div>

      <Link href={articleData.link}>
        <CtaButton innerText={readMoreText} mode="start" />
      </Link>
    </article>
  );
};
