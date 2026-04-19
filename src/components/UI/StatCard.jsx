// StatCard.jsx
// Reusable card that shows a single stat (e.g. total spending)

function StatCard({ title, value, subtitle, icon, color }) {
  return (
    <article className="card" style={styles.card} aria-label={title}>

      {/* Top row: title + icon */}
      <div style={styles.topRow}>
        <span style={styles.title}>{title}</span>
        <span
          style={{ ...styles.iconBox, background: color + '22' }}
          aria-hidden="true"
        >
          {icon}
        </span>
      </div>

      {/* Main value */}
      <div style={{ ...styles.value, color: color }}>
        {value}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div style={styles.subtitle}>{subtitle}</div>
      )}

    </article>
  );
}

const styles = {
  card: {
    cursor: 'default',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  title: {
    fontSize: '13px',
    color: '#94a3b8',
    fontWeight: '500',
  },
  iconBox: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
  },
  value: {
    fontSize: '26px',
    fontWeight: '700',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '12px',
    color: '#94a3b8',
  },
};

export default StatCard;