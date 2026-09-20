import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

export const EventCard = ({ event }) => {
  const isSoldOut = event.availableTickets <= 0;

  return (
    <div className="group rounded-3xl bg-white border border-slate-200/90 overflow-hidden hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      {/* Image container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <img
          src={event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
        
        {/* Category Pill */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white backdrop-blur-md shadow-md">
          {event.category || 'Live Event'}
        </span>

        {/* Price Tag */}
        <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-black bg-white text-slate-950 shadow-md">
          {event.price === 0 ? 'FREE' : `$${event.price}`}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {event.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <Calendar className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span>{event.date} at {event.time}</span>
          </div>

          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-1.5 text-slate-500">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-semibold">{event.availableTickets} tickets remaining</span>
            </div>

            {isSoldOut && (
              <span className="text-[10px] uppercase font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                Sold Out
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/events/${event._id}`}
          className={`w-full py-2.5 px-4 rounded-full text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
            isSoldOut
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200 hover:border-blue-600 shadow-sm'
          }`}
        >
          <span>Get Tickets</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
