import { BlogTranslations } from "@/types/blogInterface";

interface BlogHeaderProps {
  translations: BlogTranslations;
}

export const BlogHeader = ({ translations }: BlogHeaderProps) => {
  return (
    <header className="text-center mb-12 py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        {translations.title}
      </h1>
      <p className="text-xl opacity-90">{translations.subtitle}</p>
    </header>
  );
};
