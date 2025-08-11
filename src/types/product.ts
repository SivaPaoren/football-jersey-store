// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  team: string;
  price: number;
  image: string;
  description: string;
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  isFeatured?: boolean; // Optional, for featured products
  // New fields for categorization
  type: 'club' | 'country' | 'player' | 'retro' | 'training'; // Defines the primary category of the product
  country?: string; // e.g., 'Argentina', 'Brazil', 'England' (for country-based jerseys)
  player?: string; // e.g., 'Messi', 'Ronaldo', 'Neymar' (for player-based jerseys)
  year?: number; // e.g., 1990, 1998 (for retro jerseys)
}