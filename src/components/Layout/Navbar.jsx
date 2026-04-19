import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

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
  const alertCount = upcomingRenewals.length + upcomingBookings.length;
  const title = pageTitles[location.pathname] || 'LifeHub';

  return (
    <header style={styles.navbar} role="banner">
      <h1 style={styles.title}>{title}</h1>
      <div style={styles.right}>
        <div style={{ position: 'relative', fontSize: '20px', cursor: 'pointer' }}
          aria-label={`${alertCount} alerts`}>
          🔔
          {alertCount > 0 && (
            <span style={styles.badge}>{alertCount}</span>
          )}
        </div>
        <div style={styles.date}>
          {new Date().toLocaleDateString('en-AU', {
            weekday: 'short', month: 'short', day: 'numeric'
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
    width: '100%',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#f1f5f9',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  badge: {
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