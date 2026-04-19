# ⚡ LifeHub Dashboard

### Smart Personal Services Control Center
> ICT930 Advanced Web Application Development — Assignment 2

---

## 📖 Project Overview

LifeHub Dashboard is a production-quality frontend web application built with React and Vite. It allows users to manage and track their personal services in one place — including subscriptions, utility bills, and appointments/bookings.

The application simulates a real-world smart services dashboard where users can:
- Monitor all their active subscriptions and costs
- Track utility bills and mark them as paid
- Manage upcoming bookings and appointments
- View monthly spending trends through interactive charts
- Receive smart alerts for upcoming renewals and due bills

---

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| React 18 | Frontend framework (functional components + hooks) |
| Vite | Build tool and development server |
| React Router DOM | Client-side multi-page navigation |
| Recharts | Interactive charts and data visualisation |
| Context API | Global state management |
| CSS (custom) | Styling and responsive design |

---

## 🚀 Installation & Setup

Follow these steps to run the project locally:

### Prerequisites
- Node.js (v18 or higher)
- npm

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/vumikashrestha1-creator/lifehub.git
```

**2. Navigate into the project folder**
```bash
cd lifehub
```

**3. Install dependencies**
```bash
npm install
```

**4. Start the development server**
```bash
npm run dev
```

**5. Open in browser**
```
http://localhost:5173
```

---

## ✨ Key Features

### 🏠 Dashboard
- Overview of all services at a glance
- 4 summary stat cards (subscriptions, utilities, total cost, bookings)
- Interactive area chart showing 6 months of spending history
- Smart alert banners for upcoming renewals and due bills
- Quick view of active subscriptions and upcoming bookings
- Dismissible alerts

### 📦 Subscriptions
- View all subscriptions in a clean table layout
- Search subscriptions by name in real time
- Filter by status (Active / Paused)
- Add new subscriptions with full form validation
- Delete subscriptions
- Monthly cost summary

### ⚡ Utilities
- View all utility bills (electricity, water, internet, gas)
- Bar chart comparing bill amounts visually
- Summary cards showing total, unpaid, and paid counts
- Mark bills as paid with Pay Now button
- Add new utility bills with form validation
- Filter by bill status (Due / Upcoming / Overdue / Paid)

### 📅 Bookings
- View appointments as visual cards
- Search by title or location
- Filter by status (Confirmed / Pending)
- Add new bookings with form validation
- Cancel bookings
- Notes support for each booking

### ⚙️ Settings
- Update profile name and email with validation
- Change currency preference
- Toggle email notification preference
- App information display
- Save confirmation feedback

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Navbar.jsx        ← Top navigation bar
│   │   └── Sidebar.jsx       ← Side navigation menu
│   └── UI/
│       ├── StatCard.jsx      ← Reusable stat card
│       ├── Modal.jsx         ← Reusable popup modal
│       └── AlertBanner.jsx   ← Reusable alert component
├── context/
│   └── AppContext.jsx        ← Global state management
├── data/
│   └── mockData.js           ← Mock JSON data
├── pages/
│   ├── Dashboard.jsx         ← Main overview page
│   ├── Subscriptions.jsx     ← Subscriptions management
│   ├── Utilities.jsx         ← Utility bills management
│   ├── Bookings.jsx          ← Bookings management
│   └── Settings.jsx          ← User settings
├── styles/
│   └── global.css            ← Global styles and variables
├── App.jsx                   ← Route configuration
└── main.jsx                  ← App entry point
```

---

## 🎨 Design Decisions

### Dark Theme
A dark colour scheme was chosen to create a modern, professional dashboard feel. CSS custom properties (variables) are used throughout to maintain consistency and make theme changes easy.

### Component Architecture
The app follows a clear separation of concerns:
- **Layout components** handle the overall page structure
- **UI components** are small, reusable pieces (StatCard, Modal, AlertBanner)
- **Page components** contain the business logic for each route
- **Context** manages shared state across all pages

### Context API over Redux
Context API was chosen for state management as it is built into React and sufficient for this application's scale. It avoids the extra boilerplate of Redux while still providing clean global state access.

### Mock Data with Async Simulation
The app simulates real API behaviour by introducing a loading delay (800ms) when the app starts. This demonstrates proper handling of loading states, error states, and empty states.

### Recharts for Data Visualisation
Recharts was chosen for its simple React integration and clean, responsive chart components. The dashboard uses an Area chart for spending trends and a Bar chart for utility bill comparison.

---

## 📱 Responsive Design

The application is fully responsive:
- **Desktop** — full sidebar + content layout
- **Tablet** — adjusted grid columns
- **Mobile** — collapsed sidebar, stacked layout

---

## ♿ Accessibility

- Semantic HTML elements (header, nav, main, article, section)
- ARIA labels on all interactive elements
- ARIA roles on modal dialogs and toggle switches
- Sufficient colour contrast throughout
- Keyboard navigable interface

---

## 👤 Author

**Bhumika Shrestha**
ICT930 — Advanced Web Application Development
Semester 1, 2026
CIHE — MIT Program