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

export interface BlogWebsiteArticles {
  id: string;
  title: string;
  description: string;
  content: string;
  createdTime: string;
  tags: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

// This is not MEDIUM API, this is my own website articles, came from /api/blogs
// i know, bad naming, but i will fix it later (i hope)
export interface BlogWebsiteRes {
  success: boolean;
  data: BlogWebsiteArticles[];
  count: number;
}

export interface BlogTranslations {
  title: string;
  subtitle: string;
  readMore: string;
  websiteReadMore?: string;
  author: string;
  loading: string;
  error: string;
  noArticles: string;
}

export interface BlogAPIError {
  success: false;
  message: string;
  statusCode?: number;
}

export interface BlogServiceResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface BlogMetadata {
  title: string;
  description: string;
  author?: string;
  publishedTime?: string;
  tags?: string[];
  images?: string[];
}
