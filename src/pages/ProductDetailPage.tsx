import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products"; // Ensure this imports from your updated products.ts
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  // Ensure 'product' is typed as 'Product' for better type inference if using TypeScript
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  // New state for the currently displayed large image
  const [currentDisplayedImage, setCurrentDisplayedImage] =
    useState<string>("");

  useEffect(() => {
    // Set initial selected size to the first available size if product exists
    if (product && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    // Set initial displayed image to the first gallery image or the default image
    if (product) {
      setCurrentDisplayedImage(
        product.galleryImages && product.galleryImages.length > 0
          ? product.galleryImages[0]
          : product.image
      );
    }
  }, [product]); // Dependency array includes product to re-run if product changes (e.g., if ID changes dynamically)

  if (!product) {
    return (
      <div className="text-center my-10 text-xl text-gray-700">
        Product not found.
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image, // Use the default product image for the cart item thumbnail
      selectedSize: selectedSize,
      selectedPlayer:
        selectedPlayer.trim() !== "" ? selectedPlayer.trim() : undefined,
      quantity: 1,
    });
    alert(
      `${product.name} (Size: ${selectedSize}${
        selectedPlayer ? `, Player: ${selectedPlayer}` : ""
      }) added to cart!`
    );
  };

  // Determine which images to show in the gallery
  const imagesToDisplay =
    product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages
      : [product.image]; // Fallback to just the main image if no gallery

  return (
    <div className="container mx-auto my-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-lg shadow-lg"
      >
        {/* Product Image Gallery */}
        <div className="md:w-1/2 flex flex-col items-center">
          {/* Main Display Image */}
          <motion.img
            key={currentDisplayedImage} // Key helps Framer Motion re-animate on image change
            src={currentDisplayedImage}
            alt={product.name}
            className="w-full max-w-md h-auto object-contain rounded-md shadow-md mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Thumbnail Gallery */}
          {imagesToDisplay.length > 1 && ( // Only show thumbnails if more than one image
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {imagesToDisplay.map((imgUrl, index) => (
                <motion.img
                  key={index}
                  src={imgUrl}
                  alt={`${product.name} - View ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all duration-200 ${
                    currentDisplayedImage === imgUrl
                      ? "border-blue-600 shadow-md"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  onClick={() => setCurrentDisplayedImage(imgUrl)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details and Form */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-xl text-gray-600 mb-4">{product.team}</p>
            <p className="text-3xl font-bold text-blue-600 mb-6">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-6">
              <label
                htmlFor="size"
                className="block text-lg font-semibold text-gray-800 mb-2"
              >
                Select Size:
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-gray-700 font-medium ${
                      selectedSize === size
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                    } transition-all duration-200`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-red-500 text-sm mt-2">
                  Please select a size.
                </p>
              )}
            </div>

            {/* Player Name / Customization */}
            <div className="mb-6">
              <label
                htmlFor="player-name"
                className="block text-lg font-semibold text-gray-800 mb-2"
              >
                Customize with Player Name & Number (Optional):
              </label>
              <input
                type="text"
                id="player-name"
                value={selectedPlayer}
                onChange={(e) => setSelectedPlayer(e.target.value)}
                placeholder="E.g., MESSI 10"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
                maxLength={20} // Limit input length
              />
              <p className="text-sm text-gray-500 mt-1">Max 20 characters.</p>
            </div>
          </div>

          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors duration-200 mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedSize}
          >
            Add to Cart
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetailPage;
