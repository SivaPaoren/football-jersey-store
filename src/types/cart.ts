export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  selectedSize: string;
  selectedPlayer?: string; // For customization
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}