import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from "../context/CartContext";
//import toast from "react-hot-toast";

interface Tablet {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
}

const TabletList: React.FC = () => {
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const cartRef = useRef<HTMLDivElement | null>(null);
  const [flyingImage, setFlyingImage] = useState<{
    src: string;
    top: number;
    left: number;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    fetch("http://192.168.43.102:5000/api/tablets")
      .then((res) => res.json())
      .then((data) => {
        setTablets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load tablets", err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (
    tablet: Tablet,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const img = (e.currentTarget.parentElement as HTMLElement).querySelector("img");
    if (!img || !cartRef.current) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartRef.current.getBoundingClientRect();

    const x = cartRect.left - imgRect.left;
    const y = cartRect.top - imgRect.top;

    setFlyingImage({
      src: tablet.image,
      top: imgRect.top,
      left: imgRect.left,
      x,
      y,
    });

    setTimeout(() => {
      addToCart({
        id: tablet.id,
        name: tablet.name,
        price: tablet.price,
        image: tablet.image
      });
      //toast.success(`${tablet.name} added to cart`);
    }, 700);
  };

  if (loading) return <p className="text-center">Loading tablets...</p>;

  return (
    <div className="relative">
      {/* Cart icon */}
      <div
        ref={cartRef}
        className="fixed top-5 right-6 w-12 h-12 z-50"
      >
        
      </div>

      {/* Tablet list */}
      <div className="flex gap-4 overflow-x-auto px-2 py-4">
  {tablets.map((tablet) => (
    <div
      key={tablet.id}
      className="w-40 bg-white flex-shrink-0 flex flex-col items-center justify-between rounded-lg shadow-md pb-4 px-2"
    >
      <Link to={`/product/${tablet.id}`} className="w-full text-center">
        <img
          src={tablet.image}
          alt={tablet.name}
          className="w-full h-32 object-cover rounded-t-lg"
        />
        <span className="text-xs text-gray-600 font-medium mt-2 line-clamp-2 h-10">
          {tablet.name}
        </span>
        <span className="text-indigo-900 font-bold text-sm mt-1">
          ${tablet.price.toLocaleString()}
        </span>
        <span className="text-red-600 text-xs line-through">
          ${(tablet.price * 1.1).toFixed(0)}
        </span>
      </Link>

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{
          scale: 1.05,
          backgroundColor: "#d1d5db",
          color: "black"
        }}
        transition={{ bounceDamping: 10, bounceStiffness: 400 }}
        className="bg-indigo-600 text-white px-3 py-1.5 text-xs rounded-lg mt-3 hover:bg-indigo-700 transition"
        onClick={(e) => handleAddToCart(tablet, e)}
      >
        Add to Cart
      </motion.button>
    </div>
  ))}
</div>


      {/* Flying image animation */}
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
          className="w-32 h-32 object-cover rounded-full absolute z-[1000] pointer-events-none"
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

export default TabletList;
