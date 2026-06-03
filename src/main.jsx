import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import emailjs from '@emailjs/browser'
import './index.css'
import App from './App.jsx'

// Initialise EmailJS once at app startup
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

