// ============================================
// MOCK DATA - Fake data for our app
// ============================================

// --- SUBSCRIPTIONS ---
export const subscriptions = [
  {
    id: 1,
    name: "Netflix",
    category: "Entertainment",
    cost: 15.99,
    billingCycle: "Monthly",
    renewalDate: "2026-05-01",
    status: "active",
    icon: "🎬",
  },
  {
    id: 2,
    name: "Spotify",
    category: "Music",
    cost: 9.99,
    billingCycle: "Monthly",
    renewalDate: "2026-04-25",
    status: "active",
    icon: "🎵",
  },
  {
    id: 3,
    name: "Adobe Creative",
    category: "Design",
    cost: 54.99,
    billingCycle: "Monthly",
    renewalDate: "2026-05-10",
    status: "active",
    icon: "🎨",
  },
  {
    id: 4,
    name: "Xbox Game Pass",
    category: "Gaming",
    cost: 14.99,
    billingCycle: "Monthly",
    renewalDate: "2026-04-30",
    status: "active",
    icon: "🎮",
  },
  {
    id: 5,
    name: "iCloud Storage",
    category: "Storage",
    cost: 2.99,
    billingCycle: "Monthly",
    renewalDate: "2026-05-05",
    status: "active",
    icon: "☁️",
  },
  {
    id: 6,
    name: "YouTube Premium",
    category: "Entertainment",
    cost: 13.99,
    billingCycle: "Monthly",
    renewalDate: "2026-05-15",
    status: "paused",
    icon: "📺",
  },
];

// --- UTILITIES ---
export const utilities = [
  {
    id: 1,
    name: "Electricity",
    provider: "AGL Energy",
    amount: 120.50,
    dueDate: "2026-04-28",
    status: "due",
    icon: "⚡",
    usage: "520 kWh",
  },
  {
    id: 2,
    name: "Water",
    provider: "Sydney Water",
    amount: 75.00,
    dueDate: "2026-05-10",
    status: "upcoming",
    icon: "💧",
    usage: "180 L/day",
  },
  {
    id: 3,
    name: "Internet",
    provider: "Telstra",
    amount: 89.00,
    dueDate: "2026-05-02",
    status: "upcoming",
    icon: "📶",
    usage: "340 GB",
  },
  {
    id: 4,
    name: "Gas",
    provider: "Origin Energy",
    amount: 60.00,
    dueDate: "2026-04-22",
    status: "overdue",
    icon: "🔥",
    usage: "45 MJ",
  },
];

// --- BOOKINGS ---
export const bookings = [
  {
    id: 1,
    title: "Dentist Appointment",
    date: "2026-04-25",
    time: "10:00 AM",
    location: "City Dental Clinic",
    status: "confirmed",
    icon: "🦷",
    notes: "Regular checkup and cleaning",
  },
  {
    id: 2,
    title: "Car Service",
    date: "2026-04-28",
    time: "9:00 AM",
    location: "AutoFix Garage",
    status: "confirmed",
    icon: "🚗",
    notes: "Oil change and tyre rotation",
  },
  {
    id: 3,
    title: "Eye Checkup",
    date: "2026-05-05",
    time: "2:00 PM",
    location: "Vision Care Centre",
    status: "confirmed",
    icon: "👁️",
    notes: "Annual eye examination",
  },
  {
    id: 4,
    title: "Haircut",
    date: "2026-05-08",
    time: "11:00 AM",
    location: "Style Studio",
    status: "pending",
    icon: "✂️",
    notes: "",
  },
  {
    id: 5,
    title: "Physio Appointment",
    date: "2026-05-08",
    time: "2:00 PM",
    location: "Southside Physio Canberra",
    status: "confirmed",
    icon: "🏥",
    notes: "For my back pain",
  },
];

// --- MONTHLY SPENDING (for chart) ---
export const monthlySpending = [
  { month: "Nov", subscriptions: 90,  utilities: 280, bookings: 50  },
  { month: "Dec", subscriptions: 95,  utilities: 310, bookings: 120 },
  { month: "Jan", subscriptions: 110, utilities: 295, bookings: 80  },
  { month: "Feb", subscriptions: 112, utilities: 270, bookings: 60  },
  { month: "Mar", subscriptions: 112, utilities: 345, bookings: 150 },
  { month: "Apr", subscriptions: 112, utilities: 344, bookings: 200 },
];

// --- USER PROFILE ---
export const userProfile = {
  name: "Bhumika Shrestha",
  email: "bhumika.shrestha@gmail.com",
  avatar: "👤",
  currency: "AUD",
  notifications: true,
  darkMode: true,
};