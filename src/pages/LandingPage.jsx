import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { EventCard } from '../components/EventCard';
import { Sparkles, Calendar, Ticket, ShieldCheck, Zap, ArrowRight, Compass } from 'lucide-react';

export const LandingPage = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get('/events');
        setFeaturedEvents(res.data.slice(0, 3)); // Top 3 featured
      } catch (err) {
        console.error('Error fetching featured events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-pink-500/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-8 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to HappyCore Ticketing Foundation</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Discover & Book <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Unforgettable Live Events
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            HappyCore connects passionate event creators with attendees. Reserve your spot at live concerts, tech summits, and exclusive workshops in seconds.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/events"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
            >
              <Compass className="w-5 h-5" />
              <span>Explore All Events</span>
            </Link>

            <Link
              to="/register?role=organizer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800/80 transition-all flex items-center justify-center space-x-2"
            >
              <Ticket className="w-5 h-5 text-indigo-400" />
              <span>Host an Event</span>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-10 border-t border-slate-800/60">
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm">
              <p className="text-3xl font-extrabold text-white">100%</p>
              <p className="text-xs text-slate-400 mt-1">Verified Tickets</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm">
              <p className="text-3xl font-extrabold text-indigo-400">Instant</p>
              <p className="text-xs text-slate-400 mt-1">Booking Confirmation</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm">
              <p className="text-3xl font-extrabold text-pink-400">24/7</p>
              <p className="text-xs text-slate-400 mt-1">Dedicated Platform Access</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm">
              <p className="text-3xl font-extrabold text-emerald-400">Zero</p>
              <p className="text-xs text-slate-400 mt-1">Hidden Convenience Fees</p>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
              <Calendar className="w-4 h-4" />
              <span>Trending Now</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Featured Upcoming Events</h2>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center space-x-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 rounded-2xl bg-slate-900 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white">Why HappyCore Ticketing?</h2>
          <p className="text-slate-400 mt-2 text-sm">
            Built from the ground up for seamless attendee registration and effortless event hosting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4 hover:border-indigo-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Lightning Fast Checkout</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Book tickets instantly with our streamlined user authorization and real-time inventory management.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4 hover:border-indigo-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-pink-600/20 border border-pink-500/30 text-pink-400 flex items-center justify-center">
              <Ticket className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Organizer Control Suite</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Create, update, and manage your events with capacity limits, custom dates, and transparent ticket tracking.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4 hover:border-indigo-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Secure JWT Authentication</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Protected routes and role-based authorization ensure standard users and event organizers have secure portal access.
            </p>
          </div>
        </div>
      </section>

      {/* Host Event Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900/50 via-slate-900 to-slate-900 border border-indigo-500/30 p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-3xl font-extrabold text-white">Ready to Host Your Next Big Event?</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Join thousands of organizers publishing concerts, tech conferences, and workshops on HappyCore.
            </p>
          </div>
          <Link
            to="/register?role=organizer"
            className="px-8 py-4 rounded-2xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all flex-shrink-0"
          >
            Create Organizer Account
          </Link>
        </div>
      </section>

    </div>
  );
};
