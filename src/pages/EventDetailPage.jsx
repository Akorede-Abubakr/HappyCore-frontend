import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { TicketSelection } from '../components/TicketSelection';
import { Calendar, Clock, MapPin, Ticket, User, ArrowLeft, CheckCircle2, AlertCircle, Shield } from 'lucide-react';

export const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isOrganizer } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ticketsCount, setTicketsCount] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/events/${id}`);
      setEvent(res.data);
    } catch (err) {
      console.error('Error loading event detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookTickets = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isOrganizer) {
      setErrorMessage('Organizer accounts cannot book tickets. Please use an Attendee account.');
      return;
    }

    setBookingLoading(true);
    setErrorMessage('');
    try {
      await API.post('/bookings', {
        eventId: id,
        ticketsCount
      });
      setBookingSuccess(true);
      fetchEventDetails(); // Refresh ticket inventory
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to complete ticket booking.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-6">
        <div className="h-96 rounded-3xl bg-slate-900 animate-pulse" />
        <div className="h-12 w-2/3 bg-slate-900 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-4">Event Not Found</h2>
        <Link to="/events" className="text-indigo-400 hover:underline">
          Back to all events
        </Link>
      </div>
    );
  }

  const isSoldOut = event.availableTickets <= 0;
  const totalPrice = event.price * ticketsCount;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <Link
        to="/events"
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Events Catalog</span>
      </Link>

      {/* Main Image Banner */}
      <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
        <img
          src={event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-lg">
              {event.category || 'Event'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Info Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Key Meta Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Date</p>
                <p className="text-xs font-bold text-white">{event.date}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-pink-600/20 text-pink-400 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Time</p>
                <p className="text-xs font-bold text-white">{event.time}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Location</p>
                <p className="text-xs font-bold text-white truncate">{event.location}</p>
              </div>
            </div>
          </div>

          {/* About Event */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4">
            <h3 className="text-xl font-bold text-white">About This Event</h3>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Host Info */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-bold text-lg border border-indigo-500/30">
                {event.organizer?.name?.charAt(0).toUpperCase() || 'H'}
              </div>
              <div>
                <p className="text-xs text-slate-400">Event Host</p>
                <p className="text-sm font-bold text-white">{event.organizer?.name || 'HappyCore Partner'}</p>
              </div>
            </div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
              <Shield className="w-3.5 h-3.5" />
              <span>Verified Organizer</span>
            </div>
          </div>

        </div>

        {/* Right Ticket Purchase Widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-28">
            <TicketSelection event={event} />
          </div>
        </div>

      </div>

    </div>
  );
};
