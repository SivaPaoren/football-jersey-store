import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AboutContactPage from "./pages/AboutContactPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductCustomization from "./components/TeamProductForm";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/about-contact" element={<AboutContactPage />} />
            <Route path="/admin" element={<ProductCustomization />} />
            {/* Optional: Add a 404 Not Found page */}
            <Route
              path="*"
              element={
                <div className="text-center my-20 text-3xl font-bold text-gray-700">
                  404 - Page Not Found
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
