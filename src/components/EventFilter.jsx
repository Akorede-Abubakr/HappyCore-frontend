import React from 'react';
import { Search, Filter } from 'lucide-react';

const categories = ['All', 'Music', 'Tech', 'Conference', 'Workshop', 'Festival', 'Sports', 'Arts'];

export const EventFilter = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 mb-10 space-y-4 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by event title, location..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-sm"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block mr-1 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:text-blue-600 hover:bg-slate-50 border border-slate-200 shadow-sm'
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
