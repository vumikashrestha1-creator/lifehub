// Utilities.jsx
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Modal from '../components/UI/Modal';
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

function Utilities() {
  const { utilities, loading, error, markUtilityPaid } = useApp();
  const [filter, setFilter]       = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]           = useState({
    name: '', provider: '', amount: '',
    usage: '', dueDate: '', status: 'upcoming', icon: '💡'
  });
  const [formErrors, setFormErrors] = useState({});

  // Filter bills
  const filtered = utilities.filter(u =>
    filter === 'All' || u.status === filter
  );

  // Chart data
  const chartData = utilities.map(u => ({
    name: u.name,
    amount: u.amount
  }));

  // Summary calculations
  const totalBills  = utilities.reduce((sum, u) => sum + u.amount, 0);
  const totalUnpaid = utilities.filter(u => u.status !== 'paid').reduce((sum, u) => sum + u.amount, 0);
  const paidCount   = utilities.filter(u => u.status === 'paid').length;

  // Form validation
  const validate = () => {
    const errors = {};
    if (!form.name.trim())     errors.name = 'Utility name is required';
    if (!form.provider.trim()) errors.provider = 'Provider is required';
    if (!form.amount || form.amount <= 0) errors.amount = 'Enter a valid amount';
    if (!form.dueDate)         errors.dueDate = 'Due date is required';
    return errors;
  };

  // Submit new bill
  const handleSubmit = () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    // Add to utilities list via context
    // We directly update since we don't have addUtility in context yet
    utilities.push({
      id: Date.now(),
      name: form.name,
      provider: form.provider,
      amount: parseFloat(form.amount),
      usage: form.usage,
      dueDate: form.dueDate,
      status: form.status,
      icon: form.icon,
    });
    setShowModal(false);
    setForm({ name: '', provider: '', amount: '', usage: '', dueDate: '', status: 'upcoming', icon: '💡' });
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
      <h2 className="page-title">⚡ Utilities</h2>

      {/* Summary cards */}
      <div className="grid-3" style={{ marginBottom: '24px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#f59e0b' }}>
            ${totalBills.toFixed(2)}
          </div>
          <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Total Bills</div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#ef4444' }}>
            ${totalUnpaid.toFixed(2)}
          </div>
          <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Unpaid</div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#10b981' }}>
            {paidCount}/{utilities.length}
          </div>
          <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Bills Paid</div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={styles.sectionTitle}>💡 Bill Comparison</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#f1f5f9' }}
              formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
            />
            <Bar dataKey="amount" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Toolbar — filter + add button */}
      <div className="toolbar">
        <select
          className="filter-select"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="All">All Bills</option>
          <option value="paid">Paid</option>
          <option value="due">Due</option>
          <option value="upcoming">Upcoming</option>
          <option value="overdue">Overdue</option>
        </select>
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
          aria-label="Add new bill"
        >
          + Add Bill
        </button>
      </div>

      {/* Table */}
      <div className="card">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⚡</div>
            <p>No bills found</p>
          </div>
        ) : (
          <div className="table-container">
            <table aria-label="Utilities table">
              <thead>
                <tr>
                  <th>Utility</th>
                  <th>Provider</th>
                  <th>Usage</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '20px' }}>{u.icon}</span>
                        <span style={{ fontWeight: 500 }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ color: '#94a3b8' }}>{u.provider}</td>
                    <td style={{ color: '#94a3b8' }}>{u.usage}</td>
                    <td style={{ color: '#f59e0b', fontWeight: 600 }}>
                      ${u.amount.toFixed(2)}
                    </td>
                    <td style={{ color: '#94a3b8' }}>{u.dueDate}</td>
                    <td>
                      <span className={`badge badge-${u.status}`}>{u.status}</span>
                    </td>
                    <td>
                      {u.status !== 'paid' ? (
                        <button
                          className="btn btn-primary"
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                          onClick={() => markUtilityPaid(u.id)}
                          aria-label={`Mark ${u.name} as paid`}
                        >
                          Pay Now
                        </button>
                      ) : (
                        <span style={{ color: '#10b981', fontSize: '13px' }}>✅ Paid</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Bill Modal */}
      {showModal && (
        <Modal title="➕ Add Utility Bill" onClose={() => setShowModal(false)}>

          <div className="form-group">
            <label htmlFor="util-name">Utility Name *</label>
            <input id="util-name" type="text" placeholder="e.g. Electricity"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} />
            {formErrors.name && <p className="error-text">{formErrors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="util-provider">Provider *</label>
            <input id="util-provider" type="text" placeholder="e.g. AGL Energy"
              value={form.provider}
              onChange={e => setForm({ ...form, provider: e.target.value })} />
            {formErrors.provider && <p className="error-text">{formErrors.provider}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="util-amount">Amount ($) *</label>
            <input id="util-amount" type="number" placeholder="e.g. 120.50"
              value={form.amount}
              onChange={e => setForm({ ...form, amount: e.target.value })} />
            {formErrors.amount && <p className="error-text">{formErrors.amount}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="util-usage">Usage (optional)</label>
            <input id="util-usage" type="text" placeholder="e.g. 450 kWh"
              value={form.usage}
              onChange={e => setForm({ ...form, usage: e.target.value })} />
          </div>

          <div className="form-group">
            <label htmlFor="util-due">Due Date *</label>
            <input id="util-due" type="date"
              value={form.dueDate}
              onChange={e => setForm({ ...form, dueDate: e.target.value })} />
            {formErrors.dueDate && <p className="error-text">{formErrors.dueDate}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="util-status">Status</label>
            <select id="util-status" value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}>
              <option value="upcoming">Upcoming</option>
              <option value="due">Due</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="util-icon">Icon</label>
            <select id="util-icon" value={form.icon}
              onChange={e => setForm({ ...form, icon: e.target.value })}>
              <option value="⚡">⚡ Electricity</option>
              <option value="💧">💧 Water</option>
              <option value="📶">📶 Internet</option>
              <option value="🔥">🔥 Gas</option>
              <option value="🏠">🏠 Rent</option>
              <option value="💡">💡 Other</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSubmit}>
              Add Bill
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
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#f1f5f9',
  },
};

export default Utilities;