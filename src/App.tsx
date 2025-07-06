import './App.css'
import AnimatedRoutes from './components/AnimatedRoutes'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/NavBar'
import { Toaster } from "react-hot-toast";
import Footer from './components/Footer';
function App() {

  return (
    <>
    <Router>
      <Navbar/>
      <Toaster position="top-right" reverseOrder={false} />
      <AnimatedRoutes/>
      <Footer/>
    </Router>     
    </>
  )
}

export default App
