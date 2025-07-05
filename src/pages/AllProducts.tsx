
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import type { Product } from "../types/Product";


const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
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
    fetch("http://192.168.43.102:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products", err);
        setLoading(false);
      });
  }, []);

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

    setTimeout(() => {
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.images[0],
      });
    }, 700);
  };

  if (loading) return <p className="text-center mt-20">Loading products...</p>;

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-10 mt-20">
      <div
        ref={cartRef}
        className="fixed top-5 right-6 w-12 h-12 z-50 pointer-events-none"
      ></div>

      <p className="text-2xl text-center font-bold mb-6 text-indigo-600">Products</p>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white text-center rounded-lg shadow-lg p-2 flex flex-col items-center"
          >
            <Link to={`/product/${product.id}`} className="w-full">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-40 object-cover rounded-t-md"
              />
              <p className="text-sm text-gray-600 truncate">{product.title}</p>
              <p className="text-indigo-900 font-bold text-md">
                Ksh {product.price.toLocaleString()}
              </p>
              <p className="text-red-600 text-sm line-through">
                Ksh {(product.price * 1.1).toFixed(0)}
              </p>
            </Link>
            <motion.button
              onClick={(e) => handleAddToCart(product, e)}
              whileTap={{ scale: 0.95 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#d1d5db",
                color: "black",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-indigo-600 text-white px-2 text-sm py-2 rounded-lg mt-2 hover:bg-indigo-700 transition"
            >
              Add to Cart
            </motion.button>
          </div>
        ))}
      </div>

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

export default AllProducts;
