import React from "react";
import type { Product } from "../types/product";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void; // Optional for ShopPage
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden w-full h-48">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col items-start">
        <h3 className="text-lg font-semibold text-gray-800 truncate w-full">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500">{product.team}</p>
        <p className="text-xl font-bold text-gray-900 mt-2">
          ${product.price.toFixed(2)}
        </p>
        {onAddToCart ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAddToCart(product)}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Add to Cart
          </motion.button>
        ) : (
          <Link
            to={`/product/${product.id}`}
            className="mt-4 block text-center w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Buy Now
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
