import { Article, BlogTranslations } from "@/types/blogInterface";
import {} from "./BlogHeader";
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
    <div className="">
      <div className="">
        <div className="grid gap-8 mt-8 mx-auto">
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
