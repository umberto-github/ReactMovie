import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom'
import './assets/css/index.css'
import './assets/css/Global.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <BrowserRouter>
      <App />
    </BrowserRouter>
    
  </StrictMode>,
)
