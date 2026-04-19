import { NavLink } from 'react-router-dom';

const navLinks = [
  { path: '/dashboard',     label: 'Dashboard',     icon: '🏠' },
  { path: '/subscriptions', label: 'Subscriptions', icon: '📦' },
  { path: '/utilities',     label: 'Utilities',     icon: '⚡' },
  { path: '/bookings',      label: 'Bookings',      icon: '📅' },
  { path: '/settings',      label: 'Settings',      icon: '⚙️' },
];

function Sidebar() {
  return (
    <aside style={styles.sidebar} aria-label="Main navigation">

      {/* Logo */}
      <div style={styles.logo}>
        <span style={{ fontSize: '24px' }}>⚡</span>
        <span style={styles.logoText}>LifeHub</span>
      </div>

      {/* Nav links */}
      <nav>
        <ul style={{ listStyle: 'none', padding: '16px 0' }}>
          {navLinks.map(link => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 20px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  background: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',
                  color: isActive ? '#6366f1' : '#94a3b8',
                  borderLeft: isActive ? '3px solid #6366f1' : '3px solid transparent',
                })}
              >
                <span style={{ fontSize: '18px' }}>{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom user info */}
      <div style={styles.bottomUser}>
        <span style={{ fontSize: '28px' }}>👤</span>
        <div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#f1f5f9' }}>
            Alex Johnson
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>
            Personal Account
          </div>
        </div>
      </div>

    </aside>
  );
}

const styles = {
  sidebar: {
    width: '240px',
    minHeight: '100vh',
    height: '100%',
    background: '#1e293b',
    borderRight: '1px solid #334155',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 100,
    overflowY: 'auto',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '24px 20px',
    borderBottom: '1px solid #334155',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#6366f1',
  },
  bottomUser: {
    marginTop: 'auto',
    padding: '20px',
    borderTop: '1px solid #334155',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
};

export default Sidebar;