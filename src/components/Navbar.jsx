import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Ticket, Calendar, User, LogOut, Menu, X, LayoutDashboard, ArrowUpRight } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, isOrganizer, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isHome = location.pathname === '/';

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    if (isHome) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
              <Ticket className="w-5 h-5 text-white transform -rotate-12" />
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-black tracking-tight text-slate-900">
                Tickets<span className="text-blue-600">Candy</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection('fees')}
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              Fees Explained
            </button>
            <Link
              to="/events"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors flex items-center space-x-1"
            >
              <span>Explore Events</span>
            </Link>

            {isAuthenticated && !isOrganizer && (
              <Link
                to="/my-tickets"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center space-x-1"
              >
                <Ticket className="w-4 h-4" />
                <span>My Tickets</span>
              </Link>
            )}

            {isAuthenticated && isOrganizer && (
              <Link
                to="/organizer-dashboard"
                className="text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors flex items-center space-x-1"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Organizer Dashboard</span>
              </Link>
            )}
          </div>

          {/* Right Action / Profile */}
          <div className="hidden md:flex items-center space-x-5">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left pr-1">
                    <p className="text-xs font-bold text-slate-900 leading-tight">{user?.name}</p>
                    <span className={`inline-block text-[9px] font-bold uppercase tracking-wider ${
                      isOrganizer ? 'text-amber-600' : 'text-blue-600'
                    }`}>
                      {user?.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                  title="Log Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/register?role=organizer"
                  className="px-5 py-2.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
          >
            Home
          </Link>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('benefits')}
            className="block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
          >
            Benefits
          </button>
          <button
            onClick={() => scrollToSection('fees')}
            className="block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
          >
            Fees Explained
          </button>
          <Link
            to="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
          >
            Explore Events
          </Link>

          {isAuthenticated && !isOrganizer && (
            <Link
              to="/my-tickets"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-blue-600 hover:bg-blue-50"
            >
              My Tickets
            </Link>
          )}
          {isAuthenticated && isOrganizer && (
            <Link
              to="/organizer-dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-amber-600 hover:bg-amber-50"
            >
              Organizer Dashboard
            </Link>
          )}

          <div className="pt-4 border-t border-slate-200">
            {isAuthenticated ? (
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="px-3 py-1.5 rounded-full text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 rounded-full text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
                >
                  Login
                </Link>
                <Link
                  to="/register?role=organizer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
