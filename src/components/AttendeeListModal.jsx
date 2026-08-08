import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { X, Search, Users, ShieldCheck, Mail, Ticket, Calendar } from 'lucide-react';

export const AttendeeListModal = ({ eventId, isOpen, onClose }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen && eventId) {
      fetchAttendees();
    }
  }, [isOpen, eventId]);

  const fetchAttendees = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/organizer/events/${eventId}/attendees`);
      setData(res.data);
    } catch (err) {
      console.error('Error loading attendees:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const attendees = data?.attendees || [];
  const filteredAttendees = attendees.filter((a) => {
    const term = searchTerm.toLowerCase();
    return (
      a.purchaserName.toLowerCase().includes(term) ||
      a.purchaserEmail.toLowerCase().includes(term) ||
      a.ticketCode.toLowerCase().includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 flex-shrink-0">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-amber-400" />
              <h3 className="text-xl font-bold text-white">Attendee Roster</h3>
            </div>
            {data?.event && (
              <p className="text-xs text-slate-400">
                Event: <span className="text-white font-semibold">{data.event.title}</span> ({data.attendeesCount} tickets issued)
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative flex-shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search attendee by name, email, or ticket code..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Table View */}
        <div className="flex-1 overflow-y-auto min-h-0 border border-slate-800/80 rounded-2xl">
          {loading ? (
            <div className="p-8 text-center text-xs text-slate-400">Loading attendee roster...</div>
          ) : filteredAttendees.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400">No matching attendees found.</div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="p-3.5 font-semibold">Attendee</th>
                  <th className="p-3.5 font-semibold">Ticket Code</th>
                  <th className="p-3.5 font-semibold">Order #</th>
                  <th className="p-3.5 font-semibold">Status</th>
                  <th className="p-3.5 font-semibold">Issued Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredAttendees.map((att) => (
                  <tr key={att._id} className="hover:bg-slate-850/50">
                    <td className="p-3.5">
                      <p className="font-bold text-white">{att.purchaserName}</p>
                      <p className="text-[11px] text-slate-400">{att.purchaserEmail}</p>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-amber-400">{att.ticketCode}</td>
                    <td className="p-3.5 font-mono text-slate-300">{att.orderNumber}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {att.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-400">
                      {new Date(att.purchaseDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700"
          >
            Close Roster
          </button>
        </div>

      </div>
    </div>
  );
};
