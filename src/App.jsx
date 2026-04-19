// App.jsx
// This sets up all the routes (pages) of our app

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Navbar from './components/Layout/Navbar';
import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import Utilities from './pages/Utilities';
import Bookings from './pages/Bookings';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">

        {/* Sidebar - shows on all pages */}
        <Sidebar />

        {/* Right side - navbar + page content */}
        <div style={{ flex: 1 }}>
          <Navbar />

          {/* Page Routes */}
          <main className="main-content">
            <Routes>
              {/* Default route goes to dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/utilities" element={<Utilities />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;