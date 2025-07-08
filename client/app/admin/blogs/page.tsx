"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { MediumService } from "@/services/medium.service";
import { BlogService } from "@/services/blog.service";
import { Article, BlogWebsiteArticles } from "@/types/blogInterface";
import { formatDate } from "@/utils/blog.utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CombinedArticle
  extends Partial<Article>,
    Partial<BlogWebsiteArticles> {
  type: "medium" | "website";
  displayTitle: string;
  displayDate: string;
  displayLink: string;
  displayTags: string[];
}

const AdminBlogsPage: React.FC = () => {
  const [articles, setArticles] = useState<CombinedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "medium" | "website">("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAllArticles();
  }, []);

  const { loading, isAuthenticated } = useAuth();

  const router = useRouter();
  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      router.push("/admin");
    }
  }, [loading, isAuthenticated, router]);

  const fetchAllArticles = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get articles from Medium and api /blogs
      const [mediumArticles, websiteBlogs] = await Promise.allSettled([
        MediumService.fetchArticles(),
        BlogService.fetchWebsiteBlogs("az", "json"),
      ]);

      const combinedArticles: CombinedArticle[] = [];

      // Add Medium articles
      if (mediumArticles.status === "fulfilled") {
        const medium = mediumArticles.value.map((article: Article) => ({
          ...article,
          type: "medium" as const,
          displayTitle: article.title,
          displayDate: formatDate(article.pubDate, "az"),
          displayLink: article.link,
          displayTags: article.categories || [],
        }));
        combinedArticles.push(...medium);
      }

      // Add Website blogs
      if (websiteBlogs.status === "fulfilled" && websiteBlogs.value.success) {
        const website = websiteBlogs.value.data.map(
          (blog: BlogWebsiteArticles) => ({
            ...blog,
            type: "website" as const,
            displayTitle: blog.title,
            displayDate: blog.createdTime,
            displayLink: `/blog/${blog.id}`,
            displayTags: blog.tags || [],
          })
        );
        combinedArticles.push(...website);
      }

      // Sort combined articles by date
      combinedArticles.sort((a, b) => {
        const dateA =
          a.type === "website"
            ? new Date(a.createdAt || "")
            : new Date(a.pubDate || "");
        const dateB =
          b.type === "website"
            ? new Date(b.createdAt || "")
            : new Date(b.pubDate || "");
        return dateB.getTime() - dateA.getTime();
      });

      setArticles(combinedArticles);
    } catch (err) {
      setError("Məqalələr yüklənərkən xəta baş verdi");
      console.error("Error fetching articles:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesFilter = filter === "all" || article.type === filter;
    const matchesSearch =
      article.displayTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.displayTags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  const getArticleStats = () => {
    const total = articles.length;
    const medium = articles.filter((a) => a.type === "medium").length;
    const website = articles.filter((a) => a.type === "website").length;
    return { total, medium, website };
  };

  const stats = getArticleStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Yüklənir...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Blog İdarəetməsi</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Ümumi</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Medium</h3>
            <p className="text-2xl font-bold text-orange-600">{stats.medium}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-500">Website</h3>
            <p className="text-2xl font-bold text-green-600">{stats.website}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <Link
              href="/admin/blogs/create"
              className="inline-flex items-center justify-center w-full h-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Yeni Blog
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Hamısı
            </button>
            <button
              onClick={() => setFilter("medium")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "medium"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setFilter("website")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "website"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Website
            </button>
          </div>

          <div className="flex-1">
            <input
              type="text"
              placeholder="Başlıq və ya tag-a görə axtar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={fetchAllArticles}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            🔄 Yenilə
          </button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>Məqalələr yüklənir...</p>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">{error}</div>
          <button
            onClick={fetchAllArticles}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Yenidən cəhd et
          </button>
        </div>
      ) : filteredArticles.length > 0 ? (
        <div className="grid gap-6">
          {filteredArticles.map((article, index) => (
            <div
              key={`${article.type}-${index}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        article.type === "medium"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {article.type === "medium" ? "Medium" : "Website"}
                    </span>
                    {article.type === "website" && (
                      <span className="text-sm text-gray-500">
                        ID: {article.id}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {article.displayTitle}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">
                    📅 {article.displayDate}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {article.type === "website" ? (
                    <>
                      <Link
                        href={`/admin/blogs/edit/${article.id}`}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                      >
                        ✏️ Redaktə
                      </Link>
                      <Link
                        href={article.displayLink}
                        target="_blank"
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                      >
                        👁️ Bax
                      </Link>
                    </>
                  ) : (
                    <a
                      href={article.displayLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
                    >
                      🔗 Medium-da Aç
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              {article.type === "website" && article.description && (
                <p className="text-gray-700 mb-4 line-clamp-2">
                  {article.description}
                </p>
              )}

              {/* Tags */}
              {article.displayTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.displayTags.slice(0, 5).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                  {article.displayTags.length > 5 && (
                    <span className="text-gray-500 text-xs">
                      +{article.displayTags.length - 5} daha
                    </span>
                  )}
                </div>
              )}

              {/* Additional Info */}
              <div className="text-xs text-gray-500 border-t pt-3">
                {article.type === "website" ? (
                  <div className="flex justify-between">
                    <span>
                      Son dəyişiklik:{" "}
                      {article.updatedAt
                        ? new Date(article.updatedAt).toLocaleDateString(
                            "az-AZ"
                          )
                        : "N/A"}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span>
                      Yaradıcı: {(article as Article).creator || "N/A"}
                    </span>
                    <span>
                      Mənbə: {(article as Article).source || "Medium"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">
            {searchTerm
              ? "Axtarış nəticəsi tapılmadı"
              : "Heç bir məqalə tapılmadı"}
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Axtarışı təmizlə
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminBlogsPage;
