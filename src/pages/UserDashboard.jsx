import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Ticket, Calendar, MapPin, CheckCircle, Compass, User } from 'lucide-react';

export const UserDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    setLoading(true);
    try {
      const res = await API.get('/bookings/my');
      setBookings(res.data);
    } catch (err) {
      console.error('Error loading bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const totalTickets = bookings.reduce((sum, b) => sum + (b.ticketsCount || 1), 0);
  const totalSpent = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Profile Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-50 via-slate-50 to-white border border-blue-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-slate-900">{user?.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold bg-blue-100 text-blue-700 border border-blue-200">
                Attendee
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{user?.email}</p>
          </div>
        </div>

        <Link
          to="/events"
          className="px-6 py-3 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all flex items-center space-x-2 transform hover:-translate-y-0.5"
        >
          <Compass className="w-4 h-4" />
          <span>Browse More Events</span>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Booked Events</p>
          <p className="text-3xl font-black text-slate-900">{bookings.length}</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Tickets Purchased</p>
          <p className="text-3xl font-black text-blue-600">{totalTickets}</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Amount</p>
          <p className="text-3xl font-black text-emerald-600">${totalSpent}</p>
        </div>
      </div>

      {/* Booked Tickets List */}
      <div className="space-y-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center space-x-2">
          <Ticket className="w-5 h-5 text-blue-600" />
          <span>My Tickets</span>
        </h2>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="h-32 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <Ticket className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">No Tickets Booked Yet</h3>
            <p className="text-xs text-slate-500">Explore upcoming events and reserve your spot!</p>
            <Link
              to="/events"
              className="inline-block px-5 py-2.5 rounded-full text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all"
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {bookings.map((booking) => {
              const evt = booking.event;
              if (!evt) return null;

              return (
                <div
                  key={booking._id}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    <img
                      src={evt.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80'}
                      alt={evt.title}
                      className="w-full md:w-28 h-24 rounded-xl object-cover"
                    />

                    <div className="space-y-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200">
                        {evt.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900">{evt.title}</h3>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-1">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-blue-600" />
                          <span>{evt.date} at {evt.time}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          <span>{evt.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                    <div className="flex items-center space-x-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-600">Confirmed</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      {booking.ticketsCount} Ticket(s) • <span className="text-slate-900 font-bold">${booking.totalPrice}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Booked on {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
