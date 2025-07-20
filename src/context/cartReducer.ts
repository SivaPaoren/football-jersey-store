import type{ CartItem, CartState } from '../types/cart';

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string; selectedSize: string; selectedPlayer?: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; selectedSize: string; selectedPlayer?: string; quantity: number } }
  | { type: 'CLEAR_CART' };

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedPlayer === action.payload.selectedPlayer
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id &&
            item.selectedSize === action.payload.selectedSize &&
            item.selectedPlayer === action.payload.selectedPlayer
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(item.id === action.payload.id &&
              item.selectedSize === action.payload.selectedSize &&
              item.selectedPlayer === action.payload.selectedPlayer)
        ),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id &&
            item.selectedSize === action.payload.selectedSize &&
            item.selectedPlayer === action.payload.selectedPlayer
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter((item) => item.quantity > 0), // Remove if quantity becomes 0 or less
      };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
};