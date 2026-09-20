import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { EventListingPage } from './pages/EventListingPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { UserDashboard } from './pages/UserDashboard';
import { OrganizerDashboard } from './pages/OrganizerDashboard';
import { CheckoutPage } from './pages/CheckoutPage';
import { MyTicketsPage } from './pages/MyTicketsPage';
import { TicketDetailPage } from './pages/TicketDetailPage';

import { useAuth } from './context/AuthContext';

const HomeRoute = () => {
  const { isAuthenticated, isOrganizer } = useAuth();
  if (isAuthenticated) {
    return isOrganizer ? <OrganizerDashboard /> : <UserDashboard />;
  }
  return <LandingPage />;
};

export function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white text-slate-900">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomeRoute />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/events" element={<EventListingPage />} />
              <Route path="/events/:id" element={<EventDetailPage />} />

              {/* Ticket Purchasing & Pass Routes */}
              <Route
                path="/checkout/:eventId"
                element={
                  <ProtectedRoute allowedRole="user">
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/my-tickets"
                element={
                  <ProtectedRoute allowedRole="user">
                    <MyTicketsPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/tickets/:ticketId"
                element={
                  <ProtectedRoute>
                    <TicketDetailPage />
                  </ProtectedRoute>
                }
              />

              {/* Protected Dashboards */}
              <Route
                path="/user-dashboard"
                element={
                  <ProtectedRoute allowedRole="user">
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/organizer-dashboard"
                element={
                  <ProtectedRoute allowedRole="organizer">
                    <OrganizerDashboard />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
