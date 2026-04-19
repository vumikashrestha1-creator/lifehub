// Settings.jsx
// User profile and preferences page

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import AlertBanner from '../components/UI/AlertBanner';

function Settings() {
  const { userProfile, updateProfile } = useApp();

  // Local form state (copy of profile)
  const [form, setForm] = useState({ ...userProfile });
  const [saved, setSaved] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Validate
  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Enter a valid email';
    return errors;
  };

  // Save changes
  const handleSave = () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    updateProfile(form);
    setFormErrors({});
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h2 className="page-title">⚙️ Settings</h2>

      {/* Success banner */}
      {saved && (
        <AlertBanner
          type="success"
          message="✅ Settings saved successfully!"
        />
      )}

      <div className="grid-2">

        {/* Profile settings */}
        <section className="card" aria-label="Profile settings">
          <h3 style={styles.sectionTitle}>👤 Profile Information</h3>

          {/* Avatar */}
          <div style={styles.avatarSection}>
            <div style={styles.avatar}>{form.avatar}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '16px' }}>{form.name}</div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>{form.email}</div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="set-name">Full Name</label>
            <input
              id="set-name"
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            {formErrors.name && <p className="error-text">{formErrors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="set-email">Email Address</label>
            <input
              id="set-email"
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            {formErrors.email && <p className="error-text">{formErrors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="set-currency">Currency</label>
            <select
              id="set-currency"
              value={form.currency}
              onChange={e => setForm({ ...form, currency: e.target.value })}
            >
              <option value="AUD">AUD — Australian Dollar</option>
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — British Pound</option>
            </select>
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '8px' }}
            onClick={handleSave}
          >
            Save Changes
          </button>
        </section>

        {/* Preferences */}
        <section className="card" aria-label="App preferences">
          <h3 style={styles.sectionTitle}>🔔 Preferences</h3>

          {/* Notifications toggle */}
          <div style={styles.preferenceRow}>
            <div>
              <div style={styles.prefTitle}>Email Notifications</div>
              <div style={styles.prefSub}>Get alerts for renewals and bills</div>
            </div>
            <button
              role="switch"
              aria-checked={form.notifications}
              onClick={() => setForm({ ...form, notifications: !form.notifications })}
              style={{
                ...styles.toggle,
                background: form.notifications ? '#6366f1' : '#334155',
              }}
              aria-label="Toggle notifications"
            >
              <div style={{
                ...styles.toggleDot,
                transform: form.notifications ? 'translateX(20px)' : 'translateX(0)',
              }} />
            </button>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #334155', margin: '16px 0' }} />

          {/* App info */}
          <div style={styles.infoSection}>
            <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>ℹ️ App Info</h4>
            {[
              { label: 'App Name',  value: 'LifeHub Dashboard' },
              { label: 'Version',   value: '1.0.0' },
              { label: 'Framework', value: 'React + Vite' },
              { label: 'Unit',      value: 'ICT930' },
            ].map(item => (
              <div key={item.label} style={styles.infoRow}>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>{item.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 500 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

const styles = {
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#f1f5f9',
  },
  avatarSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
    padding: '16px',
    background: '#0f172a',
    borderRadius: '10px',
  },
  avatar: {
    fontSize: '40px',
    width: '60px',
    height: '60px',
    background: '#334155',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preferenceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
  },
  prefTitle: {
    fontSize: '14px',
    fontWeight: '500',
  },
  prefSub: {
    fontSize: '12px',
    color: '#94a3b8',
    marginTop: '2px',
  },
  toggle: {
    width: '44px',
    height: '24px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    transition: 'background 0.2s',
    padding: 0,
  },
  toggleDot: {
    width: '18px',
    height: '18px',
    background: 'white',
    borderRadius: '50%',
    position: 'absolute',
    top: '3px',
    left: '3px',
    transition: 'transform 0.2s',
  },
  infoSection: {
    marginTop: '8px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #1e293b',
  },
};

export default Settings;