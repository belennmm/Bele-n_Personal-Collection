import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import StorageProvider from './context/StorageProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StorageProvider>
      <App />
    </StorageProvider>
   
  </StrictMode>,
)
