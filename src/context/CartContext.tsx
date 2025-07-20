import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { cartReducer } from "./cartReducer";
import type { CartState, CartItem } from "../types/cart";

interface CartContextType {
  cartState: CartState;
  dispatch: React.Dispatch<any>; // For more strict typing, define all action types here
  addToCart: (item: CartItem) => void;
  removeFromCart: (
    id: string,
    selectedSize: string,
    selectedPlayer?: string
  ) => void;
  updateQuantity: (
    id: string,
    selectedSize: string,
    selectedPlayer: string | undefined,
    quantity: number
  ) => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const initialCartState: CartState = { items: [] };
  const [cartState, dispatch] = useReducer(
    cartReducer,
    initialCartState,
    (initial) => {
      // Attempt to load cart from localStorage
      try {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : initial;
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        return initial; // Return initial state if parsing fails
      }
    }
  );

  // Persist cart state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState));
  }, [cartState]);

  const addToCart = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeFromCart = (
    id: string,
    selectedSize: string,
    selectedPlayer?: string
  ) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { id, selectedSize, selectedPlayer },
    });
  };

  const updateQuantity = (
    id: string,
    selectedSize: string,
    selectedPlayer: string | undefined,
    quantity: number
  ) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, selectedSize, selectedPlayer, quantity },
    });
  };

  const cartTotal = cartState.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartState,
        dispatch,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
