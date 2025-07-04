import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RecentlyViewedProvider } from './context/RecentlyViewedProvider.tsx'
import { CartProvider } from './context/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
    <RecentlyViewedProvider>
    <App />
    </RecentlyViewedProvider>
    </CartProvider>
  </StrictMode>,
)
