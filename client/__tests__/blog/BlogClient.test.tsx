import { render, screen } from "@testing-library/react";
import { BlogClient } from "@/components/blog/BlogClient";
import { Article, BlogTranslations } from "@/types/blogInterface";

const mockTranslations: BlogTranslations = {
  title: "Blog",
  subtitle: "Test subtitle",
  readMore: "Continue reading →",
  author: "Author:",
  loading: "Loading...",
  error: "Error",
  noArticles: "No articles found",
};

const mockArticles: Article[] = [
  {
    title: "First Article",
    link: "https://medium.com/@test/first",
    pubDate: "Wed, 04 Jun 2025 08:25:06 GMT",
    creator: "Ali Aghayev",
    content: "<p>First article content</p>",
    categories: ["programming"],
    source: "medium",
  },
  {
    title: "Second Article",
    link: "https://medium.com/@test/second",
    pubDate: "Thu, 05 Jun 2025 10:30:00 GMT",
    creator: "Ali Aghayev",
    content: "<p>Second article content</p>",
    categories: ["javascript"],
    source: "medium",
  },
];

describe("BlogClient", () => {
  it("should render blog header", () => {
    render(
      <BlogClient
        articles={mockArticles}
        translations={mockTranslations}
        lang="en"
      />
    );

    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Test subtitle")).toBeInTheDocument();
  });

  it("should render all articles", () => {
    render(
      <BlogClient
        articles={mockArticles}
        translations={mockTranslations}
        lang="en"
      />
    );

    expect(screen.getByText("First Article")).toBeInTheDocument();
    expect(screen.getByText("Second Article")).toBeInTheDocument();
  });

  it("should render empty state when no articles", () => {
    render(
      <BlogClient articles={[]} translations={mockTranslations} lang="en" />
    );

    expect(screen.getByText("No articles found")).toBeInTheDocument();
  });

  it("should pass correct props to ArticleCard components", () => {
    render(
      <BlogClient
        articles={mockArticles}
        translations={mockTranslations}
        lang="az"
      />
    );

    expect(screen.getAllByText(/Author:/)).toHaveLength(2);
    expect(screen.getAllByText("Medium")).toHaveLength(2);
  });
});
