// src/types/product.ts

export interface Product {
  id: string;
  name: string;
  team: string;
  price: number;
  image: string; // This will be the main/default image
  galleryImages?: string[]; // New: Optional array of additional image URLs
  description: string;
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  isFeatured?: boolean;
  type: 'club' | 'country' | 'player' | 'retro' | 'training';
  country?: string;
  player?: string;
  year?: number;
}