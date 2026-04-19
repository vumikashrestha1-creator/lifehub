// Subscriptions.jsx
// Page to view, add, and delete subscriptions

// Subscriptions.jsx
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Modal from '../components/UI/Modal';

function Subscriptions() {
  const { subscriptions, loading, error, addSubscription, deleteSubscription } = useApp();

  // Default filter is 'All' so all subscriptions show on load
  const [search, setSearch]       = useState('');
  const [filter, setFilter]       = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]           = useState({
    name: '',
    category: '',
    cost: '',
    renewalDate: '',
    status: 'active',
    icon: '📦',
    billingCycle: 'Monthly'
  });
  const [formErrors, setFormErrors] = useState({});

  // Filter and search logic
  const filtered = subscriptions.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || s.status === filter;
    return matchSearch && matchFilter;
  });

  // Form validation
  const validate = () => {
    const errors = {};
    if (!form.name.trim())            errors.name = 'Name is required';
    if (!form.cost || form.cost <= 0) errors.cost = 'Enter a valid cost';
    if (!form.renewalDate)            errors.renewalDate = 'Renewal date is required';
    return errors;
  };

  // Submit new subscription
  const handleSubmit = () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    addSubscription({ ...form, cost: parseFloat(form.cost) });
    setShowModal(false);
    setForm({
      name: '', category: '', cost: '',
      renewalDate: '', status: 'active',
      icon: '📦', billingCycle: 'Monthly'
    });
    setFormErrors({});
  };

  // Total cost of active filtered subscriptions
  const activeTotal = filtered
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + s.cost, 0);

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div> Loading...
    </div>
  );

  if (error) return <div className="error-container">❌ {error}</div>;

  return (
    <div>
      <h2 className="page-title">📦 Subscriptions</h2>

      {/* Toolbar: search + filter + add button */}
      <div className="toolbar">
        <input
          className="search-input"
          type="search"
          placeholder="🔍 Search subscriptions..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search subscriptions"
        />
        <select
          className="filter-select"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="All">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
        </select>
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
          aria-label="Add new subscription"
        >
          + Add New
        </button>
      </div>

      {/* Summary row */}
      <div style={styles.summary}>
        <span>Total: <strong>{filtered.length} subscriptions</strong></span>
        <span>Monthly cost: <strong style={{ color: '#10b981' }}>
          ${activeTotal.toFixed(2)}
        </strong></span>
      </div>

      {/* Table */}
      <div className="card">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <p>No subscriptions found</p>
          </div>
        ) : (
          <div className="table-container">
            <table aria-label="Subscriptions table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Category</th>
                  <th>Cost</th>
                  <th>Billing</th>
                  <th>Next Renewal</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '20px' }}>{s.icon}</span>
                        <span style={{ fontWeight: 500 }}>{s.name}</span>
                      </div>
                    </td>
                    <td style={{ color: '#94a3b8' }}>{s.category}</td>
                    <td style={{ color: '#10b981', fontWeight: 600 }}>${s.cost}/mo</td>
                    <td style={{ color: '#94a3b8' }}>{s.billingCycle}</td>
                    <td style={{ color: '#94a3b8' }}>{s.renewalDate}</td>
                    <td>
                      <span className={`badge badge-${s.status}`}>
                        {s.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                        onClick={() => deleteSubscription(s.id)}
                        aria-label={`Delete ${s.name}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Subscription Modal */}
      {showModal && (
        <Modal title="➕ Add Subscription" onClose={() => setShowModal(false)}>

          <div className="form-group">
            <label htmlFor="sub-name">Service Name *</label>
            <input
              id="sub-name"
              type="text"
              placeholder="e.g. Netflix"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            {formErrors.name && <p className="error-text">{formErrors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="sub-cat">Category</label>
            <input
              id="sub-cat"
              type="text"
              placeholder="e.g. Entertainment"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="sub-cost">Monthly Cost ($) *</label>
            <input
              id="sub-cost"
              type="number"
              placeholder="e.g. 15.99"
              value={form.cost}
              onChange={e => setForm({ ...form, cost: e.target.value })}
            />
            {formErrors.cost && <p className="error-text">{formErrors.cost}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="sub-billing">Billing Cycle</label>
            <select
              id="sub-billing"
              value={form.billingCycle}
              onChange={e => setForm({ ...form, billingCycle: e.target.value })}
            >
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
              <option value="Weekly">Weekly</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="sub-renewal">Next Renewal Date *</label>
            <input
              id="sub-renewal"
              type="date"
              value={form.renewalDate}
              onChange={e => setForm({ ...form, renewalDate: e.target.value })}
            />
            {formErrors.renewalDate && <p className="error-text">{formErrors.renewalDate}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="sub-status">Status</label>
            <select
              id="sub-status"
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="paused">Paused</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="sub-icon">Icon</label>
            <select
              id="sub-icon"
              value={form.icon}
              onChange={e => setForm({ ...form, icon: e.target.value })}
            >
              <option value="📦">📦 General</option>
              <option value="🎬">🎬 Netflix / Video</option>
              <option value="🎵">🎵 Music</option>
              <option value="🎮">🎮 Gaming</option>
              <option value="🎨">🎨 Design</option>
              <option value="☁️">☁️ Cloud Storage</option>
              <option value="📺">📺 Streaming</option>
              <option value="💼">💼 Productivity</option>
              <option value="📰">📰 News</option>
              <option value="🏋️">🏋️ Fitness</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button
              className="btn btn-primary"
              style={{ flex: 1 }}
              onClick={handleSubmit}
            >
              Add Subscription
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
};

export default Subscriptions;