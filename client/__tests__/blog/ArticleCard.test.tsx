import { render, screen } from "@testing-library/react";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Article, BlogTranslations } from "@/types/blogInterface";

const mockArticle: Article = {
  title: "Test Article",
  link: "https://medium.com/@test/article",
  pubDate: "Wed, 04 Jun 2025 08:25:06 GMT",
  creator: "Ali Aghayev",
  content: "<p>Test article content</p>",
  categories: ["programming", "javascript"],
  source: "medium",
};

const mockTranslations: BlogTranslations = {
  title: "Blog",
  subtitle: "Test subtitle",
  readMore: "Continue reading on Medium →",
  author: "Author:",
  loading: "Loading...",
  error: "Error",
  noArticles: "No articles",
};

describe("ArticleCard", () => {
  it("should render article information correctly", () => {
    render(
      <ArticleCard
        article={mockArticle}
        translations={mockTranslations}
        lang="en"
      />
    );

    const titleElement = screen.getByText("Test Article");
    expect(titleElement).toBeTruthy();

    const authorElement = screen.getByText("Author: Ali Aghayev");
    expect(authorElement).toBeTruthy();

    const mediumBadge = screen.getByText("Medium");
    expect(mediumBadge).toBeTruthy();
  });

  it("should render categories correctly", () => {
    render(
      <ArticleCard
        article={mockArticle}
        translations={mockTranslations}
        lang="en"
      />
    );

    const programmingTag = screen.getByText("programming");
    const javascriptTag = screen.getByText("javascript");

    expect(programmingTag).toBeTruthy();
    expect(javascriptTag).toBeTruthy();
  });

  it("should render read more link with correct href", () => {
    render(
      <ArticleCard
        article={mockArticle}
        translations={mockTranslations}
        lang="en"
      />
    );

    const readMoreLink = screen.getByRole("link", {
      name: /continue reading/i,
    });
    expect(readMoreLink).toHaveAttribute("href", mockArticle.link);
    expect(readMoreLink).toHaveAttribute("target", "_blank");
  });

  it("should not render categories section when no categories", () => {
    const articleWithoutCategories = { ...mockArticle, categories: [] };

    render(
      <ArticleCard
        article={articleWithoutCategories}
        translations={mockTranslations}
        lang="en"
      />
    );

    const programmingTag = screen.queryByText("programming");
    expect(programmingTag).toBeNull();
  });

  it("should render article content with HTML", () => {
    render(
      <ArticleCard
        article={mockArticle}
        translations={mockTranslations}
        lang="en"
      />
    );

    const contentElement = screen.getByText("Test article content");
    expect(contentElement).toBeTruthy();
  });
});
