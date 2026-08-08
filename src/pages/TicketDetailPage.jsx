import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Ticket, Calendar, Clock, MapPin, QrCode, ArrowLeft, Printer, ShieldCheck, User, Building2 } from 'lucide-react';

export const TicketDetailPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchTicketDetail();
  }, [ticketId]);

  const fetchTicketDetail = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/tickets/${ticketId}`);
      setTicket(res.data);
    } catch (err) {
      console.error('Error fetching ticket detail:', err);
      setErrorMsg(err.response?.data?.message || 'Failed to load ticket pass.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 space-y-6">
        <div className="h-96 rounded-3xl bg-slate-900 animate-pulse" />
      </div>
    );
  }

  if (errorMsg || !ticket) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Ticket Stub Unavailable</h3>
        <p className="text-xs text-slate-400">{errorMsg || 'Ticket pass not found.'}</p>
        <Link to="/my-tickets" className="inline-block px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600">
          Return to My Tickets
        </Link>
      </div>
    );
  }

  const evt = ticket.event;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 print:py-0 print:max-w-full">
      
      {/* Top Navigation Action (hidden during print) */}
      <div className="flex items-center justify-between print:hidden">
        <Link
          to="/my-tickets"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Tickets</span>
        </Link>

        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center space-x-2"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Pass</span>
        </button>
      </div>

      {/* Digital Ticket Pass Card */}
      <div className="bg-slate-900 border-2 border-indigo-500/40 rounded-3xl overflow-hidden shadow-2xl space-y-0 print:border-black print:text-black">
        
        {/* Pass Header */}
        <div className="p-8 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 border-b border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg">
              <Ticket className="w-6 h-6 transform -rotate-12" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-white">
                Happy<span className="text-indigo-400">Core</span>
              </span>
              <p className="text-[10px] uppercase font-bold tracking-widest text-indigo-300">
                Official Digital Event Pass
              </p>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Pass Status: {ticket.status}</span>
          </div>
        </div>

        {/* Event Details */}
        <div className="p-8 space-y-8">
          
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600/30 text-indigo-300 border border-indigo-500/30">
              {evt?.category || 'General'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {evt?.title}
            </h1>
          </div>

          {/* Grid Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="space-y-1">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Date & Time</p>
              <div className="flex items-center space-x-2 text-sm font-bold text-white">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>{evt?.date} at {evt?.time}</span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Venue / Location</p>
              <div className="flex items-center space-x-2 text-sm font-bold text-white">
                <MapPin className="w-4 h-4 text-pink-400" />
                <span>{evt?.location}</span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Ticket Holder</p>
              <div className="flex items-center space-x-2 text-xs font-bold text-white">
                <User className="w-4 h-4 text-indigo-400" />
                <span>{ticket.user?.name} ({ticket.user?.email})</span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Event Organizer</p>
              <div className="flex items-center space-x-2 text-xs font-bold text-white">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>{evt?.organizer?.name || 'HappyCore Verified Host'}</span>
              </div>
            </div>
          </div>

          {/* Digital QR / Barcode Display section */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-2">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Unique Ticket Code</p>
              <p className="text-3xl font-extrabold font-mono text-indigo-400 tracking-wider">
                {ticket.ticketCode}
              </p>
              <p className="text-[11px] text-slate-500">
                Present this code or digital pass at entry gate for verification.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white flex flex-col items-center justify-center space-y-1 shadow-lg">
              <QrCode className="w-24 h-24 text-slate-950" />
              <span className="text-[9px] font-mono font-bold text-slate-700">{ticket.ticketCode}</span>
            </div>
          </div>

        </div>

        {/* Pass Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-500">
          HappyCore Ticketing System • Ticket ID: <span className="font-mono text-slate-400">{ticket._id}</span>
        </div>

      </div>

    </div>
  );
};
