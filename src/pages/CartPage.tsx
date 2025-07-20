import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CartPage = () => {
  const { cartState, removeFromCart, updateQuantity, cartTotal } = useCart();

  const handleQuantityChange = (
    id: string,
    selectedSize: string,
    selectedPlayer: string | undefined,
    quantity: number
  ) => {
    if (quantity < 1) {
      removeFromCart(id, selectedSize, selectedPlayer); // Remove item if quantity goes to 0
    } else {
      updateQuantity(id, selectedSize, selectedPlayer, quantity);
    }
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Your Shopping Cart
      </h1>

      <AnimatePresence>
        {cartState.items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-10 text-gray-600 bg-white rounded-lg shadow-md"
          >
            <p className="text-2xl mb-4">Your cart is empty.</p>
            <Link
              to="/shop"
              className="text-blue-600 hover:underline text-lg font-semibold"
            >
              Start shopping now!
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              {cartState.items.map((item) => (
                <motion.div
                  key={`${item.id}-${item.selectedSize}-${
                    item.selectedPlayer || ""
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  layout
                  className="flex flex-col sm:flex-row items-center border-b border-gray-200 py-4 last:border-b-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-md mr-4 mb-4 sm:mb-0 flex-shrink-0"
                  />
                  <div className="flex-grow text-center sm:text-left mb-4 sm:mb-0">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Size: {item.selectedSize}
                    </p>
                    {item.selectedPlayer && (
                      <p className="text-gray-600 text-sm">
                        Player: {item.selectedPlayer}
                      </p>
                    )}
                    <p className="text-blue-600 font-bold mt-1 text-lg">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 flex-shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        handleQuantityChange(
                          item.id,
                          item.selectedSize,
                          item.selectedPlayer,
                          item.quantity - 1
                        )
                      }
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      -
                    </motion.button>
                    <span className="font-semibold text-gray-800 w-8 text-center">
                      {item.quantity}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        handleQuantityChange(
                          item.id,
                          item.selectedSize,
                          item.selectedPlayer,
                          item.quantity + 1
                        )
                      }
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      +
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        removeFromCart(
                          item.id,
                          item.selectedSize,
                          item.selectedPlayer
                        )
                      }
                      className="text-red-600 hover:text-red-800 ml-4 p-2 rounded-full hover:bg-red-100 transition-colors"
                      title="Remove item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm2 3a1 1 0 011-1h4a1 1 0 110 2H10a1 1 0 01-1-1zm-1 3a1 1 0 000 2h4a1 1 0 100-2H8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
              {" "}
              {/* Sticky for larger screens */}
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <span className="text-lg text-gray-700">Subtotal:</span>
                <span className="text-lg font-bold text-gray-900">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg text-gray-700">Shipping:</span>
                <span className="text-lg font-bold text-gray-900">
                  Free
                </span>{" "}
                {/* Placeholder */}
              </div>
              <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-200">
                <span className="text-xl font-bold text-gray-800">Total:</span>
                <span className="text-xl font-bold text-blue-600">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <Link
                to="/checkout"
                className="block w-full text-center bg-blue-600 text-white py-3 rounded-md text-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartPage;
