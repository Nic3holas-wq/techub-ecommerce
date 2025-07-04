import React from 'react'
import {Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from '../pages/Home'
import ProductPage from '../pages/ProductPage'
import CartPage from '../pages/CartPage'



const AnimatedRoutes:React.FC = () => {
    const location = useLocation()
  return (
    <AnimatePresence>
    <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
    </Routes>
    </AnimatePresence>
    
  )
}

export default AnimatedRoutes
