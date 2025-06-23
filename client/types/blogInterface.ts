export interface Article {
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  content: string;
  categories: string[];
  source: string;
}

export interface BlogTranslations {
  title: string;
  subtitle: string;
  readMore: string;
  author: string;
  loading: string;
  error: string;
  noArticles: string;
}
