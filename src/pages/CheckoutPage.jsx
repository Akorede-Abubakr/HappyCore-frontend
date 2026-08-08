import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Ticket, Calendar, MapPin, CheckCircle2, ShieldCheck, CreditCard, ArrowLeft, AlertCircle, Lock } from 'lucide-react';

export const CheckoutPage = () => {
  const { eventId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const quantity = Number(searchParams.get('qty')) || 1;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('HappyCore Express Checkout');
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [completedOrder, setCompletedOrder] = useState(null);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/events/${eventId}`);
      setEvent(res.data);
    } catch (err) {
      console.error('Error loading event for checkout:', err);
      setErrorMsg('Failed to load event details.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompletePurchase = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrorMsg('');

    try {
      const res = await API.post('/orders/checkout', {
        eventId,
        ticketsCount: quantity,
        paymentMethod
      });
      setCompletedOrder(res.data);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Transaction failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
        <div className="h-48 rounded-3xl bg-slate-900 animate-pulse" />
        <div className="h-64 rounded-3xl bg-slate-900 animate-pulse" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-4">Event Not Found</h2>
        <Link to="/events" className="text-indigo-400 hover:underline">
          Back to Events
        </Link>
      </div>
    );
  }

  const totalAmount = event.price * quantity;

  // Order Success Screen
  if (completedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
        <div className="p-8 rounded-3xl bg-slate-900 border border-emerald-500/30 shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300">
              Order Confirmed
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2">Thank You for Your Order!</h2>
            <p className="text-xs text-slate-400 mt-1">
              Order Number: <span className="text-indigo-400 font-mono font-bold">{completedOrder.orderNumber}</span>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3 text-xs text-slate-300">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-400">Event:</span>
              <span className="text-white">{event.title}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-slate-400">Tickets Issued:</span>
              <span className="text-indigo-400 font-bold">{completedOrder.ticketsCount} Ticket(s)</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-slate-400">Total Paid:</span>
              <span className="text-emerald-400 font-bold">${completedOrder.totalAmount}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/my-tickets"
              className="w-full py-3 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center justify-center space-x-2"
            >
              <Ticket className="w-4 h-4" />
              <span>View My Digital Tickets</span>
            </Link>

            <Link
              to="/events"
              className="w-full py-3 rounded-xl font-bold text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Event Details</span>
      </button>

      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
          <Lock className="w-3.5 h-3.5" />
          <span>Secure Checkout</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Review & Complete Order</h1>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Form Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Attendee Details Card */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Attendee Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  disabled
                  value={user?.name || ''}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 cursor-not-allowed"
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              * Digital ticket codes will be issued directly to this HappyCore account.
            </p>
          </div>

          {/* Payment Method Card */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Payment Option</span>
            </h3>

            <div className="space-y-3">
              <label
                onClick={() => setPaymentMethod('HappyCore Express Checkout')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'HappyCore Express Checkout'
                    ? 'bg-indigo-600/10 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="w-5 h-5 text-indigo-400" />
                  <div>
                    <p className="text-xs font-bold text-white">HappyCore Express Pay</p>
                    <p className="text-[10px] text-slate-400">Instant test checkout with zero delay</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'HappyCore Express Checkout'}
                  onChange={() => {}}
                  className="text-indigo-600"
                />
              </label>

              <label
                onClick={() => setPaymentMethod('Credit / Debit Card')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'Credit / Debit Card'
                    ? 'bg-indigo-600/10 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-pink-400" />
                  <div>
                    <p className="text-xs font-bold text-white">Credit / Debit Card (Simulated)</p>
                    <p className="text-[10px] text-slate-400">Visa, Mastercard, Amex</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'Credit / Debit Card'}
                  onChange={() => {}}
                  className="text-indigo-600"
                />
              </label>
            </div>
          </div>

        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
            
            <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
              Order Summary
            </h3>

            {/* Event Item */}
            <div className="space-y-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                {event.category}
              </span>
              <h4 className="text-sm font-bold text-white leading-snug">{event.title}</h4>
              
              <div className="space-y-1.5 text-xs text-slate-400 pt-1">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{event.date} at {event.time}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>
            </div>

            {/* Pricing breakdown */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Quantity:</span>
                <span className="font-bold text-white">{quantity} Pass(es)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Ticket Price:</span>
                <span>{event.price === 0 ? 'Free' : `$${event.price}`}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Booking Fee:</span>
                <span className="text-emerald-400">$0.00</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between font-extrabold text-sm text-white">
                <span>Total Amount:</span>
                <span className="text-indigo-400">${totalAmount}</span>
              </div>
            </div>

            <button
              onClick={handleCompletePurchase}
              disabled={processing}
              className="w-full py-4 px-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Ticket className="w-4 h-4" />
              <span>{processing ? 'Generating Tickets...' : 'Complete Purchase'}</span>
            </button>

          </div>
        </div>

      </div>

    </div>
  );
};
