import React from 'react';
import { Search, Filter } from 'lucide-react';

const categories = ['All', 'Music', 'Tech', 'Conference', 'Workshop', 'Festival', 'Sports', 'Arts'];

export const EventFilter = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 sm:p-6 mb-10 space-y-4 shadow-xl">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by event title, location..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block mr-1 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
