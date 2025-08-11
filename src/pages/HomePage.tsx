// src/pages/HomePage.jsx
import React from "react";
import { products } from "../data/products"; // Ensure this import points to your modified products.ts
import ProductCard from "../components/ProductCard"; // Assuming you have a ProductCard component
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Assuming you are using React Router for navigation

// Helper component to render a section of products
const ProductSection = ({ title, products }) => (
  <section className="container mx-auto my-16 px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
      {title}
    </h2>
    {products.length > 0 ? (
      <motion.div
        layout // Enables smooth layout transitions for items
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    ) : (
      <p className="text-center text-gray-600 text-lg">
        No products found in this category.
      </p>
    )}
    <div className="text-center mt-12">
      <Link
        to="/shop" // You might want to link to /shop?category=XYZ for specific category pages
        className="text-blue-600 text-lg font-semibold hover:underline"
      >
        View All {title.replace(" Jerseys", "")} &rarr;
      </Link>
    </div>
  </section>
);

const HomePage = () => {
  // Filter products for the Featured Section
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 6); // Display up to 6 featured

  // Filter products for new categories based on the 'type' property
  const countryBasedProducts = products
    .filter((p) => p.type === "country")
    .slice(0, 6);
  const playerBasedProducts = products
    .filter((p) => p.type === "player")
    .slice(0, 6);
  const retroBasedProducts = products
    .filter((p) => p.type === "retro")
    .slice(0, 6);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-cover bg-center h-[400px] md:h-[600px] flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/hero-banner.jpg')" }} // Placeholder, ensure image exists
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Unleash Your Passion
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
            Discover the latest football jerseys from your favorite teams and
            personalize them.
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300"
            onClick={() => (window.location.href = "/shop")} // Consider using <Link to="/shop"> if using React Router
          >
            Shop Now
          </motion.button>
        </div>
      </motion.section>

      {/* Featured Section */}
      <ProductSection title="Featured Jerseys" products={featuredProducts} />

      <hr className="my-10 border-gray-200" />

      {/* Countries Based Section */}
      {countryBasedProducts.length > 0 && (
        <ProductSection
          title="National Team Jerseys"
          products={countryBasedProducts}
        />
      )}

      <hr className="my-10 border-gray-200" />

      {/* Player Based Section */}
      {playerBasedProducts.length > 0 && (
        <ProductSection
          title="Player Edition Jerseys"
          products={playerBasedProducts}
        />
      )}

      <hr className="my-10 border-gray-200" />

      {/* Retro Based Section */}
      {retroBasedProducts.length > 0 && (
        <ProductSection
          title="Retro Collection"
          products={retroBasedProducts}
        />
      )}
    </div>
  );
};

export default HomePage;
