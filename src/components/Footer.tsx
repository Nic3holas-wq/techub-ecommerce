// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Tec<span className="text-indigo-500">Hub</span></h2>
          <p className="text-sm">Your one-stop tech shop for smartphones, laptops, and accessories.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-indigo-400">Home</Link></li>
            <li><Link to="/products" className="hover:text-indigo-400">All Products</Link></li>
            <li><Link to="/cart" className="hover:text-indigo-400">Cart</Link></li>
            <li><Link to="/account" className="hover:text-indigo-400">My Account</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-white mb-2">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-indigo-400">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-indigo-400">FAQ</Link></li>
            <li><Link to="/returns" className="hover:text-indigo-400">Returns</Link></li>
            <li><Link to="/privacy" className="hover:text-indigo-400">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-lg">
            <a href="https://facebook.com" className="hover:text-indigo-400" target="_blank"><FaFacebook /></a>
            <a href="https://twitter.com" className="hover:text-indigo-400" target="_blank"><FaTwitter /></a>
            <a href="https://instagram.com" className="hover:text-indigo-400" target="_blank"><FaInstagram /></a>
            <a href="https://github.com" className="hover:text-indigo-400" target="_blank"><FaGithub /></a>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} TecHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
