// app/blog/page.tsx
import { cookies } from "next/headers";
import { BlogClient } from "@/components/blog/BlogClient";
import { MediumService } from "@/services/medium.service";
import { BLOG_TRANSLATIONS } from "@/constants/blog.constants";

const page = async () => {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";

  // Medium məqalələrini yüklə
  const articles = await MediumService.fetchArticles();
  const translations = BLOG_TRANSLATIONS[lang] || BLOG_TRANSLATIONS.az;

  return (
    <BlogClient articles={articles} translations={translations} lang={lang} />
  );
};

export default page;
