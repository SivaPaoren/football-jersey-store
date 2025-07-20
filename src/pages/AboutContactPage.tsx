import React from "react";
import { motion } from "framer-motion";

const AboutContactPage = () => {
  return (
    <div className="container mx-auto my-8 px-4">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 text-gray-800"
      >
        About Us & Contact
      </motion.h1>

      <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          About Our Store
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-700 leading-relaxed mb-4"
        >
          Welcome to **Football Jerseys Store**, your ultimate destination for
          authentic football jerseys from clubs and national teams worldwide. We
          are passionate about the beautiful game and committed to bringing you
          the highest quality products.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-700 leading-relaxed"
        >
          Our mission is to provide fans with an easy and enjoyable shopping
          experience, offering a wide selection of jerseys, competitive prices,
          and excellent customer service. Whether you're cheering from the
          stands or playing on the pitch, we've got you covered with the latest
          kits and classic designs.
        </motion.p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Contact Us
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-gray-700 leading-relaxed mb-4"
        >
          Have questions, feedback, or need assistance with your order? Don't
          hesitate to reach out! Our team is ready to help.
        </motion.p>
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="list-disc list-inside text-gray-700 mb-6 space-y-2"
        >
          <li>
            **Email:**{" "}
            <a
              href="mailto:support@footballjerseys.com"
              className="text-blue-600 hover:underline"
            >
              support@footballjerseys.com
            </a>
          </li>
          <li>
            **Phone:**{" "}
            <a
              href="tel:+15551234567"
              className="text-blue-600 hover:underline"
            >
              +1 (555) 123-4567
            </a>{" "}
            (Available 9:00 AM - 5:00 PM EST, Mon-Fri)
          </li>
          <li>
            **Address:** Football Jerseys Store HQ, 123 Goal Street, Score City,
            FC 12345, World
          </li>
        </motion.ul>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="text-gray-700 leading-relaxed"
        >
          We aim to respond to all inquiries within 24-48 business hours. Thank
          you for your patience!
        </motion.p>
      </div>
    </div>
  );
};

export default AboutContactPage;
