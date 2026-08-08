import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#090d16] border-t border-slate-800/80 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center shadow-md">
                <Ticket className="w-5 h-5 text-white transform -rotate-12" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Happy<span className="text-indigo-400">Core</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              The premier platform for discovering live experiences, music festivals, tech summits, and exclusive workshops.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/events" className="hover:text-indigo-400 transition-colors">Explore All Events</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-indigo-400 transition-colors">Host an Event</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-indigo-400 transition-colors">Attendee Portal</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/events?category=Music" className="hover:text-indigo-400 transition-colors">Music & Concerts</Link></li>
              <li><Link to="/events?category=Tech" className="hover:text-indigo-400 transition-colors">Tech & AI Summits</Link></li>
              <li><Link to="/events?category=Workshop" className="hover:text-indigo-400 transition-colors">Workshops & Masterclasses</Link></li>
              <li><Link to="/events?category=Arts" className="hover:text-indigo-400 transition-colors">Arts & NFT Culture</Link></li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Stay Connected</h4>
            <p className="text-sm text-slate-400 mb-3">Get notified about newly posted events and early bird tickets.</p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-colors">
                Join
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} HappyCore Ticketing System. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-4 sm:mt-0">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
            <span>for event enthusiasts worldwide</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
