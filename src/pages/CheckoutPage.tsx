import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CheckoutPage = () => {
  const { cartState, cartTotal, dispatch } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    paymentMethod: "creditCard",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartState.items.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      navigate("/shop");
      return;
    }

    // Simulate order processing
    console.log("Order Details:", {
      items: cartState.items,
      total: cartTotal,
      shippingInfo: formData,
    });

    alert("Order placed successfully! Thank you for your purchase.");
    dispatch({ type: "CLEAR_CART" }); // Clear cart after successful checkout
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Checkout
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
          Shipping Information
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="address"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
                required
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
                required
              />
            </div>
            <div>
              <label
                htmlFor="zipCode"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="country"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
                required
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-6 mt-8 border-b pb-3">
            Payment Information
          </h2>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Payment Method:
            </label>
            <div className="mt-2 flex flex-wrap gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600"
                  name="paymentMethod"
                  value="creditCard"
                  checked={formData.paymentMethod === "creditCard"}
                  onChange={handleInputChange}
                />
                <span className="ml-2 text-gray-700 font-medium">
                  Credit Card
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === "paypal"}
                  onChange={handleInputChange}
                />
                <span className="ml-2 text-gray-700 font-medium">PayPal</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600"
                  name="paymentMethod"
                  value="bankTransfer"
                  checked={formData.paymentMethod === "bankTransfer"}
                  onChange={handleInputChange}
                />
                <span className="ml-2 text-gray-700 font-medium">
                  Bank Transfer
                </span>
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              (This is a placeholder for demonstration. No actual payment
              processing will occur.)
            </p>
          </div>

          <div className="text-center text-3xl font-bold text-gray-800 mb-8 p-4 bg-gray-50 rounded-md border border-gray-200">
            Order Total:{" "}
            <span className="text-blue-600">${cartTotal.toFixed(2)}</span>
          </div>

          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md text-xl font-semibold hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              cartState.items.length === 0 ||
              !formData.fullName ||
              !formData.address ||
              !formData.city ||
              !formData.zipCode ||
              !formData.country ||
              !formData.email
            }
          >
            Place Order
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;
