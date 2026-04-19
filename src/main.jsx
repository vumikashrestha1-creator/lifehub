// main.jsx
// This is the entry point of our React app

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AppProvider } from './context/AppContext.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* AppProvider wraps everything so all pages can access shared data */}
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);