import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import type { Product } from '../types/Product';
import { useRecentlyViewed } from '../context/RecentlyViewedProvider';
import StarRating from '../components/StarRating';
import {motion} from 'framer-motion'
import toast from 'react-hot-toast';
import { useCart } from "../context/CartContext";
const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToRecentlyViewed } = useRecentlyViewed();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const { addToCart } = useCart();
const handleTouchStart = (e: React.TouchEvent) => {
  setTouchStartX(e.touches[0].clientX);
};

const handleTouchEnd = (e: React.TouchEvent) => {
  if (touchStartX === null || selectedIndex === null) return;
  const touchEndX = e.changedTouches[0].clientX;
  const delta = touchStartX - touchEndX;

  if (
    product &&
    delta > 50 &&
    selectedIndex !== null &&
    selectedIndex < product.images.length - 1
  ) {
    setSelectedIndex(selectedIndex + 1); // swipe left
  } else if (
    product &&
    delta < -50 &&
    selectedIndex !== null &&
    selectedIndex > 0
  ) {
    setSelectedIndex(selectedIndex - 1); // swipe right
  }
  

  setTouchStartX(null);
};


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get<Product>(`http://192.168.43.102:5000/api/products/${id}`);
        setProduct(res.data);
        console.log('Product fetched:', res.data);
        addToRecentlyViewed(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, addToRecentlyViewed]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!product) return <p className="p-4 text-red-500">Product not found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-18 xl:mt-25">
      {/* Top Section: Image + Info */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image Carousel */}
        <div className="space-y-4">
          <img src={product.thumbnail} alt={product.title} className="w-full rounded-lg shadow" />
          <div className="flex space-x-2 overflow-x-auto">
          {product?.images?.map((img, i) => (
  <img
    key={i}
    src={img}
    alt={`thumb-${i}`}
    className="w-20 h-20 object-cover rounded-md border cursor-pointer hover:scale-105 transition"
    onClick={() => setSelectedIndex(i)}
  />
))}

{selectedIndex !== null && (
  <div
    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
    onClick={() => setSelectedIndex(null)}
  >
    <div
      className="relative"
      onClick={(e) => e.stopPropagation()} // prevent background close
      onTouchStart={(e) => handleTouchStart(e)}
      onTouchEnd={(e) => handleTouchEnd(e)}
    >
      <img
        src={product.images[selectedIndex]}
        alt="preview"
        className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-lg transition-transform transform hover:scale-110 duration-300 cursor-zoom-in"
      />
      <button
        onClick={() => setSelectedIndex(null)}
        className="absolute top-2 right-2 bg-white text-black rounded-full px-3 py-1 hover:bg-gray-200"
      >
        ✕
      </button>
      {/* Nav buttons */}
      {selectedIndex > 0 && (
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full px-3 py-2"
          onClick={() => setSelectedIndex((prev) => prev! - 1)}
        >
          ⬅
        </button>
      )}
      {selectedIndex < product.images.length - 1 && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full px-3 py-2"
          onClick={() => setSelectedIndex((prev) => prev! + 1)}
        >
          ➡
        </button>
      )}
    </div>
  </div>
)}

          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4 text-left">
          <h1 className="text-2xl font-bold text-indigo-700">{product.title}</h1>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <div className="text-xl font-bold text-indigo-900">${product.price.toLocaleString()}</div>
          <div className="text-sm text-red-600 line-through">
            ${((product.price * (1 + product.discountPercentage / 100))).toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">Discount: {product.discountPercentage}%</div>
          <StarRating rating={product.rating} />
          <p className="text-sm text-green-700">{product.availabilityStatus}</p>
          <div className='text-center'>
          <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{
            scale: 1.5,
            backgroundColor: "#d1d5db",
            color: "black"
          }}
          transition={{ bounceDamping: 10, bounceStiffness: 400 }}
          onClick={() => {addToCart({
            id: product.id,
            name: product.title,
            price: product.price,
            image: product.images[0]
          })
          toast.success(`${product.title} added to cart`);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            Add to Cart
          </motion.button>
          </div>
          
        </div>
      </div>

      {/* Additional Details */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-4 rounded-lg shadow text-left">
          <h2 className="font-semibold text-lg text-indigo-700 mb-2 text-center">Product Details</h2>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>SKU:</strong> {product.sku}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Weight:</strong> {product.weight}kg</p>
          <p><strong>Dimensions:</strong> {product.dimensions?.width} x {product.dimensions?.height} x {product.dimensions?.depth} inches</p>
          <p><strong>Minimum Order:</strong> {product.minimumOrderQuantity}</p>
          <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
          <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
          <p><strong>Shipping:</strong> {product.shippingInformation}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-left">
          <h2 className="font-semibold text-lg text-indigo-700 mb-2 text-center">Metadata</h2>
          <p><strong>Created At:</strong> {new Date(product.meta.createdAt).toLocaleDateString()}</p>
          <p><strong>Updated At:</strong> {new Date(product.meta.updatedAt).toLocaleDateString()}</p>
          <p><strong>Barcode:</strong> {product.meta.barcode}</p>
          <img src={product.meta.qrCode} alt="QR Code" className="w-24 h-24 mt-2" />
        </div>
      </div>

      {/* Tags */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-indigo-700 mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, i) => (
            <span key={i} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm">{tag}</span>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-indigo-700 mb-4">Customer Reviews</h3>
        {product.reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4 gap-2 xl:gap-4 xl:flex xl:flex-row">
            {product.reviews.map((review, i) => (
                
              <div key={i} className="text-left bg-gray-50 p-4 rounded shadow-sm h-30">
                <p className="text-sm font-semibold text-gray-700">{review.reviewerName} <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</span></p>
                
                <span className="text-yellow-500"><StarRating rating={review.rating}/></span>
                <i><p className="text-sm text-gray-700 pt-2">"{review.comment}"</p></i>
              </div>
              
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
