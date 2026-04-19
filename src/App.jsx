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
      <div style={{
        display: 'flex',
        width: '100vw',
        minHeight: '100vh',
        overflowX: 'hidden',
        backgroundColor: '#0f172a',
      }}>

        {/* Sidebar */}
        <Sidebar />

        {/* Main area */}
        <div style={{
          flex: 1,
          minWidth: 0,
          width: '100%',
          marginLeft: '240px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Navbar />
          <main style={{
            flex: 1,
            padding: '24px',
            width: '100%',
            boxSizing: 'border-box',
            overflowX: 'hidden',
          }}>
            <Routes>
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