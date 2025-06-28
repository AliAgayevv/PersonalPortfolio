import { Article, BlogTranslations } from "@/types/blogInterface";
import { formatDate, cleanHTMLContent } from "@/utils/blog.utils";

interface ArticleCardProps {
  article: Article;
  translations: BlogTranslations;
  lang: string;
}

export const ArticleCard = ({
  article,
  translations,
  lang,
}: ArticleCardProps) => {
  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Article Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
          Medium
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
          {article.title}
        </h2>
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
          <span className="font-medium">
            {formatDate(article.pubDate, lang)}
          </span>
          <span>
            {translations.author} {article.creator}
          </span>
        </div>
        {article.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.categories.map((category, catIndex) => (
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
      <div className="p-6">
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
            prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
            prose-figure:my-6 prose-figcaption:text-center prose-figcaption:italic
            prose-figcaption:text-gray-600 prose-figcaption:mt-2 prose-figcaption:text-sm
            max-h-96 overflow-y-auto"
          dangerouslySetInnerHTML={{
            __html: cleanHTMLContent(article.content),
          }}
        />
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600
            text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700
            transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          {translations.readMore}
        </a>
      </div>
    </article>
  );
};
