// Bookings.jsx
// Page to view and add bookings/appointments

import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Modal from '../components/UI/Modal';

function Bookings() {
  const { bookings, loading, error, addBooking, deleteBooking } = useApp();

  const [search, setSearch]       = useState('');
  const [filter, setFilter]       = useState('All');
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: '', provider: '', date: '',
    time: '', status: 'Pending', icon: '📅',
    color: '#6366f1', notes: ''
  });

  const [formErrors, setFormErrors] = useState({});

  // Filter & search
  const filtered = bookings.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
                        b.provider.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || b.status === filter;
    return matchSearch && matchFilter;
  });

  // Validate form
  const validate = () => {
    const errors = {};
    if (!form.title.trim())    errors.title = 'Title is required';
    if (!form.provider.trim()) errors.provider = 'Provider is required';
    if (!form.date)            errors.date = 'Date is required';
    if (!form.time)            errors.time = 'Time is required';
    return errors;
  };

  // Submit form
  const handleSubmit = () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    addBooking(form);
    setShowModal(false);
    setForm({ title: '', provider: '', date: '', time: '', status: 'Pending', icon: '📅', color: '#6366f1', notes: '' });
    setFormErrors({});
  };

  if (loading) return <div className="loading-container"><div className="spinner"></div> Loading...</div>;
  if (error)   return <div className="error-container">❌ {error}</div>;

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
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
        </select>
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
          aria-label="Add new booking"
        >
          + Add Booking
        </button>
      </div>

      {/* Bookings cards grid */}
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
              style={{ borderLeft: `4px solid ${b.color}` }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '28px' }}>{b.icon}</span>
                <span className={`badge badge-${b.status.toLowerCase()}`}>{b.status}</span>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>{b.title}</h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '12px' }}>{b.provider}</p>

              {/* Date & time */}
              <div style={styles.infoRow}>
                <span>📆</span>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>{b.date}</span>
              </div>
              <div style={styles.infoRow}>
                <span>🕐</span>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>{b.time}</span>
              </div>

              {/* Notes */}
              {b.notes && (
                <p style={{ fontSize: '12px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' }}>
                  {b.notes}
                </p>
              )}

              {/* Delete button */}
              <button
                className="btn btn-danger"
                style={{ width: '100%', marginTop: '16px', padding: '8px' }}
                onClick={() => deleteBooking(b.id)}
                aria-label={`Delete ${b.title}`}
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
            <label htmlFor="book-provider">Provider / Location *</label>
            <input
              id="book-provider"
              type="text"
              placeholder="e.g. City Dental Clinic"
              value={form.provider}
              onChange={e => setForm({ ...form, provider: e.target.value })}
            />
            {formErrors.provider && <p className="error-text">{formErrors.provider}</p>}
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
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSubmit}>
              Add Booking
            </button>
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>

        </Modal>
      )}
    </div>
  );
}

const styles = {
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
  },
};

export default Bookings;