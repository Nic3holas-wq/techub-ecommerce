import React, { useState, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types/Product';
    

    const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const delayDebounce = setTimeout(() => {
        if (query.trim().length > 0) {
          fetch(`http://192.168.43.102:5000/api/search?q=${query}`)
            .then((res) => res.json())
            .then((data) => {
              setResults(data);
              setShowDropdown(true);
            });
        } else {
          setResults([]);
          setShowDropdown(false);
        }
      }, 300); // debounce time
  
      return () => clearTimeout(delayDebounce);
    }, [query]);
  
    const handleSelect = (productId: number) => {
      navigate(`/product/${productId}`);
      setQuery('');
      setShowDropdown(false);
    };
  
    return (
      <div className="bg-gray-50 border-t border-gray-200 relative z-50">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for phones, laptops, accessories..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          {/* Suggestions */}
          {showDropdown && results.length > 0 && (
            <div className="absolute bg-white shadow-md border w-full mt-1 rounded-md max-h-64 overflow-y-auto">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelect(product.id)}
                  className="p-2 cursor-pointer hover:bg-indigo-100 flex items-center gap-2"
                >
                  <img src={product.thumbnail} alt={product.title} className="w-10 h-10 object-cover rounded" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 truncate">{product.title}</p>
                    <p className="text-xs text-gray-500">${product.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default SearchBar;
  