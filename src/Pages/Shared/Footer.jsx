import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiX } from "react-icons/si"; // New X logo

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-300 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition">
                Books
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <p className="mb-2">📍 123 Book St, Literature City</p>
          <p className="mb-2">📞 +880 123 456 789</p>
          <p className="mb-2">✉️ support@bookcourier.com</p>
        </div>

        {/* Social Icons */}
        <div>
          <h2 className="text-xl font-bold mb-4">Follow Us</h2>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-gray-300 transition">
              <SiX size={24} />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm">
        &copy; {new Date().getFullYear()} BookCourier. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
