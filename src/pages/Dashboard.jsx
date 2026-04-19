// Dashboard.jsx
// Main overview page showing stats, alerts and chart

import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useApp } from '../context/AppContext';
import StatCard from '../components/UI/StatCard';
import AlertBanner from '../components/UI/AlertBanner';
import { monthlySpending } from '../data/mockData';

function Dashboard() {
  const {
    subscriptions,
    utilities,
    bookings,
    loading,
    error,
    totalSubscriptionCost,
    totalUnpaidUtilities,
    upcomingRenewals,
    upcomingBookings,
  } = useApp();

  // Track which alerts have been dismissed
  const [dismissedAlerts, setDismissedAlerts] = useState([]);

  const dismissAlert = (id) => {
    setDismissedAlerts(prev => [...prev, id]);
  };

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <span>Loading your dashboard...</span>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error) {
    return (
      <div className="error-container">
        <p>❌ {error}</p>
      </div>
    );
  }

  // Total monthly cost (subs + unpaid utilities)
  const totalMonthly = totalSubscriptionCost + totalUnpaidUtilities;

  return (
    <div>
      <h2 className="page-title">👋 Welcome back, Bhumika!</h2>

      {/* === ALERTS SECTION === */}
      <section aria-label="Alerts" style={{ marginBottom: '24px' }}>

        {/* Upcoming renewal alerts */}
        {upcomingRenewals
          .filter(s => !dismissedAlerts.includes(`renewal-${s.id}`))
          .map(s => (
            <AlertBanner
              key={s.id}
              type="warning"
              message={`${s.icon} ${s.name} renews on ${s.nextRenewal} — $${s.cost}`}
              onClose={() => dismissAlert(`renewal-${s.id}`)}
            />
          ))
        }

        {/* Upcoming booking alerts */}
        {upcomingBookings
          .filter(b => !dismissedAlerts.includes(`booking-${b.id}`))
          .map(b => (
            <AlertBanner
              key={b.id}
              type="info"
              message={`${b.icon} ${b.title} on ${b.date} at ${b.time}`}
              onClose={() => dismissAlert(`booking-${b.id}`)}
            />
          ))
        }

        {/* Unpaid utilities alert */}
        {totalUnpaidUtilities > 0 && !dismissedAlerts.includes('utilities') && (
          <AlertBanner
            type="danger"
            message={`You have unpaid utility bills totalling $${totalUnpaidUtilities.toFixed(2)}`}
            onClose={() => dismissAlert('utilities')}
          />
        )}

      </section>

      {/* === STAT CARDS === */}
      <section className="grid-4" aria-label="Summary statistics">
        <StatCard
          title="Monthly Subscriptions"
          value={`$${totalSubscriptionCost.toFixed(2)}`}
          subtitle={`${subscriptions.filter(s => s.status === 'Active').length} active services`}
          icon="📦"
          color="#6366f1"
        />
        <StatCard
          title="Unpaid Utilities"
          value={`$${totalUnpaidUtilities.toFixed(2)}`}
          subtitle={`${utilities.filter(u => u.status === 'Unpaid').length} bills pending`}
          icon="⚡"
          color="#f59e0b"
        />
        <StatCard
          title="Total Monthly Cost"
          value={`$${totalMonthly.toFixed(2)}`}
          subtitle="Subscriptions + utilities"
          icon="💰"
          color="#10b981"
        />
        <StatCard
          title="Upcoming Bookings"
          value={bookings.filter(b => b.status !== 'Cancelled').length}
          subtitle={`${upcomingBookings.length} in the next 7 days`}
          icon="📅"
          color="#ec4899"
        />
      </section>

      {/* === SPENDING CHART === */}
      <section className="card" aria-label="Monthly spending chart" style={{ marginBottom: '24px' }}>
        <h3 style={styles.sectionTitle}>📊 Monthly Spending Overview</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={monthlySpending}>
            <defs>
              <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="utilGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#f1f5f9' }}
            />
            <Legend />
            <Area type="monotone" dataKey="subscriptions" stroke="#6366f1" fill="url(#subGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="utilities" stroke="#f59e0b" fill="url(#utilGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </section>

      {/* === RECENT ACTIVITY === */}
      <div className="grid-2">

        {/* Recent subscriptions */}
        <section className="card" aria-label="Recent subscriptions">
          <h3 style={styles.sectionTitle}>📦 Active Subscriptions</h3>
          {subscriptions.filter(s => s.status === 'Active').slice(0, 4).map(s => (
            <div key={s.id} style={styles.listItem}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>{s.icon}</span>
                <div>
                  <div style={styles.itemName}>{s.name}</div>
                  <div style={styles.itemSub}>{s.category}</div>
                </div>
              </div>
              <span style={styles.itemCost}>${s.cost}/mo</span>
            </div>
          ))}
        </section>

        {/* Upcoming bookings */}
        <section className="card" aria-label="Upcoming bookings">
          <h3 style={styles.sectionTitle}>📅 Upcoming Bookings</h3>
          {bookings.slice(0, 4).map(b => (
            <div key={b.id} style={styles.listItem}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>{b.icon}</span>
                <div>
                  <div style={styles.itemName}>{b.title}</div>
                  <div style={styles.itemSub}>{b.date} · {b.time}</div>
                </div>
              </div>
              <span className={`badge badge-${b.status.toLowerCase()}`}>{b.status}</span>
            </div>
          ))}
        </section>

      </div>
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
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #334155',
  },
  itemName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#f1f5f9',
  },
  itemSub: {
    fontSize: '12px',
    color: '#94a3b8',
  },
  itemCost: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#10b981',
  },
};

export default Dashboard;