import React from "react";
import { BlogTranslations } from "@/types/blogInterface";

interface BlogHeaderProps {
  translations: BlogTranslations;
  className?: string;
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({
  translations,
  className = "",
}) => {
  return (
    <header className={`mt-12 ${className}`}>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        {translations.title}
      </h1>
      <p className="text-xl opacity-90">{translations.subtitle}</p>
    </header>
  );
};
