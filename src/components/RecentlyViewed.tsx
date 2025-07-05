import React, { useRef, useState } from 'react';
import { useRecentlyViewed } from '../context/RecentlyViewedProvider';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
//import toast from 'react-hot-toast';
import type { Product } from '../types/Product';


const RecentlyViewed: React.FC = () => {
  const { recentlyViewed } = useRecentlyViewed();
  const { addToCart } = useCart();

  const cartRef = useRef<HTMLDivElement | null>(null);
  const [flyingImage, setFlyingImage] = useState<{
    src: string;
    top: number;
    left: number;
    x: number;
    y: number;
  } | null>(null);

  const handleAddToCart = (
    product: Product,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const img = (e.currentTarget.parentElement as HTMLElement).querySelector("img");
    if (!img || !cartRef.current) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartRef.current.getBoundingClientRect();

    const x = cartRect.left - imgRect.left;
    const y = cartRect.top - imgRect.top;

    setFlyingImage({
      src: product.images[0],
      top: imgRect.top,
      left: imgRect.left,
      x,
      y,
    });

    // Delay adding to cart
    setTimeout(() => {
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.images[0],
      });
      //toast.success(`${product.title} added to cart`);
    }, 700);
  };

  if (recentlyViewed.length === 0) {
    return <p className="px-4 text-gray-500">No products viewed yet.</p>;
  }

  return (
    <div className="relative">
      {/* Cart Icon Reference */}
      <div
        ref={cartRef}
        className="fixed top-5 right-6 w-12 h-12 z-50 pointer-events-none"
      ></div>

      {/* Recently Viewed Items */}
      <div className="flex overflow-x-auto px-4 space-x-4">
        {recentlyViewed.map((item) => (
          <div
            key={item.id}
            className="min-w-[160px] text-center bg-white shadow-md rounded-lg flex-shrink-0"
          >
            <Link to={`/product/${item.id}`} className="flex flex-col text-center">
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
                scale: 1.1,
                backgroundColor: "#d1d5db",
                color: "black"
              }}
              transition={{ type: "spring", damping: 10, stiffness: 300 }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-indigo-700 transition"
              onClick={(e) => handleAddToCart(item, e)}
            >
              Add to Cart
            </motion.button>
          </div>
        ))}
      </div>

      {/* Flying Image */}
      {flyingImage && (
        <motion.img
          src={flyingImage.src}
          initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: 0.3,
            x: flyingImage.x,
            y: flyingImage.y,
            opacity: 0,
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="w-24 h-24 object-cover rounded-full absolute z-[1000] pointer-events-none"
          style={{
            top: flyingImage.top,
            left: flyingImage.left,
            position: "fixed",
          }}
          onAnimationComplete={() => setFlyingImage(null)}
        />
      )}
    </div>
  );
};

export default RecentlyViewed;
