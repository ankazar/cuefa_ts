import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/ui/pages/App/App.tsx'
import 'src/ui/style/reset.css'
import 'src/ui/style/fonts.css'


ReactDOM.createRoot(document.getElementById('root')!)
.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
