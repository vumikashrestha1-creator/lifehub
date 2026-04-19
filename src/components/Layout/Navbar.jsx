// Navbar.jsx
// Top bar that shows current page title and alerts

import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

// Map routes to page titles
const pageTitles = {
  '/dashboard':     'Dashboard',
  '/subscriptions': 'Subscriptions',
  '/utilities':     'Utilities',
  '/bookings':      'Bookings',
  '/settings':      'Settings',
};

function Navbar() {
  const location = useLocation();
  const { upcomingRenewals, upcomingBookings } = useApp();

  // Total alerts count
  const alertCount = upcomingRenewals.length + upcomingBookings.length;

  const title = pageTitles[location.pathname] || 'LifeHub';

  return (
    <header style={styles.navbar} role="banner">

      {/* Page Title */}
      <h1 style={styles.title}>{title}</h1>

      {/* Right side icons */}
      <div style={styles.rightSection}>

        {/* Alert bell */}
        <div style={styles.alertBell} aria-label={`${alertCount} alerts`}>
          🔔
          {alertCount > 0 && (
            <span style={styles.alertBadge}>{alertCount}</span>
          )}
        </div>

        {/* Current date */}
        <div style={styles.date}>
          {new Date().toLocaleDateString('en-AU', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          })}
        </div>

      </div>
    </header>
  );
}

const styles = {
  navbar: {
    height: '60px',
    background: '#1e293b',
    borderBottom: '1px solid #334155',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    position: 'sticky',
    top: 0,
    zIndex: 90,
    marginLeft: '0',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#f1f5f9',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  alertBell: {
    position: 'relative',
    fontSize: '20px',
    cursor: 'pointer',
  },
  alertBadge: {
    position: 'absolute',
    top: '-6px',
    right: '-6px',
    background: '#ef4444',
    color: 'white',
    fontSize: '10px',
    fontWeight: '700',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    fontSize: '13px',
    color: '#94a3b8',
  },
};

export default Navbar;