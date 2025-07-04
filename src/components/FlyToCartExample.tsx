import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function FlyToCartExample() {
  const cartRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [flying, setFlying] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [flyStartPos, setFlyStartPos] = useState({ top: 0, left: 0 });

  const handleAddToCart = () => {
    if (!imgRef.current || !cartRef.current) return;

    const imgRect = imgRef.current.getBoundingClientRect();
    const cartRect = cartRef.current.getBoundingClientRect();

    const x = cartRect.left - imgRect.left;
    const y = cartRect.top - imgRect.top;

    setFlyStartPos({ top: imgRect.top, left: imgRect.left });
    setCoords({ x, y });
    setFlying(true);

    setTimeout(() => {
      setFlying(false);
    }, 700);
  };

  return (
    <div className="relative min-h-screen p-10 flex flex-col items-center justify-center">
      {/* Cart Icon */}
      <div
        ref={cartRef}
        className="fixed top-6 right-6 w-12 h-12 bg-gray-800 text-white flex items-center justify-center rounded-full"
      >
        🛒
      </div>

      {/* Product */}
      <div className="p-6 border rounded shadow text-center">
        <img
          ref={imgRef}
          src="https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/57/9617603/1.jpg?7652"
          alt="Product"
          className="w-32 mx-auto"
        />
        <p className="my-2">Cool Product</p>
        <button
          onClick={handleAddToCart}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add to Cart
        </button>
      </div>

      {/* Flying Image Clone */}
      {flying && (
        <motion.img
          src="https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/57/9617603/1.jpg?7652"
          initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: 0.3,
            x: coords.x,
            y: coords.y,
            opacity: 0,
          }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="w-32 h-32 object-cover rounded-full absolute z-50 pointer-events-none"
          style={{
            top: flyStartPos.top,
            left: flyStartPos.left,
            position: 'fixed',
          }}
        />
      )}
    </div>
  );
}
