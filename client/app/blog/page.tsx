import { cookies } from "next/headers";

interface Article {
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  content: string;
  categories: string[];
  source: string;
}

const BlogClient = ({
  articles,
  lang,
}: {
  articles: Article[];
  lang: string;
}) => {
  const translations = {
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

  const t = translations[lang as keyof typeof translations] || translations.az;

  const formatDate = (dateString: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Baku",
    };

    return date.toLocaleDateString(lang === "az" ? "az-AZ" : "en-US", options);
  };

  const cleanHTMLContent = (htmlContent: string) => {
    if (!htmlContent) return "";

    // CDATA təmizlə
    let cleanContent = htmlContent.replace(/^\s*<!\[CDATA\[|\]\]>\s*$/g, "");

    // Medium statistika img tag-ini sil
    cleanContent = cleanContent.replace(/<img[^>]*stat\?event[^>]*>/g, "");

    // Lazımsız boşluqları təmizlə
    cleanContent = cleanContent.replace(/\s+/g, " ").trim();

    return cleanContent;
  };

  if (articles.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12 py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-xl opacity-90">{t.subtitle}</p>
          </header>
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">{t.noArticles}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12 py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl opacity-90">{t.subtitle}</p>
        </header>

        {/* Articles Grid */}
        <div className="grid gap-8 max-w-4xl mx-auto">
          {articles.map((article, index) => (
            <article
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Article Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  Medium
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                  {article.title}
                </h2>
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                  <span className="font-medium">
                    {formatDate(article.pubDate)}
                  </span>
                  <span>
                    {t.author} {article.creator}
                  </span>
                </div>
                {article.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {article.categories.map((category, catIndex) => (
                      <span
                        key={catIndex}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Article Content */}
              <div className="p-6">
                <div
                  className="prose prose-lg max-w-none
                    prose-headings:text-gray-800 prose-headings:font-bold
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                    prose-strong:text-gray-900 prose-strong:font-bold
                    prose-em:italic
                    prose-ul:my-4 prose-ol:my-4 prose-li:mb-2
                    prose-blockquote:border-l-4 prose-blockquote:border-blue-500 
                    prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
                    prose-blockquote:italic prose-blockquote:my-6
                    prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 
                    prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-6
                    prose-code:bg-gray-100 prose-code:text-red-600 prose-code:px-2 
                    prose-code:py-1 prose-code:rounded prose-code:text-sm
                    prose-pre:prose-code:bg-transparent prose-pre:prose-code:text-inherit 
                    prose-pre:prose-code:p-0
                    prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
                    prose-figure:my-6 prose-figcaption:text-center prose-figcaption:italic 
                    prose-figcaption:text-gray-600 prose-figcaption:mt-2 prose-figcaption:text-sm
                    max-h-96 overflow-y-auto"
                  dangerouslySetInnerHTML={{
                    __html: cleanHTMLContent(article.content),
                  }}
                />
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                    text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 
                    transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {t.readMore}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

const fetchMediumArticles = async (): Promise<Article[]> => {
  try {
    const proxyUrl = "https://api.allorigins.win/raw?url=";
    const mediumRSSUrl = "https://medium.com/@aghayev233/feed";

    const response = await fetch(proxyUrl + encodeURIComponent(mediumRSSUrl), {
      next: { revalidate: 3600 }, // 1 saat cache
    });

    if (!response.ok) {
      throw new Error("RSS feed yüklənə bilmədi");
    }

    const xmlText = await response.text();

    // Server-side XML parsing
    const { DOMParser } = await import("@xmldom/xmldom");
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    const items = xmlDoc.getElementsByTagName("item");
    const articles: Article[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      const getTextContent = (tagName: string) => {
        const element = item.getElementsByTagName(tagName)[0];
        return element?.textContent || element?.firstChild?.nodeValue || "";
      };

      const title = getTextContent("title")
        .replace(/^\s*<!\[CDATA\[|\]\]>\s*$/g, "")
        .trim();
      const link = getTextContent("link");
      const pubDate = getTextContent("pubDate");
      const creator = getTextContent("dc:creator") || "Ali Aghayev";
      const contentEncoded = getTextContent("content:encoded");

      // Kateqoriyaları topla
      const categoryElements = item.getElementsByTagName("category");
      const categories: string[] = [];
      for (let j = 0; j < categoryElements.length; j++) {
        const categoryText =
          categoryElements[j].textContent ||
          categoryElements[j].firstChild?.nodeValue;
        if (categoryText && categoryText.trim()) {
          categories.push(categoryText.trim());
        }
      }

      articles.push({
        title,
        link,
        pubDate,
        creator,
        content: contentEncoded,
        categories,
        source: "medium",
      });
    }

    return articles;
  } catch (error) {
    console.error("Medium articles fetch error:", error);
    return [];
  }
};

const page = async () => {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";

  // Medium məqalələrini yüklə
  const articles = await fetchMediumArticles();

  return <BlogClient articles={articles} lang={lang} />;
};

export default page;
