import { BlogTranslations } from "@/types/blogInterface";

export const BLOG_TRANSLATIONS: Record<string, BlogTranslations> = {
  az: {
    title: "Blog",
    subtitle: "Medium məqalələrim və şəxsi yazılarım",
    readMore: "Medium-da oxumağa davam et →",
    author: "Müəllif:",
    loading: "Məqalələr yüklənir...",
    error: "Məqalələr yüklənərkən xəta baş verdi",
    noArticles: "Heç bir məqalə tapılmadı",
  },
  en: {
    title: "Blog",
    subtitle: "My Medium articles and personal writings",
    readMore: "Continue reading on Medium →",
    author: "Author:",
    loading: "Loading articles...",
    error: "Error occurred while loading articles",
    noArticles: "No articles found",
  },
};

export const MEDIUM_RSS_URL = "https://medium.com/@aghayev233/feed";
export const PROXY_URL = "https://api.allorigins.win/raw?url=";
export const CACHE_REVALIDATE_TIME = 3600; // 1 saat
