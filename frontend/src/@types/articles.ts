export interface ArticlesResponse {
  current_page: number;
  data: Article[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  category: Category;
  source: Source;
  author: string;
  publish_date: Date;
  created_at: null;
  updated_at: null;
}

export const categories = [
  "travel",
  "business",
  "sports",
  "news",
  "innovation",
  "culture",
  "lifestyle",
  "arts",
  "home",
  "world",
  "politics"
] as const;

export const sources = ["bbc", "nytimes", "theguardian"] as const;

export type Source = (typeof sources)[number];
export type Category = (typeof categories)[number];

export const sourceLabels: Record<Source, string> = {
  bbc: "BBC",
  nytimes: "New York Times",
  theguardian: "The Guardian",
};
interface Categories {
    [key: string]: Category[];
  }
export const availableCategories: Categories = {
    bbc: ['travel', 'business', 'news', 'innovation', 'culture', 'arts', 'home'],
    theguardian: ['politics', 'sports', 'culture', 'lifestyle'],
    nytimes: ['world', 'business', 'lifestyle'],
  };

export const images: Record<Source, string> = {
  bbc: "https://ichef.bbci.co.uk/images/ic/1920x1080/p09xtmrp.jpg",
  nytimes:
    "https://www.chicano.ucla.edu/files/styles/large/public/New-York-Times-Square%20Logo.png?itok=9PxnoguY",
  theguardian:
    "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/zdsd0p0s7rzdz0ngosap",
};
export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

export interface ListItem {
  title: string;
  tags: string;
  company: string;
  location: string;
  email: string;
  website: string;
  description: string;
}

export interface ArticleFilters {
  category?: string;
  source?: string;
  author?: string;
  start_date?: string;
  end_date?: string;
  search_term?: string;
  page?: number;
  limit?: number;
}

export interface DatePickerFilter {
  start_date: Date | null;
  end_date: Date | null;
}

export type searchOrFilter = "search" | "filter";
export const DateFormat = "YYYY-MM-DD";
