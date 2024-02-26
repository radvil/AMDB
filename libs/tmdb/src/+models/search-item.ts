export type DbTag =
  | "about"
  | "companies"
  | "members"
  | "teams"
  | "awards"
  | "articles"
  | "news"
  | "products"
  | "services"
  | "partners"
  | "clients"
  | "careers"
  | "jobs"
  | "contacts";

export interface DBItem {
  id: string;
  slug: string;
  tags: DbTag[];
  keywords: string[];
}

export interface SearchItem {
  title: string;
  link: string;
  categories: string[];
}

export interface Award extends DBItem {
  name: string;
  date: string;
  imageUrl: string;
  by?: string;
}
