import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
//import toast from "react-hot-toast";

interface Phone {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
}

const PhoneList: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
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
    fetch("http://192.168.43.102:5000/api/phones")
      .then((res) => res.json())
      .then((data) => {
        setPhones(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load phones", err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (
    phone: Phone,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const img = (e.currentTarget.parentElement as HTMLElement).querySelector("img");
    if (!img || !cartRef.current) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartRef.current.getBoundingClientRect();

    const x = cartRect.left - imgRect.left;
    const y = cartRect.top - imgRect.top;

    setFlyingImage({
      src: phone.image,
      top: imgRect.top,
      left: imgRect.left,
      x,
      y,
    });

    // Call cart logic after animation starts
    setTimeout(() => {
      addToCart({
        id: phone.id,
        name: phone.name,
        price: phone.price,
        image: phone.image,
      });
      //toast.success(`${phone.name} added to cart`);
    }, 700);
  };

  if (loading) return <p className="text-center">Loading phones...</p>;

  return (
    <div className="relative">
      {/* Cart icon */}
      <div
        ref={cartRef}
        className="fixed top-5 right-6 w-12 h-12 z-50"
      >
        
      </div>

      {/* Phone list */}
      <div className="flex gap-4 overflow-x-auto px-2 py-2">
        {phones.map((phone) => (
          <div
            key={phone.id}
            className="w-40 bg-white flex-shrink-0 flex flex-col items-center justify-center rounded-lg shadow-lg pb-5 px-2"
          >
            <Link to={`/product/${phone.id}`} className="flex flex-col text-center">
              <img
                src={phone.image}
                alt={phone.name}
                className="w-full h-38 object-cover rounded-t-lg"
              />
              <p className="text-sm text-gray-600">{phone.name}</p>
              <span className="text-indigo-900 font-bold text-lg">
                Ksh {phone.price.toLocaleString()}
              </span>
              <span className="text-red-600 text-sm line-through">
                $ {(phone.price * 1.1).toFixed(0)}
              </span>
              
              
            </Link>
            <motion.button
              onClick={(e) => handleAddToCart(phone, e)}
              whileTap={{ scale: 0.95 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#d1d5db",
                color: "black",
              }}
              transition={{ bounceDamping: 10, bounceStiffness: 400 }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-indigo-700 transition"
            >
              Add to Cart
            </motion.button>
          </div>
        ))}
      </div>

      {/* Flying animation */}
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

export default PhoneList;
