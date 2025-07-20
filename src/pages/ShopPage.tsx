import React, { useState, useEffect } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/product"; //type inserted
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const ShopPage = () => {
  const [displayedProducts, setDisplayedProducts] =
    useState<Product[]>(products);
  const [sortOrder, setSortOrder] = useState<
    "popularity" | "price-asc" | "price-desc"
  >("popularity");
  const [filterTeam, setFilterTeam] = useState<string>("All");
  const [filterSize, setFilterSize] = useState<string>("All");
  const { addToCart } = useCart();

  const allTeams = ["All", ...new Set(products.map((p) => p.team))].sort();
  // Ensure 'All' is first, then sort unique sizes
  const allSizes = ["All", ...new Set(products.flatMap((p) => p.sizes))].sort(
    (a, b) => {
      // Custom sort for sizes: S, M, L, XL, XXL
      const order = ["S", "M", "L", "XL", "XXL"];
      if (a === "All") return -1;
      if (b === "All") return 1;
      return order.indexOf(a) - order.indexOf(b);
    }
  );

  useEffect(() => {
    let filtered = [...products];

    // Apply filters
    if (filterTeam !== "All") {
      filtered = filtered.filter((p) => p.team === filterTeam);
    }
    if (filterSize !== "All") {
      filtered = filtered.filter((p) => p.sizes.includes(filterSize));
    }

    // Apply sorting
    if (sortOrder === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "popularity") {
      // For dummy data, "popularity" could be based on 'isFeatured' then random,
      // or just random for dynamic feel. Here, we'll feature first, then by ID.
      filtered.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return a.id.localeCompare(b.id); // Stable sort
      });
    }
    setDisplayedProducts(filtered);
  }, [sortOrder, filterTeam, filterSize]);

  const handleAddToCart = (product: Product) => {
    // For simplicity, when adding from Shop Page, pick the first available size.
    // Full size selection and player customization is on Product Detail Page.
    const defaultSize = product.sizes.length > 0 ? product.sizes[0] : "M"; // Fallback to 'M'
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedSize: defaultSize,
      quantity: 1,
    });
    alert(`${product.name} (Size: ${defaultSize}) added to cart!`);
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Our Jerseys Collection
      </h1>

      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4 bg-white p-4 rounded-lg shadow-sm">
        {/* Sorting */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <label
            htmlFor="sort"
            className="text-gray-700 font-medium whitespace-nowrap"
          >
            Sort by:
          </label>
          <select
            id="sort"
            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
          >
            <option value="popularity">Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Filtering by Team */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <label
            htmlFor="filterTeam"
            className="text-gray-700 font-medium whitespace-nowrap"
          >
            Team:
          </label>
          <select
            id="filterTeam"
            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
            value={filterTeam}
            onChange={(e) => setFilterTeam(e.target.value)}
          >
            {allTeams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        {/* Filtering by Size */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <label
            htmlFor="filterSize"
            className="text-gray-700 font-medium whitespace-nowrap"
          >
            Size:
          </label>
          <select
            id="filterSize"
            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full"
            value={filterSize}
            onChange={(e) => setFilterSize(e.target.value)}
          >
            {allSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <motion.div
        layout // Enables layout animations for filtering/sorting changes
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <AnimatePresence>
          {displayedProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {displayedProducts.length === 0 && (
        <div className="text-center text-xl text-gray-600 mt-10">
          No products found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default ShopPage;
