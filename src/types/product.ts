export interface Product {
  id: string;
  name: string;
  team: string;
  price: number;
  image: string;
  description: string;
  sizes: string[];
  isFeatured?: boolean;
}