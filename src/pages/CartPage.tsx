// src/pages/CartPage.tsx
import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { HiOutlineTrash, HiTrash } from "react-icons/hi";
const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center p-8 mt-20">
        <h2 className="text-2xl font-semibold mb-4">🛒 Your cart is empty</h2>
        <Link
          to="/"
          className="text-indigo-600 hover:underline font-medium"
        >
          ← Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto mt-20">
      <p className="text-2xl text-indigo-700 font-bold mb-6">🛍️ Your Cart</p>

      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded shadow">
            <Link to={`/product/${item.id}`}>
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
            <div className="flex text-left flex-col">
              <span className="text-sm font-semibold">{item.name}</span>
              <span className="text-gray-600 text-sm">Ksh {item.price.toLocaleString()} x {item.quantity}</span>
              <span className="text-sm text-gray-500">Total: Ksh {(item.price * item.quantity).toLocaleString()}</span>
            </div>
            </Link>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:text-red-800 bg-gray-200 rounded-xl px-5 py-1 ms-10"
            >
              <HiOutlineTrash className="text-red-500" size={25} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <h3 className="text-xl font-bold text-indigo-500"><span className="text-black">Grand Total:</span> Ksh {total.toLocaleString()}</h3>
        <div className="flex justify-between mt-4 gap-3">
          <button
            onClick={clearCart}
            className="bg-red-500 flex flex-row items-center w-27 px-1 text-white rounded-lg hover:bg-red-600"
          >
            <HiTrash className="text-white-500" size={25} />
            <span className="text-sm">Clear Cart</span>
          </button>
          <button
            className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
