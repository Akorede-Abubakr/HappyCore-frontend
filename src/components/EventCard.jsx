import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Tag, Users, ArrowRight } from 'lucide-react';

export const EventCard = ({ event }) => {
  const isSoldOut = event.availableTickets <= 0;

  return (
    <div className="group rounded-2xl bg-slate-900/70 border border-slate-800/80 overflow-hidden hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col h-full">
      {/* Image container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <img
          src={event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
        
        {/* Category Pill */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600/90 text-white backdrop-blur-md shadow-md">
          {event.category || 'Event'}
        </span>

        {/* Price Tag */}
        <span className="absolute bottom-3 right-3 px-3 py-1 rounded-xl text-xs font-bold bg-slate-900/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
          {event.price === 0 ? 'FREE' : `$${event.price}`}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
            {event.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-800/60 text-xs text-slate-300">
          <div className="flex items-center space-x-2">
            <Calendar className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
            <span>{event.date} at {event.time}</span>
          </div>

          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-1.5 text-slate-400">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span>{event.availableTickets} left</span>
            </div>

            {isSoldOut && (
              <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                Sold Out
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/events/${event._id}`}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
            isSoldOut
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30'
          }`}
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
