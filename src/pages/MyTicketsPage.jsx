import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { Ticket, Calendar, MapPin, QrCode, ArrowRight, ShieldCheck, Search } from 'lucide-react';

export const MyTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await API.get('/tickets/my');
      setTickets(res.data);
    } catch (err) {
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = tickets.filter((t) => {
    const title = t.event?.title || '';
    const code = t.ticketCode || '';
    return title.toLowerCase().includes(searchTerm.toLowerCase()) || code.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
            <Ticket className="w-3.5 h-3.5" />
            <span>Digital Ticket Wallet</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">My Issued Tickets</h1>
          <p className="text-slate-400 text-sm">
            Access your verified HappyCore event passes and digital stubs anytime.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tickets by code or title..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Tickets List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-44 rounded-3xl bg-slate-900 animate-pulse" />
          ))}
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-4">
          <Ticket className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-xl font-bold text-white">No Tickets Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchTerm ? 'No tickets matched your search criteria.' : 'You have not purchased any event tickets yet.'}
          </p>
          <Link
            to="/events"
            className="inline-block px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
          >
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTickets.map((ticket) => {
            const evt = ticket.event;
            if (!evt) return null;

            return (
              <div
                key={ticket._id}
                className="group relative bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden hover:border-indigo-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                {/* Top Banner section */}
                <div className="p-6 flex items-start justify-between border-b border-slate-800/80 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/30">
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                        {evt.category}
                      </span>
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{ticket.status}</span>
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {evt.title}
                    </h3>
                  </div>

                  {/* QR Stub Graphic */}
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-indigo-400 flex-shrink-0">
                    <QrCode className="w-6 h-6" />
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 space-y-3 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Ticket Pass Code:</span>
                    <span className="font-mono font-bold text-indigo-300 text-sm tracking-wider">
                      {ticket.ticketCode}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/60">
                    <div className="flex items-center space-x-1.5 text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                      <span className="truncate">{evt.date} • {evt.time}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Issued: {new Date(ticket.issuedAt).toLocaleDateString()}
                  </span>

                  <Link
                    to={`/tickets/${ticket._id}`}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 transition-all flex items-center space-x-1.5"
                  >
                    <span>View Digital Ticket Pass</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
