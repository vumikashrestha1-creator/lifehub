// AlertBanner.jsx
// Shows a warning/info alert message

function AlertBanner({ type = 'warning', message, onClose }) {

  // Pick colour based on type
  const colors = {
    warning: { bg: '#78350f22', border: '#f59e0b', text: '#f59e0b', icon: '⚠️' },
    danger:  { bg: '#7f1d1d22', border: '#ef4444', text: '#ef4444', icon: '🚨' },
    success: { bg: '#064e3b22', border: '#10b981', text: '#10b981', icon: '✅' },
    info:    { bg: '#1e3a5f22', border: '#60a5fa', text: '#60a5fa', icon: 'ℹ️' },
  };

  const c = colors[type];

  return (
    <div
      role="alert"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: '8px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px',
        color: c.text,
        fontSize: '14px',
      }}
    >
      <span>{c.icon} {message}</span>

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Dismiss alert"
          style={{
            background: 'none',
            border: 'none',
            color: c.text,
            cursor: 'pointer',
            fontSize: '16px',
            padding: '0 4px',
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default AlertBanner;