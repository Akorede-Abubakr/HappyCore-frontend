import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { TicketTypeManager } from '../components/TicketTypeManager';
import { AttendeeListModal } from '../components/AttendeeListModal';
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Ticket,
  Users,
  DollarSign,
  TrendingUp,
  BarChart3,
  Image as ImageIcon,
  AlertCircle,
  X,
  Eye,
  Sparkles
} from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'Music Concert', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Tech Summit', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80' },
  { label: 'UI/UX Workshop', url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Art NFT Expo', url: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=80' }
];

export const OrganizerDashboard = () => {
  const { user } = useAuth();

  const [analytics, setAnalytics] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tab State
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'events'

  // Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Attendee Roster Modal State
  const [attendeeModalOpen, setAttendeeModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Tech',
    date: '',
    time: '18:00',
    location: '',
    price: 0,
    totalTickets: 100,
    imageUrl: '',
    ticketTypes: [{ name: 'General Admission', price: 50, capacity: 100, available: 100 }]
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await API.get('/organizer/analytics');
      setAnalytics(res.data.summary);
      setEvents(res.data.events);
    } catch (err) {
      console.error('Error loading organizer analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      category: 'Tech',
      date: new Date().toISOString().split('T')[0],
      time: '18:00',
      location: '',
      price: 50,
      totalTickets: 100,
      imageUrl: PRESET_IMAGES[0].url,
      ticketTypes: [
        { name: 'General Admission', price: 50, capacity: 80, available: 80 },
        { name: 'VIP Pass', price: 120, capacity: 20, available: 20 }
      ]
    });
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      category: event.category || 'Other',
      date: event.date,
      time: event.time,
      location: event.location,
      price: event.price,
      totalTickets: event.totalTickets,
      imageUrl: event.imageUrl || '',
      ticketTypes: event.ticketTypes && event.ticketTypes.length > 0
        ? event.ticketTypes
        : [{ name: 'General Admission', price: event.price, capacity: event.totalTickets, available: event.availableTickets }]
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    try {
      if (editingEvent) {
        await API.put(`/events/${editingEvent._id}`, formData);
      } else {
        await API.post('/events', formData);
      }
      setModalOpen(false);
      fetchDashboardData();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Error saving event');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      try {
        await API.delete(`/events/${eventId}`);
        fetchDashboardData();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete event.');
      }
    }
  };

  const openAttendeeRoster = (eventId) => {
    setSelectedEventId(eventId);
    setAttendeeModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Host Profile Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-600/30 border border-amber-500/40 text-amber-400 font-extrabold text-2xl flex items-center justify-center shadow-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold text-white">{user?.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Event Host Portal
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={openCreateModal}
          className="px-6 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-xl shadow-amber-600/30 transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Event</span>
        </button>
      </div>

      {/* KPI Stats Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">
            ${analytics?.totalRevenue || 0}
          </p>
          <p className="text-[11px] text-emerald-400 flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Real-time Ticket Sales</span>
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tickets Sold</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Ticket className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-indigo-400">
            {analytics?.totalTicketsSold || 0}
          </p>
          <p className="text-[11px] text-slate-400">
            Out of {analytics?.totalCapacity || 0} total capacity
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Hosted Events</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-amber-400">
            {analytics?.totalEvents || 0}
          </p>
          <p className="text-[11px] text-slate-400">Active event listings</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Occupancy Rate</span>
            <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-pink-400">
            {analytics?.occupancyRate || 0}%
          </p>
          <p className="text-[11px] text-slate-400">Average sales conversion</p>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'overview'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analytics & Revenue</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'events'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Manage Events ({events.length})</span>
        </button>
      </div>

      {/* Tab 1: Overview & Revenue Analytics */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <span>Event Revenue & Sales Performance</span>
            </h3>

            {loading ? (
              <div className="py-12 text-center text-xs text-slate-400">Loading performance metrics...</div>
            ) : events.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 space-y-3">
                <p>No events listed yet. Create an event to begin tracking revenue.</p>
                <button
                  onClick={openCreateModal}
                  className="px-4 py-2 rounded-xl font-bold bg-amber-600 text-white text-xs"
                >
                  Create Event
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((evt) => {
                  const percentSold = evt.totalTickets > 0 ? Math.round((evt.ticketsSold / evt.totalTickets) * 100) : 0;

                  return (
                    <div
                      key={evt._id}
                      className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                            {evt.category}
                          </span>
                          <h4 className="text-sm font-bold text-white">{evt.title}</h4>
                        </div>
                        <p className="text-xs text-slate-400">
                          {evt.date} • Location: {evt.location}
                        </p>

                        {/* Progress Bar */}
                        <div className="w-full max-w-md pt-2 space-y-1">
                          <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                            <span>Sales Progress ({evt.ticketsSold} / {evt.totalTickets})</span>
                            <span className="text-amber-400 font-bold">{percentSold}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                              style={{ width: `${percentSold}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800 w-full md:w-auto justify-between md:justify-end">
                        <div className="text-right">
                          <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Revenue</p>
                          <p className="text-lg font-extrabold text-emerald-400">${evt.revenue}</p>
                        </div>

                        <button
                          onClick={() => openAttendeeRoster(evt._id)}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 transition-colors flex items-center space-x-1.5"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>View Attendees</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Manage Events */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2].map((n) => (
                <div key={n} className="h-32 rounded-2xl bg-slate-900 animate-pulse" />
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-4">
              <Calendar className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Events Published Yet</h3>
              <button
                onClick={openCreateModal}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-600 text-white"
              >
                Create Event
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {events.map((evt) => (
                <div
                  key={evt._id}
                  className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-amber-500/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    <img
                      src={evt.imageUrl || PRESET_IMAGES[0].url}
                      alt={evt.title}
                      className="w-full md:w-36 h-24 rounded-xl object-cover"
                    />

                    <div className="space-y-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300">
                        {evt.category}
                      </span>
                      <h3 className="text-lg font-bold text-white">{evt.title}</h3>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-1">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          <span>{evt.date} at {evt.time}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-pink-400" />
                          <span>{evt.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex md:flex-col items-center md:items-end justify-between gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-slate-800">
                    <div className="text-right">
                      <p className="text-xs text-slate-400">
                        Revenue: <span className="text-emerald-400 font-bold">${evt.revenue}</span>
                      </p>
                      <p className="text-xs text-slate-400">
                        Tickets Sold: <span className="text-white font-bold">{evt.ticketsSold}</span> / {evt.totalTickets}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openAttendeeRoster(evt._id)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 transition-colors flex items-center space-x-1"
                        title="View Attendee List"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Attendees</span>
                      </button>

                      <button
                        onClick={() => openEditModal(evt)}
                        className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-amber-400 hover:bg-slate-700 transition-colors"
                        title="Edit Event"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(evt._id)}
                        className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal Form for Create / Edit Event */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-bold text-white">
                {editingEvent ? 'Edit Event Details' : 'Create New Event'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. HappyCore Neon Festival 2026"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Music">Music</option>
                    <option value="Tech">Tech</option>
                    <option value="Conference">Conference</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Festival">Festival</option>
                    <option value="Sports">Sports</option>
                    <option value="Arts">Arts</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Time *</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Location / Venue *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Grand Arena Hall 2, Main Street"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Image URL & Preset Selection */}
              <div className="space-y-2">
                <label className="block text-slate-300 font-semibold">Event Banner Image URL</label>
                <div className="flex gap-3">
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  />
                  {formData.imageUrl && (
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-12 h-10 rounded-lg object-cover border border-slate-800 flex-shrink-0"
                    />
                  )}
                </div>

                {/* Preset Chips */}
                <div className="flex items-center space-x-2 pt-1">
                  <span className="text-[11px] text-slate-500">Quick presets:</span>
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:border-amber-500"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ticket Types Manager */}
              <TicketTypeManager
                ticketTypes={formData.ticketTypes}
                setTicketTypes={(types) => setFormData({ ...formData, ticketTypes: types })}
              />

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description *</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide a compelling description of what attendees can expect..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl font-semibold text-slate-400 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-amber-600 hover:bg-amber-500 shadow-md shadow-amber-600/30 disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingEvent ? 'Save Changes' : 'Publish Event'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Attendee Roster Modal */}
      <AttendeeListModal
        eventId={selectedEventId}
        isOpen={attendeeModalOpen}
        onClose={() => {
          setAttendeeModalOpen(false);
          setSelectedEventId(null);
        }}
      />

    </div>
  );
};
