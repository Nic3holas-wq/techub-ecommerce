import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

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


  useEffect(() => {
    fetch("http://192.168.43.102:5000/api/phones")
      .then((res) => res.json())
      .then((data) => {
        setPhones(data);
        console.log("Phones fetched:", data.length);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load phones", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading phones...</p>;

  return (
    <div className="flex gap-4 overflow-x-auto px-2 py-2">
      {phones.map((phone) => (
        
        <div
          key={phone.id}
          className="min-w-[220px] bg-white flex-shrink-0 flex flex-col items-center justify-center rounded-lg shadow-lg pb-5"
        >
          <Link to={`/product/${phone.id}`}>
          <img
            src={phone.image}
            alt={phone.name}
            className="w-full h-38 object-cover rounded-t-lg"
          />
          <span className="text-sm text-gray-600">{phone.name}</span>
          <span className="text-indigo-900 font-bold text-lg">Ksh {phone.price.toLocaleString()}</span>
          <span className="text-red-600 text-sm line-through">
            Ksh {(phone.price * 1.1).toFixed(0)}
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
          onClick={() => {addToCart({
            id: phone.id,
            name: phone.name,
            price: phone.price,
            image: phone.image
          })
          toast.success(`${phone.name} added to cart`);
          }}>
            Add to Cart
          </motion.button>
        </div>
        
      ))}
    </div>
    
  );
};

export default PhoneList;
