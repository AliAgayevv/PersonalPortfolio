import { Article, BlogTranslations } from "@/types/blogInterface";
import { BlogHeader } from "./BlogHeader";
import { ArticleCard } from "./ArticleCard";
import { BlogEmptyState } from "./BlogEmptyState";

interface BlogClientProps {
  articles: Article[];
  translations: BlogTranslations;
  lang: string;
}

export const BlogClient = ({
  articles,
  translations,
  lang,
}: BlogClientProps) => {
  if (articles.length === 0) {
    return <BlogEmptyState translations={translations} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <BlogHeader translations={translations} />

        <div className="grid gap-8 max-w-4xl mx-auto">
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              article={article}
              translations={translations}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
