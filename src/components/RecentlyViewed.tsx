import React from 'react';
import { useRecentlyViewed } from '../context/RecentlyViewedProvider';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const RecentlyViewed: React.FC = () => {
  const { recentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) {
    return <p className="px-4 text-gray-500">No products viewed yet.</p>;
  }

  return (
    <div className="flex overflow-x-auto px-4 space-x-4">
      {recentlyViewed.map((item) => (
        <div
          key={item.id}
          className="min-w-[160px] bg-white shadow-md rounded-lg flex-shrink-0"
        >
            <Link to={`/product/${item.id}`}>
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-24 object-cover rounded-t-lg"
          />
          <div className="p-2">
            <p className="text-sm font-medium truncate">{item.title}</p>
            <p className="text-indigo-600 font-bold text-sm">${item.price.toLocaleString()}</p>
          </div>
          </Link>
          <motion.button 
          whileTap={{ scale: 0.95 }}
          whileHover={{
            scale: 1.5,
            backgroundColor: "#d1d5db",
            color: "black"
          }}
          transition={{ bounceDamping: 10, bounceStiffness: 400 }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-indigo-700 transition">
            Add to Cart
          </motion.button>
        </div>
      ))}
    </div>
  );
};

export default RecentlyViewed;
