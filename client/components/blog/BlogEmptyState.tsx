import { BlogTranslations } from "@/types/blogInterface";
import { BlogHeader } from "./BlogHeader";

interface BlogEmptyStateProps {
  translations: BlogTranslations;
}

export const BlogEmptyState = ({ translations }: BlogEmptyStateProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <BlogHeader translations={translations} />
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">{translations.noArticles}</p>
        </div>
      </div>
    </div>
  );
};
