import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Ticket, ShoppingBag, ShieldCheck, Plus, Minus, AlertCircle } from 'lucide-react';

export const TicketSelection = ({ event }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isOrganizer } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');

  const isSoldOut = event.availableTickets <= 0;
  const totalPrice = event.price * quantity;

  const handleProceedToCheckout = () => {
    setErrorMsg('');
    if (!isAuthenticated) {
      navigate(`/login?redirect=/checkout/${event._id}`);
      return;
    }

    if (isOrganizer) {
      setErrorMsg('Event Organizer accounts cannot purchase tickets. Please log in as an Attendee.');
      return;
    }

    navigate(`/checkout/${event._id}?qty=${quantity}`);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Ticket Type</p>
          <h4 className="text-lg font-bold text-white">General Admission Pass</h4>
        </div>
        <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
          isSoldOut ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
        }`}>
          {isSoldOut ? 'Sold Out' : `${event.availableTickets} Available`}
        </span>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Pricing & Quantity */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">Price per ticket:</span>
          <span className="text-lg font-extrabold text-white">
            {event.price === 0 ? 'FREE' : `$${event.price}`}
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Select Quantity
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={isSoldOut || quantity <= 1}
              className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-lg hover:bg-slate-800 disabled:opacity-40 transition-colors flex items-center justify-center"
            >
              <Minus className="w-4 h-4" />
            </button>
            
            <span className="flex-1 text-center font-bold text-xl text-white bg-slate-950 py-2.5 rounded-xl border border-slate-800">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity(Math.min(event.availableTickets, quantity + 1))}
              disabled={isSoldOut || quantity >= event.availableTickets}
              className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-lg hover:bg-slate-800 disabled:opacity-40 transition-colors flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Subtotal Summary */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span>Subtotal ({quantity} x {event.price === 0 ? 'Free' : `$${event.price}`}):</span>
            <span>${totalPrice}</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Service & Booking Fee:</span>
            <span className="text-emerald-400 font-semibold">$0.00 (Waived)</span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-sm font-extrabold text-white">
            <span>Total Payable:</span>
            <span className="text-indigo-400 text-base">${totalPrice}</span>
          </div>
        </div>

        {/* Checkout CTA */}
        <button
          onClick={handleProceedToCheckout}
          disabled={isSoldOut}
          className="w-full py-3.5 px-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{isSoldOut ? 'Sold Out' : 'Proceed to Checkout'}</span>
        </button>

        <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-400 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Instant HappyCore Ticket Generation</span>
        </div>

      </div>

    </div>
  );
};
