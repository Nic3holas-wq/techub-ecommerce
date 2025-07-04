import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart, HiOutlineUser, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
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

        <div className="flex flex-row space-x-10 text-gray-600 items-center">
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
              <Link to="/" onClick={() => setIsOpen(false)}>Products</Link>
              <Link to="/" onClick={() => setIsOpen(false)}>Laptops</Link>
              <Link to="/" onClick={() => setIsOpen(false)}>Smartphone</Link>
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
