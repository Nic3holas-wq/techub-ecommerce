import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart, HiOutlineUser, HiOutlineMenu, HiOutlineX, HiLogin } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './SearchBar';
import { useCart } from "../context/CartContext";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { cart } = useCart(); // ✅ Destructure 'cart' from context

    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);


  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-50 shadow">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Menu Button (for small screens) */}
          <button onClick={() => setIsOpen(true)} className="md:hidden">
            <HiOutlineMenu className="text-gray-700" size={28} />
          </button>
        <Link to="/" className="text-2xl lg:text-3xl font-bold text-gray-600">
          Tec<span className="text-indigo-600">Hub</span>
        </Link>
        
        <div className="flex flex-row space-x-4 text-gray-600 items-center">
          <Link to='/signup'>
        <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{
          scale: 1.05,
          backgroundColor: "#d1d5db",
          color: "black"
        }}
        transition={{ bounceDamping: 10, bounceStiffness: 400 }}
        className='py-1 px-2 md:py-2 md:px-6 md:text-lg border border-indigo-600 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors sm:text-sm'>
          <span className='flex flex-row gap-2 text-center justify-center items-center'>
            <span>Signin</span>
            <HiLogin className='text-indigo-600' size={20} />
          </span>
        </motion.button>
        </Link>

          <Link to="/account" className="flex items-center gap-2 hover:text-indigo-600 transition">
            <HiOutlineUser className='text-gray-500' size={28} />
          </Link>
          <Link to="/cart" className="relative flex items-center gap-2 hover:text-indigo-600 transition">
  <HiOutlineShoppingCart className='text-gray-500' size={28} />

  <AnimatePresence>
    {totalQuantity > 0 && (
    <motion.span
      key={`cart-count-${totalQuantity}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
    >
      {totalQuantity}
    </motion.span>
  )}
</AnimatePresence>

</Link>


        </div>
      </div>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-1000 p-6"
          >
            <button onClick={() => setIsOpen(false)} className="mb-4">
              <HiOutlineX size={28} className="text-gray-700" />
            </button>
            <nav className="flex text-left mx-5 flex-col space-y-4 text-gray-700 text-lg">
              <Link to="/" onClick={() => setIsOpen(false)} className='text-2xl font-extrabold'>Tec<span className="text-indigo-600">Hub</span></Link>
              <Link to="/products" onClick={() => setIsOpen(false)}>Products</Link>
              <Link to="/" onClick={() => setIsOpen(false)}>Laptops</Link>
              <Link to="/" onClick={() => setIsOpen(false)}>Smartphone</Link>

              <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#d1d5db",
                color: "black"
              }}
              transition={{ bounceDamping: 10, bounceStiffness: 400 }}
              className='py-1 border border-indigo-600 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors'
              >
              <span className='flex flex-row gap-1 text-center justify-center items-center'>
                <span>Signin</span>
                  <HiLogin className='text-indigo-600' size={20} />
              </span>
              </motion.button>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Search Bar */}
     <SearchBar/>
    </nav>
  );
};

export default Navbar;
