import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom"; // Import useLocation and Link
import { products } from "../data/products"; // Import products data and Product type
import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard"; // Assuming ProductCard.tsx exists
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext"; // Ensure CartContext.Provider is wrapping your app

const ShopPage: React.FC = () => {
  const location = useLocation(); // Hook to access the current URL's location object

  // State for the products currently displayed after filtering and sorting
  // <<< This is the variable name that must be used consistently in JSX below
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  // State for sorting order
  const [sortOrder, setSortOrder] = useState<
    "popularity" | "price-asc" | "price-desc"
  >("popularity");
  // State for team filter
  const [filterTeam, setFilterTeam] = useState<string>("All");
  // State for size filter
  const [filterSize, setFilterSize] = useState<string>("All");
  // Cart context hook (assuming CartContext is set up)
  const { addToCart } = useCart(); // This line will throw an error if CartContext.Provider is not found higher up

  // Generate unique lists of all teams and sizes from the product data
  const allTeams = ["All", ...new Set(products.map((p) => p.team))].sort();
  const allSizes = ["All", ...new Set(products.flatMap((p) => p.sizes))].sort(
    (a, b) => {
      // Custom sort for sizes: S, M, L, XL, XXL to ensure correct order
      const order = ["S", "M", "L", "XL", "XXL"];
      if (a === "All") return -1; // 'All' comes first in the dropdown
      if (b === "All") return 1;
      return order.indexOf(a) - order.indexOf(b); // Sort based on predefined order
    }
  );

  // Effect hook to apply filtering and sorting whenever dependencies change
  useEffect(() => {
    // 1. Get filter from URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const typeFilter = queryParams.get("type"); // Reads the 'type' parameter (e.g., 'country', 'player', 'featured')

    let currentProducts: Product[] = [...products]; // Start with a fresh copy of all products

    // 2. Apply initial filter from URL (if present)
    if (typeFilter) {
      if (typeFilter === "featured") {
        currentProducts = currentProducts.filter((p) => p.isFeatured);
      } else {
        // Filter by the 'type' property defined in your Product interface
        currentProducts = currentProducts.filter((p) => p.type === typeFilter);
      }
    }

    // 3. Apply local filters (Team and Size)
    if (filterTeam !== "All") {
      currentProducts = currentProducts.filter((p) => p.team === filterTeam);
    }
    if (filterSize !== "All") {
      // Ensure 'p.sizes' is an array of strings before using includes
      currentProducts = currentProducts.filter((p) =>
        p.sizes.includes(filterSize)
      );
    }

    // 4. Apply sorting
    if (sortOrder === "price-asc") {
      currentProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      currentProducts.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "popularity") {
      // Sort by 'isFeatured' first (featured products appear higher), then by ID for stability
      currentProducts.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return a.id.localeCompare(b.id); // Fallback to stable sort by ID
      });
    }

    setDisplayedProducts(currentProducts); // Update the state with the filtered and sorted products
  }, [sortOrder, filterTeam, filterSize, location.search]); // Dependencies: re-run on sort, local filter, or URL change

  // Handle adding product to cart (from the shop page)
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

  // Get the active filter type from the URL for display purposes
  const activeUrlFilterType = new URLSearchParams(location.search).get("type");

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Our Jerseys Collection
      </h1>

      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4 bg-white p-4 rounded-lg shadow-sm">
        {/* Sorting Dropdown */}
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
            onChange={(e) =>
              setSortOrder(
                e.target.value as "popularity" | "price-asc" | "price-desc"
              )
            }
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

        {/* Active Filter Display and Clear Button (only shown if a URL filter is active) */}
        {activeUrlFilterType && (
          <div className="flex items-center space-x-2 mt-4 md:mt-0 md:ml-4">
            <span className="text-gray-700 font-medium whitespace-nowrap">
              Active Filter:{" "}
              <span className="capitalize font-bold">
                {activeUrlFilterType.replace("-", " ")}{" "}
                {/* Display human-readable filter name */}
              </span>
            </span>
            <Link
              to="/shop" // Link back to the shop page without any query parameters to clear filter
              className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Clear
            </Link>
          </div>
        )}
      </div>

      {/* Products Grid Display */}
      {displayedProducts.length > 0 ? ( // <<< Ensure this is 'displayedProducts'
        <motion.div
          layout // Enables layout animations for filtering/sorting changes
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {displayedProducts.map(
              (
                product // <<< Ensure this is 'displayedProducts'
              ) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                </motion.div>
              )
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center text-xl text-gray-600 mt-10">
          No products found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default ShopPage;
