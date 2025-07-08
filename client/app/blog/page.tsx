import React from "react";
import { cookies } from "next/headers";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { BlogClient } from "@/components/blog/BlogClient";
import { MediumService } from "@/services/medium.service";
import { BlogService } from "@/services/blog.service";
import { BLOG_TRANSLATIONS } from "@/constants/blog.constants";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogTranslations } from "@/types/blogInterface";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://aghayev.dev";
  const defaultTitle = "Əlinin Blogları";
  const defaultDescription = "Medium məqalələri və bloq yazılarım";

  try {
    const articles = await MediumService.fetchArticles();
    const title = articles[0]?.title
      ? `${articles[0].title} - Bloglar`
      : defaultTitle;

    return {
      title,
      description: articles[0]?.title || defaultDescription,
      openGraph: {
        title,
        description: articles[0]?.title || defaultDescription,
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
        title,
        description: articles[0]?.title || defaultDescription,
        images: [`${baseUrl}/api/og?title=${encodeURIComponent(title)}`],
      },
    };
  } catch (error) {
    console.error("Metadata generation error:", error);

    return {
      title: defaultTitle,
      description: defaultDescription,
      openGraph: {
        title: defaultTitle,
        description: defaultDescription,
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
        description: defaultDescription,
        images: [`${baseUrl}/api/og?title=${encodeURIComponent(defaultTitle)}`],
      },
    };
  }
}

const BlogPage: React.FC = async () => {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";

  const translations: BlogTranslations =
    BLOG_TRANSLATIONS[lang] || BLOG_TRANSLATIONS.az;

  // Get all articles from Medium and website blogs
  const { mediumArticles, websiteBlogs } = await BlogService.fetchAllArticles(
    lang,
    MediumService
  );

  const hasNoContent =
    mediumArticles.length === 0 &&
    (!websiteBlogs.success || websiteBlogs.data.length === 0);

  return (
    <div className="mx-auto px-4 py-8">
      <BlogHeader translations={translations} />

      {mediumArticles.length > 0 && (
        <section className="mb-12">
          <BlogClient
            articles={mediumArticles}
            translations={translations}
            lang={lang}
          />
        </section>
      )}
      {websiteBlogs.success && websiteBlogs.data.length > 0 && (
        <section className="mb-12">
          <div className="space-y-8">
            {websiteBlogs.data.map((blog) => (
              <ArticleCard
                key={blog.id}
                article={blog}
                translations={translations}
                lang={lang}
                isWebsiteArticle={true}
              />
            ))}
          </div>
        </section>
      )}

      {hasNoContent && (
        <section className="text-center py-12">
          <div className="text-gray-500 text-lg">{translations.noArticles}</div>
        </section>
      )}
    </div>
  );
};

export default BlogPage;
