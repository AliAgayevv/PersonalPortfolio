"use client";
import { useAuth } from "@/hooks/useAuth";
import { MediumService } from "@/services/medium.service";
import React from "react";

const page = () => {
  const { loading } = useAuth();
  const [articles, setArticles] = React.useState<any>([]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Yüklənir...
      </div>
    );
  }
  // Medium məqalələrini yüklə
  MediumService.fetchArticles()
    .then((articles) => {
      setArticles(articles);
    })
    .catch((error) => {
      console.error("Error fetching articles:", error);
    });

  articles.map((article: any) => {
    article.type = "medium";
  });
  return (
    <div>
      {articles.length > 0 ? (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Məqalələr</h1>
          <div className="grid gap-8 max-w-4xl mx-auto">
            {articles.map((article: any, index: number) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold mb-2">
                    {article.title}
                  </h2>
                  <p className="border p-2 rounded-2xl bg-blue-500 text-white border-gray-600">
                    {article.type}
                  </p>
                </div>
                <p className="text-gray-700 mb-4">{article.description}</p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Məqaləni oxu
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Məqalələr Yüklənmədi</h1>
        </div>
      )}
    </div>
  );
};

export default page;
