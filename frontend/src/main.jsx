import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { registerLicense } from '@syncfusion/ej2-base'



createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>
)
