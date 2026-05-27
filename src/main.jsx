import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import PreLoader from './components/PreLoader.jsx'
import "animate.css"
import 'aos/dist/aos.css'; // You can also use <link> for styles

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PreLoader/>
    <div className = "container mx-auto px-6">
      <Navbar />
      <App />
      <Footer/>
    </div>
  </StrictMode>,
)
