import './App.css'
import AnimatedRoutes from './components/AnimatedRoutes'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/NavBar'
import { Toaster } from "react-hot-toast";
function App() {

  return (
    <>
    <Router>
      <Navbar/>
      <Toaster position="top-right" reverseOrder={false} />
      <AnimatedRoutes/>
    </Router>     
    </>
  )
}

export default App
