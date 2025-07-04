import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from "../context/CartContext";
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

  if (loading) return <p className="text-center">Loading tablets...</p>;

  return (
    <div className="flex gap-4 overflow-x-auto px-2 py-2">
      {tablets.map((tablet) => (
        
        <div
          key={tablet.id}
          className="min-w-[220px] bg-white flex-shrink-0 flex flex-col items-center justify-center rounded-lg shadow-lg pb-5"
        >
          <Link to={`/product/${tablet.id}`}>
          <img
            src={tablet.image}
            alt={tablet.name}
            className="w-full h-38 object-cover rounded-t-lg"
          />
          <span className="text-sm text-gray-600 truncate overflow-hidden whitespace-nowrap w-full block">
            {tablet.name}
        </span>

          <span className="text-indigo-900 font-bold text-lg">$ {tablet.price.toLocaleString()}</span>
          <span className="text-red-600 text-sm line-through">
            $ {(tablet.price * 1.1).toFixed(0)}
          </span>
          </Link>
          <motion.button 
          whileTap={{ scale: 0.95 }}
          whileHover={{
            scale: 1.5,
            backgroundColor: "#d1d5db",
            color: "black"
          }}
          transition={{ bounceDamping: 10, bounceStiffness: 400 }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-indigo-700 transition"
          onClick={() => addToCart({
            id: tablet.id,
            name: tablet.name,
            price: tablet.price,
            image: tablet.image
          })}>
            Add to Cart
          </motion.button>
        </div>
       
      ))}
    </div>
  );
};

export default TabletList;
