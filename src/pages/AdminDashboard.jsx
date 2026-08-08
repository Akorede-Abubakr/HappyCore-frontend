import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  ShieldAlert,
  Users,
  Building2,
  Calendar,
  DollarSign,
  Ticket,
  CheckCircle,
  XCircle,
  Trash2,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  RefreshCw,
  Clock,
  ShieldCheck
} from 'lucide-react';

export const AdminDashboard = () => {
  const { user } = useAuth();

  const [analytics, setAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);

  // Active Tab: 'overview' | 'users' | 'events' | 'transactions'
  const [activeTab, setActiveTab] = useState('overview');

  // Users State
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('All');
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Events State
  const [events, setEvents] = useState([]);
  const [eventSearch, setEventSearch] = useState('');
  const [eventStatusFilter, setEventStatusFilter] = useState('All');
  const [loadingEvents, setLoadingEvents] = useState(false);

  // Transactions State
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  useEffect(() => {
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'events') fetchEvents();
    if (activeTab === 'transactions') fetchTransactions();
  }, [activeTab, userSearch, userRoleFilter, eventSearch, eventStatusFilter]);

  const fetchAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const res = await API.get('/admin/analytics');
      setAnalytics(res.data);
    } catch (err) {
      console.error('Error fetching admin analytics:', err);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      let url = '/admin/users';
      const params = new URLSearchParams();
      if (userSearch) params.append('search', userSearch);
      if (userRoleFilter && userRoleFilter !== 'All') params.append('role', userRoleFilter);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await API.get(url);
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchEvents = async () => {
    setLoadingEvents(true);
    try {
      let url = '/admin/events';
      const params = new URLSearchParams();
      if (eventSearch) params.append('search', eventSearch);
      if (eventStatusFilter === 'pending') params.append('status', 'pending');
      if (eventStatusFilter === 'approved') params.append('status', 'approved');
      if (params.toString()) url += `?${params.toString()}`;

      const res = await API.get(url);
      setEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoadingEvents(false);
    }
  };

  const fetchTransactions = async () => {
    setLoadingTransactions(true);
    try {
      const res = await API.get('/admin/transactions');
      setTransactions(res.data);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    } finally {
      setLoadingTransactions(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await API.put(`/admin/users/${userId}/role`, { role: newRole });
      fetchUsers();
      fetchAnalytics();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? All associated activity will be removed.')) {
      try {
        await API.delete(`/admin/users/${userId}`);
        fetchUsers();
        fetchAnalytics();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const handleToggleApproval = async (eventId) => {
    try {
      await API.put(`/admin/events/${eventId}/approve`);
      fetchEvents();
      fetchAnalytics();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to toggle event approval');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to remove this event from the platform?')) {
      try {
        await API.delete(`/admin/events/${eventId}`);
        fetchEvents();
        fetchAnalytics();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete event');
      }
    }
  };

  const summary = analytics?.summary || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* SaaS Admin Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/30 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-600/30 border border-rose-500/40 text-rose-400 font-extrabold text-2xl flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold text-white">{user?.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Platform Admin
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={() => {
            fetchAnalytics();
            if (activeTab === 'users') fetchUsers();
            if (activeTab === 'events') fetchEvents();
            if (activeTab === 'transactions') fetchTransactions();
          }}
          className="px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors flex items-center space-x-2 border border-slate-700"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Stats Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Platform Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-white">
            ${summary.totalRevenue || 0}
          </p>
          <p className="text-[11px] text-emerald-400 flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{summary.totalOrders || 0} Total Orders Processed</span>
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Registered Users</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-indigo-400">
            {summary.totalUsers || 0}
          </p>
          <p className="text-[11px] text-slate-400">
            {summary.totalOrganizers || 0} Event Hosts • {summary.totalAdmins || 1} Admins
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Platform Events</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-amber-400">
            {summary.totalEvents || 0}
          </p>
          <p className="text-[11px] text-slate-400">Published across all categories</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending Approvals</span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-rose-400">
            {summary.pendingEventsCount || 0}
          </p>
          <p className="text-[11px] text-slate-400">Events requiring moderation</p>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Platform Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
            activeTab === 'users'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User & Host Directory</span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
            activeTab === 'events'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Approve & Moderating Events</span>
        </button>

        <button
          onClick={() => setActiveTab('transactions')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
            activeTab === 'transactions'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Transactions Audit</span>
        </button>
      </div>

      {/* Tab 1: Overview & Recent Transactions */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>Recent System Transactions</span>
            </h3>

            {loadingAnalytics ? (
              <div className="py-12 text-center text-xs text-slate-400">Loading overview...</div>
            ) : analytics?.recentTransactions?.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">No transactions recorded yet.</div>
            ) : (
              <div className="overflow-x-auto border border-slate-800/80 rounded-2xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                      <th className="p-3.5 font-semibold">Order #</th>
                      <th className="p-3.5 font-semibold">Purchaser</th>
                      <th className="p-3.5 font-semibold">Event</th>
                      <th className="p-3.5 font-semibold">Quantity</th>
                      <th className="p-3.5 font-semibold">Total Amount</th>
                      <th className="p-3.5 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {analytics.recentTransactions.map((tx) => (
                      <tr key={tx._id} className="hover:bg-slate-850/50">
                        <td className="p-3.5 font-mono font-bold text-indigo-400">{tx.orderNumber}</td>
                        <td className="p-3.5">
                          <p className="font-bold text-white">{tx.user?.name || 'Attendee'}</p>
                          <p className="text-[11px] text-slate-400">{tx.user?.email}</p>
                        </td>
                        <td className="p-3.5 text-slate-300 font-medium">{tx.event?.title || 'Event'}</td>
                        <td className="p-3.5 font-bold text-white">{tx.ticketsCount}</td>
                        <td className="p-3.5 font-extrabold text-emerald-400">${tx.totalAmount}</td>
                        <td className="p-3.5 text-slate-400">{new Date(tx.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: User Directory & Role Management */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search user by name or email..."
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400 font-semibold">Filter Role:</span>
              <select
                value={userRoleFilter}
                onChange={(e) => setUserRoleFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="All">All Roles</option>
                <option value="user">Attendees (user)</option>
                <option value="organizer">Event Hosts (organizer)</option>
                <option value="admin">Platform Admins (admin)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-800/80 rounded-2xl bg-slate-900/80">
            {loadingUsers ? (
              <div className="p-12 text-center text-xs text-slate-400">Loading user directory...</div>
            ) : users.length === 0 ? (
              <div className="p-12 text-center text-xs text-slate-400">No users found matching filter.</div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="p-3.5 font-semibold">User Details</th>
                    <th className="p-3.5 font-semibold">Current Role</th>
                    <th className="p-3.5 font-semibold">Update Role</th>
                    <th className="p-3.5 font-semibold">Joined Date</th>
                    <th className="p-3.5 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-850/50">
                      <td className="p-3.5">
                        <p className="font-bold text-white">{u.name}</p>
                        <p className="text-[11px] text-slate-400">{u.email}</p>
                      </td>

                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                          u.role === 'admin'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : u.role === 'organizer'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-indigo-500/20 text-indigo-300'
                        }`}>
                          {u.role}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u._id, e.target.value)}
                          className="px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-rose-500"
                        >
                          <option value="user">User (Attendee)</option>
                          <option value="organizer">Organizer (Host)</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>

                      <td className="p-3.5 text-slate-400">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>

                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          disabled={u._id === user?._id}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 disabled:opacity-40 transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Approve & Moderating Events */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
                placeholder="Search event title or location..."
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400 font-semibold">Approval Status:</span>
              <select
                value={eventStatusFilter}
                onChange={(e) => setEventStatusFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="All">All Events</option>
                <option value="approved">Approved Only</option>
                <option value="pending">Pending Only</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {loadingEvents ? (
              <div className="p-12 text-center text-xs text-slate-400">Loading events catalog...</div>
            ) : events.length === 0 ? (
              <div className="p-12 text-center text-xs text-slate-400">No events found matching moderation filter.</div>
            ) : (
              events.map((evt) => (
                <div
                  key={evt._id}
                  className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-rose-500/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    <img
                      src={evt.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80'}
                      alt={evt.title}
                      className="w-full md:w-32 h-24 rounded-xl object-cover"
                    />

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                          {evt.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center space-x-1 ${
                          evt.isApproved ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {evt.isApproved ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          <span>{evt.isApproved ? 'APPROVED' : 'PENDING'}</span>
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white">{evt.title}</h3>
                      <p className="text-xs text-slate-400">
                        Organizer: <span className="text-slate-200 font-semibold">{evt.organizer?.name || 'Host'}</span> ({evt.organizer?.email})
                      </p>
                      <p className="text-xs text-slate-500">
                        Date: {evt.date} • Price: ${evt.price} • Tickets: {evt.availableTickets} / {evt.totalTickets}
                      </p>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex items-center space-x-3 border-t md:border-t-0 pt-4 md:pt-0 border-slate-800 justify-end">
                    <button
                      onClick={() => handleToggleApproval(evt._id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                        evt.isApproved
                          ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30'
                          : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md'
                      }`}
                    >
                      {evt.isApproved ? (
                        <>
                          <XCircle className="w-4 h-4" />
                          <span>Unapprove Event</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Approve Event</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDeleteEvent(evt._id)}
                      className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-colors"
                      title="Remove Event from Platform"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Transactions Audit Log */}
      {activeTab === 'transactions' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <span>Full System Transactions Log</span>
            </h3>

            {loadingTransactions ? (
              <div className="py-12 text-center text-xs text-slate-400">Loading system transactions...</div>
            ) : transactions.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">No transactions recorded yet.</div>
            ) : (
              <div className="overflow-x-auto border border-slate-800/80 rounded-2xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                      <th className="p-3.5 font-semibold">Order #</th>
                      <th className="p-3.5 font-semibold">Buyer Name & Email</th>
                      <th className="p-3.5 font-semibold">Event Title</th>
                      <th className="p-3.5 font-semibold">Qty</th>
                      <th className="p-3.5 font-semibold">Amount</th>
                      <th className="p-3.5 font-semibold">Payment Method</th>
                      <th className="p-3.5 font-semibold">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {transactions.map((tx) => (
                      <tr key={tx._id} className="hover:bg-slate-850/50">
                        <td className="p-3.5 font-mono font-bold text-indigo-400">{tx.orderNumber}</td>
                        <td className="p-3.5">
                          <p className="font-bold text-white">{tx.user?.name || 'Attendee'}</p>
                          <p className="text-[11px] text-slate-400">{tx.user?.email}</p>
                        </td>
                        <td className="p-3.5 font-medium text-slate-200">{tx.event?.title || 'Event'}</td>
                        <td className="p-3.5 font-bold text-white">{tx.ticketsCount}</td>
                        <td className="p-3.5 font-extrabold text-emerald-400">${tx.totalAmount}</td>
                        <td className="p-3.5 text-slate-400">{tx.paymentMethod}</td>
                        <td className="p-3.5 text-slate-400">{new Date(tx.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
