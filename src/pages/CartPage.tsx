// src/pages/CartPage.tsx
import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center p-8">
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
      <p className="text-2xl text-gray-600 font-bold mb-6">🛍️ Your Cart</p>

      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded shadow">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">Ksh {item.price.toLocaleString()} x {item.quantity}</p>
              <p className="text-sm text-gray-500">Total: Ksh {(item.price * item.quantity).toLocaleString()}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <h3 className="text-xl font-bold">Grand Total: Ksh {total.toLocaleString()}</h3>
        <div className="flex justify-between mt-4">
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
