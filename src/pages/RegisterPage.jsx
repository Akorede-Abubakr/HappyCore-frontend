import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Ticket, User, Mail, Lock, UserPlus, AlertCircle, Building2 } from 'lucide-react';

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: searchParams.get('role') === 'organizer' ? 'organizer' : 'user'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'organizer') {
      setFormData((prev) => ({ ...prev, role: 'organizer' }));
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await register(formData.name, formData.email, formData.password, formData.role);
      if (user.role === 'organizer') {
        navigate('/organizer-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please check your info.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-slate-50/50">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 items-center justify-center mb-2 shadow-sm">
            <Ticket className="w-6 h-6 transform -rotate-12" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Create Account</h2>
          <p className="text-xs text-slate-500">Join TicketsCandy today</p>
        </div>

        {/* Account Type Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'user' })}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
              formData.role === 'user'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Event Attendee</span>
          </button>

          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'organizer' })}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
              formData.role === 'organizer'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Event Host</span>
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Alex Morgan"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Password (Min 6 chars)
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl text-sm font-bold text-white shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 transform hover:-translate-y-0.5 active:translate-y-0 ${
              formData.role === 'organizer'
                ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/25'
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25'
            }`}
          >
            {loading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Register as {formData.role === 'organizer' ? 'Organizer' : 'Attendee'}</span>
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 pt-2">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-blue-600 hover:underline">
            Sign in here
          </Link>
        </p>

      </div>
    </div>
  );
};
