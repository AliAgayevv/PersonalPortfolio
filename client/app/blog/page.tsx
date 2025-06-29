import { cookies } from "next/headers";
import { BlogClient } from "@/components/blog/BlogClient";
import { MediumService } from "@/services/medium.service";
import { BLOG_TRANSLATIONS } from "@/constants/blog.constants";
import { Metadata } from "next";

// Base URL helper function

export async function generateMetadata(): Promise<Metadata> {
  try {
    const articles = await MediumService.fetchArticles();
    const title = articles[0]?.title + " - Bloglar" || "Əlinin Blogları";
    const baseUrl = "https://aghayev.dev";

    return {
      title: title,
      description: articles[0]?.title || "Medium məqalələri və bloq yazıları",
      openGraph: {
        title: title,
        description: articles[0]?.title || "Medium məqalələri və bloq yazıları",
        images: [
          {
            url: `${baseUrl}/api/og?title=${encodeURIComponent(title)}`,
            alt: title,
            width: 1200,
            height: 630,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: articles[0]?.title || "Medium məqalələri və bloq yazıları",
        images: [`${baseUrl}/api/og?title=${encodeURIComponent(title)}`],
      },
    };
  } catch (error) {
    console.error("Metadata generation error:", error);

    // Fallback metadata if API fails
    const baseUrl = "https://aghayev.dev";
    const defaultTitle = "Əlinin Blogları";

    return {
      title: defaultTitle,
      description: "Medium məqalələri və bloq yazıları",
      openGraph: {
        title: defaultTitle,
        description: "Medium məqalələri və bloq yazıları",
        images: [
          {
            url: `${baseUrl}/api/og?title=${encodeURIComponent(defaultTitle)}`,
            alt: defaultTitle,
            width: 1200,
            height: 630,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: defaultTitle,
        description: "Medium məqalələri və bloq yazıları",
        images: [`${baseUrl}/api/og?title=${encodeURIComponent(defaultTitle)}`],
      },
    };
  }
}

const page = async () => {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";

  // Medium məqalələrini yüklə
  const articles = await MediumService.fetchArticles();
  const translations = BLOG_TRANSLATIONS[lang] || BLOG_TRANSLATIONS.az;

  console.log(articles);

  return (
    <BlogClient articles={articles} translations={translations} lang={lang} />
  );
};

export default page;
