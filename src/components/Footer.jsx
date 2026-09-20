import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, ArrowRight, MessageCircle, Send, CheckCircle2, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0f131d] text-white pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Dark CTA Box */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#182030] to-[#121722] border border-slate-700/60 p-10 sm:p-14 text-center mb-20 shadow-2xl overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Create Your First Event
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-normal">
              Start today and bring your first event to life with zero setup fees.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/register?role=organizer"
                className="px-8 py-3.5 rounded-full text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 transition-all shadow-lg hover:shadow-white/20 transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
              <button
                onClick={() => alert('Support chat is available 24/7. Contact us at support@happycore.com')}
                className="px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-all flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4 text-blue-400" />
                <span>Chat With Us</span>
              </button>
            </div>
          </div>
        </div>

        {/* Multi-Column Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-slate-800/80">
          
          {/* Newsletter Column (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Stay Connected
            </span>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Sign up for our latest news, software updates and helpful resources to promote your ticket sales online.
            </p>

            <form onSubmit={handleSubscribe} className="relative max-w-sm pt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address..."
                required
                className="w-full pl-4 pr-12 py-3 bg-[#171d2b] border border-slate-700/80 rounded-full text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-3.5 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-colors shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Thank you for subscribing!</span>
              </p>
            )}
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Links Columns (7 cols total) */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6">
            
            {/* PRODUCT */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                Product
              </h4>
              <ul className="space-y-3 text-xs text-slate-400 font-medium">
                <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                <li><a href="#how-it-works" className="hover:text-blue-400 transition-colors">How It Works</a></li>
                <li><a href="#benefits" className="hover:text-blue-400 transition-colors">Benefits</a></li>
                <li><a href="#fees" className="hover:text-blue-400 transition-colors">Fees Explained</a></li>
                <li><Link to="/events" className="hover:text-blue-400 transition-colors">Browse Events</Link></li>
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                Legal
              </h4>
              <ul className="space-y-3 text-xs text-slate-400 font-medium">
                <li><a href="#legal" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#legal" className="hover:text-blue-400 transition-colors">Terms & Conditions</a></li>
                <li><a href="#legal" className="hover:text-blue-400 transition-colors">Services Agreement</a></li>
                <li><a href="#legal" className="hover:text-blue-400 transition-colors">Merchant Guidelines</a></li>
              </ul>
            </div>

            {/* COMMUNITY */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                Community
              </h4>
              <ul className="space-y-3 text-xs text-slate-400 font-medium">
                <li><a href="#blog" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#faq" className="hover:text-blue-400 transition-colors">Knowledgebase</a></li>
                <li><a href="#support" className="hover:text-blue-400 transition-colors">Support 24/7</a></li>
                <li><Link to="/register?role=organizer" className="hover:text-blue-400 transition-colors">Partner Program</Link></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
              <Ticket className="w-3.5 h-3.5 text-white transform -rotate-12" />
            </div>
            <span className="font-bold text-white tracking-tight">TicketsCandy</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">HappyCore Foundation</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400">
            <a href="#instagram" className="hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#facebook" className="hover:text-white transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#twitter" className="hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#linkedin" className="hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
          </div>

          <p>© {new Date().getFullYear()} TicketsCandy / HappyCore. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};
