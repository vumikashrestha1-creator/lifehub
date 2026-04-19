import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Modal from '../components/UI/Modal';

function Bookings() {
  const { bookings, loading, error, addBooking, deleteBooking } = useApp();

  const [search, setSearch]       = useState('');
  const [filter, setFilter]       = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]           = useState({
    title: '',
    location: '',
    date: '',
    time: '',
    status: 'confirmed',
    icon: '📅',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const filtered = bookings.filter(b => {
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || b.status === filter;
    return matchSearch && matchFilter;
  });

  const validate = () => {
    const errors = {};
    if (!form.title.trim())    errors.title    = 'Title is required';
    if (!form.location.trim()) errors.location = 'Location is required';
    if (!form.date)            errors.date     = 'Date is required';
    if (!form.time)            errors.time     = 'Time is required';
    return errors;
  };

  const handleSubmit = () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    addBooking(form);
    setShowModal(false);
    setForm({
      title: '', location: '', date: '',
      time: '', status: 'confirmed',
      icon: '📅', notes: ''
    });
    setFormErrors({});
  };

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div> Loading...
    </div>
  );

  if (error) return <div className="error-container">❌ {error}</div>;

  return (
    <div>
      <h2 className="page-title">📅 Bookings</h2>

      {/* Toolbar */}
      <div className="toolbar">
        <input
          className="search-input"
          type="search"
          placeholder="🔍 Search bookings..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search bookings"
        />
        <select
          className="filter-select"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="All">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
        </select>
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
          aria-label="Add new booking"
        >
          + Add Booking
        </button>
      </div>

      {/* Summary */}
      <div style={styles.summary}>
        <span>Total: <strong>{filtered.length} bookings</strong></span>
        <span>
          Confirmed: <strong style={{ color: '#60a5fa' }}>
            {filtered.filter(b => b.status === 'confirmed').length}
          </strong>
        </span>
      </div>

      {/* Cards or Empty State */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <p>No bookings found</p>
        </div>
      ) : (
        <div className="grid-3">
          {filtered.map(b => (
            <article
              key={b.id}
              className="card"
              aria-label={b.title}
              style={{ borderLeft: '4px solid #6366f1' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '28px' }}>{b.icon}</span>
                <span className={`badge badge-${b.status}`}>{b.status}</span>
              </div>

              <h3 style={styles.cardTitle}>{b.title}</h3>
              <p style={styles.cardSub}>📍 {b.location}</p>

              <div style={styles.infoRow}>
                <span>📆</span>
                <span style={styles.infoText}>{b.date}</span>
              </div>
              <div style={styles.infoRow}>
                <span>🕐</span>
                <span style={styles.infoText}>{b.time}</span>
              </div>

              {b.notes && (
                <p style={styles.notes}>{b.notes}</p>
              )}

              <button
                className="btn btn-danger"
                style={{ width: '100%', marginTop: '16px', padding: '8px' }}
                onClick={() => deleteBooking(b.id)}
                aria-label={`Cancel ${b.title}`}
              >
                Cancel Booking
              </button>
            </article>
          ))}
        </div>
      )}

      {/* Add Booking Modal */}
      {showModal && (
        <Modal title="➕ Add Booking" onClose={() => setShowModal(false)}>

          <div className="form-group">
            <label htmlFor="book-title">Appointment Title *</label>
            <input
              id="book-title"
              type="text"
              placeholder="e.g. Dentist Appointment"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
            {formErrors.title && <p className="error-text">{formErrors.title}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="book-loc">Location *</label>
            <input
              id="book-loc"
              type="text"
              placeholder="e.g. City Dental Clinic"
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
            />
            {formErrors.location && <p className="error-text">{formErrors.location}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="book-date">Date *</label>
            <input
              id="book-date"
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
            />
            {formErrors.date && <p className="error-text">{formErrors.date}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="book-time">Time *</label>
            <input
              id="book-time"
              type="time"
              value={form.time}
              onChange={e => setForm({ ...form, time: e.target.value })}
            />
            {formErrors.time && <p className="error-text">{formErrors.time}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="book-notes">Notes (optional)</label>
            <textarea
              id="book-notes"
              rows="3"
              placeholder="Any additional notes..."
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="book-status">Status</label>
            <select
              id="book-status"
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
            >
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="book-icon">Icon</label>
            <select
              id="book-icon"
              value={form.icon}
              onChange={e => setForm({ ...form, icon: e.target.value })}
            >
              <option value="📅">📅 General</option>
              <option value="🦷">🦷 Dentist</option>
              <option value="🚗">🚗 Car Service</option>
              <option value="👁️">👁️ Eye Checkup</option>
              <option value="✂️">✂️ Haircut</option>
              <option value="🏥">🏥 Medical</option>
              <option value="💪">💪 Gym</option>
              <option value="🔧">🔧 Technician</option>
              <option value="📚">📚 Education</option>
              <option value="🍽️">🍽️ Restaurant</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button
              className="btn btn-primary"
              style={{ flex: 1 }}
              onClick={handleSubmit}
            >
              Add Booking
            </button>
            <button
              className="btn btn-outline"
              style={{ flex: 1 }}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>

        </Modal>
      )}
    </div>
  );
}

const styles = {
  summary: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
    fontSize: '14px',
    color: '#94a3b8',
  },
  cardTitle: {
    fontSize: '15px',
    fontWeight: 600,
    marginBottom: '4px',
    color: '#f1f5f9',
  },
  cardSub: {
    fontSize: '13px',
    color: '#94a3b8',
    marginBottom: '12px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
  },
  infoText: {
    fontSize: '13px',
    color: '#94a3b8',
  },
  notes: {
    fontSize: '12px',
    color: '#64748b',
    marginTop: '10px',
    fontStyle: 'italic',
  },
};

export default Bookings;