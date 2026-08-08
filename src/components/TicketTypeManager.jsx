import React from 'react';
import { Plus, Trash2, Tag } from 'lucide-react';

export const TicketTypeManager = ({ ticketTypes, setTicketTypes }) => {
  const handleAddType = () => {
    setTicketTypes([
      ...ticketTypes,
      { name: 'VIP Pass', price: 100, capacity: 25, available: 25 }
    ]);
  };

  const handleRemoveType = (index) => {
    if (ticketTypes.length <= 1) {
      alert('Event must have at least one ticket tier.');
      return;
    }
    setTicketTypes(ticketTypes.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...ticketTypes];
    updated[index][field] = field === 'name' ? value : Number(value) || 0;
    if (field === 'capacity') {
      updated[index].available = Number(value) || 0;
    }
    setTicketTypes(updated);
  };

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
          <Tag className="w-3.5 h-3.5 text-amber-400" />
          <span>Ticket Tiers & Pricing</span>
        </label>
        <button
          type="button"
          onClick={handleAddType}
          className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors flex items-center space-x-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Tier</span>
        </button>
      </div>

      <div className="space-y-2">
        {ticketTypes.map((type, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-2 items-center text-xs"
          >
            <div className="sm:col-span-1">
              <input
                type="text"
                required
                placeholder="Tier Name (e.g. VIP)"
                value={type.name}
                onChange={(e) => handleChange(idx, 'name', e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <input
                type="number"
                min="0"
                required
                placeholder="Price ($)"
                value={type.price}
                onChange={(e) => handleChange(idx, 'price', e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <input
                type="number"
                min="1"
                required
                placeholder="Capacity"
                value={type.capacity}
                onChange={(e) => handleChange(idx, 'capacity', e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => handleRemoveType(idx)}
                className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                title="Remove Tier"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
