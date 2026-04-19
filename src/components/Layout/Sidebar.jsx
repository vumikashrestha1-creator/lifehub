// Sidebar.jsx
// The left navigation panel

import { NavLink } from 'react-router-dom';

// Navigation links data
const navLinks = [
  { path: '/dashboard',     label: 'Dashboard',      icon: '🏠' },
  { path: '/subscriptions', label: 'Subscriptions',  icon: '📦' },
  { path: '/utilities',     label: 'Utilities',      icon: '⚡' },
  { path: '/bookings',      label: 'Bookings',       icon: '📅' },
  { path: '/settings',      label: 'Settings',       icon: '⚙️' },
];

function Sidebar() {
  return (
    <aside style={styles.sidebar} aria-label="Main navigation">

      {/* Logo */}
      <div style={styles.logo}>
        <span style={styles.logoIcon}>⚡</span>
        <span style={styles.logoText}>LifeHub</span>
      </div>

      {/* Navigation Links */}
      <nav>
        <ul style={styles.navList}>
          {navLinks.map(link => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                style={({ isActive }) => ({
                  ...styles.navLink,
                  background: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',
                  color: isActive ? '#6366f1' : '#94a3b8',
                  borderLeft: isActive ? '3px solid #6366f1' : '3px solid transparent',
                })}
              >
                <span style={styles.navIcon}>{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom user info */}
      <div style={styles.bottomUser}>
        <span style={styles.userAvatar}>👤</span>
        <div>
          <div style={styles.userName}>Alex Johnson</div>
          <div style={styles.userRole}>Personal Account</div>
        </div>
      </div>

    </aside>
  );
}

// Inline styles for sidebar
const styles = {
  sidebar: {
    width: '240px',
    minHeight: '100vh',
    background: '#1e293b',
    borderRight: '1px solid #334155',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    zIndex: 100,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '24px 20px',
    borderBottom: '1px solid #334155',
  },
  logoIcon: {
    fontSize: '24px',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#6366f1',
  },
  navList: {
    listStyle: 'none',
    padding: '16px 0',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
    borderRadius: '0',
  },
  navIcon: {
    fontSize: '18px',
  },
  bottomUser: {
    marginTop: 'auto',
    padding: '20px',
    borderTop: '1px solid #334155',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userAvatar: {
    fontSize: '28px',
  },
  userName: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#f1f5f9',
  },
  userRole: {
    fontSize: '11px',
    color: '#94a3b8',
  },
};

export default Sidebar;