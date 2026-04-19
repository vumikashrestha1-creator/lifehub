// AppContext.jsx
// Shared state for the whole app - all pages can access this data

import { createContext, useContext, useState, useEffect } from 'react';
import {
  subscriptions as initialSubs,
  utilities as initialUtils,
  bookings as initialBookings,
  userProfile as initialProfile
} from '../data/mockData';

// Step 1: Create the context
const AppContext = createContext();

// Step 2: Create the Provider
export function AppProvider({ children }) {

  const [subscriptions, setSubscriptions] = useState([]);
  const [utilities, setUtilities]         = useState([]);
  const [bookings, setBookings]           = useState([]);
  const [userProfile, setUserProfile]     = useState(initialProfile);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);

  // Simulates loading data from an API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setSubscriptions(initialSubs);
        setUtilities(initialUtils);
        setBookings(initialBookings);
        setError(null);
      } catch (err) {
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // ========================
  // SUBSCRIPTION ACTIONS
  // ========================
  const addSubscription = (newSub) => {
    setSubscriptions(prev => [...prev, { ...newSub, id: Date.now() }]);
  };

  const deleteSubscription = (id) => {
    setSubscriptions(prev => prev.filter(s => s.id !== id));
  };

  // ========================
  // BOOKING ACTIONS
  // ========================
  const addBooking = (newBooking) => {
    setBookings(prev => [...prev, { ...newBooking, id: Date.now() }]);
  };

  const deleteBooking = (id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  // ========================
  // UTILITY ACTIONS
  // ========================
  // Mark a utility bill as paid
  const markUtilityPaid = (id) => {
    setUtilities(prev =>
      prev.map(u => u.id === id ? { ...u, status: 'paid' } : u)
    );
  };

  // ========================
  // CALCULATED VALUES
  // ========================

  // Total cost of active subscriptions
  const totalSubscriptionCost = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + s.cost, 0);

  // Total amount of unpaid utility bills (uses "amount" field)
  const totalUnpaidUtilities = utilities
    .filter(u => u.status !== 'paid')
    .reduce((sum, u) => sum + u.amount, 0);

  const today = new Date();

  // Subscriptions renewing within 7 days
  const upcomingRenewals = subscriptions.filter(s => {
    const renewal = new Date(s.renewalDate);
    const diff = (renewal - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  });

  // Bookings within the next 7 days
  const upcomingBookings = bookings.filter(b => {
    const bookingDate = new Date(b.date);
    const diff = (bookingDate - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  });

  // ========================
  // PROFILE ACTIONS
  // ========================
  const updateProfile = (updatedProfile) => {
    setUserProfile(prev => ({ ...prev, ...updatedProfile }));
  };

  // Step 3: Provide everything to child components
  return (
    <AppContext.Provider value={{
      // Data
      subscriptions,
      utilities,
      bookings,
      userProfile,
      loading,
      error,
      // Subscription actions
      addSubscription,
      deleteSubscription,
      // Booking actions
      addBooking,
      deleteBooking,
      // Utility actions
      markUtilityPaid,
      // Profile actions
      updateProfile,
      // Calculated values
      totalSubscriptionCost,
      totalUnpaidUtilities,
      upcomingRenewals,
      upcomingBookings,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// Step 4: Custom hook so any component can access context easily
export function useApp() {
  return useContext(AppContext);
}