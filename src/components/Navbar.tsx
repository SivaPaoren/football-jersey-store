import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { cartState } = useCart();
  const totalItems = cartState.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="sticky top-0 z-50 bg-white shadow-md p-4"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Football Jerseys
        </Link>
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Shop
          </Link>
          <Link
            to="/about-contact"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            About/Contact
          </Link>
          <Link
            to="/cart"
            className="relative text-gray-600 hover:text-blue-600 transition-colors"
          >
            <span className="text-2xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
