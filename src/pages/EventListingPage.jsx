import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../services/api';
import { EventCard } from '../components/EventCard';
import { EventFilter } from '../components/EventFilter';
import { Compass, CalendarX } from 'lucide-react';

export const EventListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, [searchTerm, selectedCategory]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      let url = '/events';
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory && selectedCategory !== 'All') params.append('category', selectedCategory);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await API.get(url);
      setEvents(res.data);
    } catch (err) {
      console.error('Failed to load events', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Live Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Explore Upcoming Events</h1>
        <p className="text-slate-400 text-sm max-w-xl">
          Browse through live concerts, tech masterclasses, sports events, and creative workshops.
        </p>
      </div>

      {/* Filter Component */}
      <EventFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={(cat) => {
          setSelectedCategory(cat);
          setSearchParams(cat === 'All' ? {} : { category: cat });
        }}
      />

      {/* Events Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-96 rounded-2xl bg-slate-900 animate-pulse" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500">
            <CalendarX className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-white">No Events Found</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            We couldn't find any events matching your search terms or category selection.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSearchParams({});
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}

    </div>
  );
};
