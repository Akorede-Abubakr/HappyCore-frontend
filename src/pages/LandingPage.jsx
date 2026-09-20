import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { EventCard } from '../components/EventCard';
import {
  Ticket,
  Sparkles,
  TrendingUp,
  Globe,
  Zap,
  CheckCircle2,
  Calendar,
  Clock,
  QrCode,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Users,
  BarChart3,
  DollarSign,
  ArrowRight,
  ChevronRight,
  Award,
  Layers,
  MousePointerClick,
  Share2,
  RefreshCw,
  Sliders,
  Check,
  Building,
  HeartHandshake
} from 'lucide-react';

export const LandingPage = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  // Interactive Fee Calculator State
  const [ticketPrice, setTicketPrice] = useState(25);
  const [ticketQty, setTicketQty] = useState(2);

  // Fetch live events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get('/events');
        setFeaturedEvents(res.data.slice(0, 3));
      } catch (err) {
        console.error('Error fetching featured events:', err);
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchEvents();
  }, []);

  // Calculator computations
  const subtotal = ticketPrice * ticketQty;
  const happyCoreFee = Math.max(0.5, (subtotal * 0.035) + 0.35);
  const eventbriteFee = Math.max(1.79, (subtotal * 0.085) + (1.79 * ticketQty));
  const ticketmasterFee = Math.max(3.5, (subtotal * 0.15) + (3.5 * ticketQty));
  const showclixFee = Math.max(2.5, (subtotal * 0.10) + (2.5 * ticketQty));
  const fareHarborFee = Math.max(1.5, (subtotal * 0.06) + (1.5 * ticketQty));

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* ============================================================ */}
      {/* 1. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section className="pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.1]">
          Manage Your Event With Ease
        </h1>

        {/* Primary Pill CTA */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/register?role=organizer"
            className="px-8 py-4 rounded-full text-base sm:text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center space-x-2"
          >
            <span>Start Selling Tickets</span>
          </Link>
        </div>

        {/* 4 Feature Badges Row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-600">
          <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>50% MORE REVENUE</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>EVENT PROMOTION</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>SELL ANYWHERE ONLINE</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200">
            <Zap className="w-4 h-4 text-blue-600" />
            <span>INSTANT PAYOUTS</span>
          </div>
        </div>

       

      </section>

      {/* ============================================================ */}
      {/* 2. FEATURE SPOTLIGHT 1: Free, Easy & Secure Event Management */}
      {/* ============================================================ */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Free, Easy & Secure <br />
              Event Management
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Host an incredible event with our easy-to-use sites, reliable technology, and stellar support team. Whether you need to sell tickets for a recurring, one-time, or timed-entry event, you can easily manage your attendees, appointments, and receive reliable reports for all ticket sales.
            </p>

            {/* 2x2 Feature Checkmarks */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center space-x-3 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>Single day events</span>
              </div>
              <div className="flex items-center space-x-3 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>Multiple day events</span>
              </div>
              <div className="flex items-center space-x-3 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>Recurring events</span>
              </div>
              <div className="flex items-center space-x-3 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>Timed entry</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/register?role=organizer"
                className="px-7 py-3.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 inline-block"
              >
                Create Your Event
              </Link>
            </div>
          </div>

          {/* Right Visual Photo Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
              <img
                src="/assets/ticket_scan.jpg"
                alt="Ticket scanning at venue"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Instant Check-in Scan</p>
                    <p className="text-[11px] text-slate-500">0.2s ultra-fast QR validation</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700">
                  Verified
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. FEATURE SPOTLIGHT 2: No Contracts & No Commitments         */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Visual Card */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
              <img
                src="/assets/organizers.jpg"
                alt="Organizers collaborating"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Floating Menu Mockup Overlay */}
              <div className="absolute top-6 left-6 p-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-slate-100 space-y-1.5 text-xs font-semibold text-slate-700 w-44">
                <p className="text-[10px] uppercase font-bold text-slate-400 pb-1 border-b border-slate-100">
                  Manage Attendees
                </p>
                <div className="flex items-center space-x-2 text-slate-800 hover:text-blue-600 cursor-pointer">
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                  <span>Check In</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-800 hover:text-blue-600 cursor-pointer">
                  <Sliders className="w-3.5 h-3.5 text-slate-400" />
                  <span>Edit Booking</span>
                </div>
                <div className="flex items-center space-x-2 text-rose-600 cursor-pointer">
                  <span>Cancel Booking</span>
                </div>
              </div>

              {/* Floating Success Toast */}
              <div className="absolute bottom-6 right-6 p-3.5 rounded-2xl bg-emerald-600 text-white shadow-xl flex items-center space-x-2 text-xs font-bold animate-bounce">
                <CheckCircle2 className="w-4 h-4" />
                <span>Event Successfully Created!</span>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              No Contracts & <br />
              No Commitments
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              With us, you always have complete freedom over your event. All the incredible tools our ticketing solutions have to offer are available to you from the start with no contracts or hidden fees to worry about.
            </p>

            {/* Checklist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>No credit card required to get started</span>
              </div>
              <div className="flex items-center space-x-3 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span>Unlimited features across all event tiers</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/register?role=organizer"
                className="px-7 py-3.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 inline-block"
              >
                Sign Up Today
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. 8-CARD SALES-ORIENTED FEATURE GRID                         */}
      {/* ============================================================ */}
      <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            30% More Orders With Our Sales-Oriented Features
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Our ticketing technology is developed with event success in mind. All our tools and features are tailored for a better user experience to encourage more sales.
          </p>
        </div>

        {/* 8-Card Grid (4 cols x 2 rows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-3 group">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Reduced Ticket Price</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No extra fees are added at checkout, making your tickets more affordable for buyers.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-3 group">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">2 Step Checkout</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We use a two-step checkout process tailored towards an effortless and frictionless purchase flow.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-3 group">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MousePointerClick className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">User-Friendly Widget</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our ticketing widget is specifically designed to be responsive, user-friendly, and intuitive.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-3 group">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Sell Anywhere Online</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Sell tickets directly from your existing website or create a dedicated branded page for your event.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-3 group">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Event Promotion</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We promote your event through our dedicated media channels to help you gain reach and sell out.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-3 group">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Customer Retention</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Convenient ticket purchasing and handling options to make your customers return for future events.
            </p>
          </div>

          {/* Card 7 */}
          <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-3 group">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Mobile Wallets</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Customers can purchase their tickets faster with Apple Pay, Google Pay, and one-tap checkout.
            </p>
          </div>

          {/* Card 8 */}
          <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-3 group">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Auto Widget Syncing</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              All updates you make to ticket tiers, prices, and quantities automatically sync to your widget.
            </p>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. 25% OFF CUSTOM WEBSITE PARTNERSHIP BANNER                 */}
      {/* ============================================================ */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-purple-50 via-indigo-50/70 to-pink-50 border border-purple-200/80 p-8 sm:p-14 relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5">
              <span className="px-3.5 py-1.5 rounded-full bg-purple-600 text-white text-xs font-extrabold uppercase tracking-wide inline-block">
                Exclusive Partnership
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                25% Off A Custom Website
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                In order for you to have the best tools to showcase your event, we have partnered with Atavion to build the perfect website for your business. Through this partnership, you will receive 25% off all plans to build a custom website with your own domain name, unique design, and integrated ticketing system.
              </p>
              <div>
                <Link
                  to="/register?role=organizer"
                  className="px-8 py-3.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 inline-block"
                >
                  Sign Up For Free
                </Link>
              </div>
            </div>

            {/* Right Mockup Display */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative w-full max-w-md h-72 flex items-center justify-center">
                {/* Mockup card 1 */}
                <div className="absolute w-44 h-60 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-2xl p-4 text-white transform -rotate-12 hover:rotate-0 transition-transform duration-300 border-2 border-white">
                  <div className="w-8 h-8 rounded-full bg-white/20 mb-3 flex items-center justify-center font-bold text-xs">✨</div>
                  <p className="text-xs font-black uppercase">Summer Fest</p>
                  <p className="text-[10px] text-pink-100 mt-1">Live DJ & Food Arena</p>
                  <div className="mt-14 p-2 rounded-lg bg-black/40 text-[10px] font-bold text-center">
                    Get Tickets
                  </div>
                </div>

                {/* Mockup card 2 */}
                <div className="absolute w-48 h-64 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-800 shadow-2xl p-4 text-white z-10 transform rotate-6 hover:rotate-0 transition-transform duration-300 border-2 border-white">
                  <div className="w-8 h-8 rounded-full bg-white/20 mb-3 flex items-center justify-center font-bold text-xs">🎟️</div>
                  <p className="text-xs font-black uppercase">Museum of Dream</p>
                  <p className="text-[10px] text-indigo-200 mt-1">Art & Light Exhibition</p>
                  <div className="mt-16 p-2 rounded-lg bg-white text-indigo-900 text-[10px] font-black text-center">
                    Explore Gallery
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. ALREADY SELLING TICKETS SECTION                           */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Already Selling <br />
              Tickets?
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              If you are already selling tickets online, you can still create an event page at TicketsCandy as an additional source of ticket sales. We will happily promote your event through our marketing channels to help you gain more exposure and customers.
            </p>
            <div className="pt-2">
              <Link
                to="/register?role=organizer"
                className="px-7 py-3.5 rounded-full text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all inline-block"
              >
                Create Your Event Page Today
              </Link>
            </div>
          </div>

          {/* Right Preview Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-xl text-slate-900 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700">Multi-Channel Sync</span>
                <span className="text-xs text-blue-600 font-semibold">Active & Connected</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                      TC
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">TicketsCandy Storefront</p>
                      <p className="text-[10px] text-slate-500">Sync status: Real-time</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">+340 sales</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full w-4/5" />
                </div>
              </div>
              <div className="text-[11px] text-slate-500 flex items-center justify-between">
                <span>Direct Payouts to Bank</span>
                <span className="text-slate-900 font-semibold">0% Extra Lock-in</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. SECTION HEADER: Packed With Tools And Functionality       */}
      {/* ============================================================ */}
      <section className="pt-16 pb-6 text-center px-4 max-w-4xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Packed With Tools And Functionality
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Here are just some of the features we have to sell tickets online successfully
        </p>
      </section>

      {/* ============================================================ */}
      {/* 8. MARKETING TOOLS FEATURE (Section 4 badge in reference)    */}
      {/* ============================================================ */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-[#fbf9f2] border border-amber-200/70 p-8 sm:p-14 relative overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="w-8 h-8 rounded-lg bg-amber-200/80 text-amber-900 font-black text-sm flex items-center justify-center">
                4
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Promote Your Event <br />
                With Marketing Tools
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Utilize tools from Google, Facebook, TikTok, and other platforms to track your marketing efforts. Plus, we will promote your event through our social media, advertising, and other channels to maximize your exposure.
              </p>

              {/* 4 Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-bold text-slate-700">
                <div className="flex items-center space-x-2 bg-white/80 p-2.5 rounded-xl border border-amber-200/60">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Social networks</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 p-2.5 rounded-xl border border-amber-200/60">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Paid Advertising</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 p-2.5 rounded-xl border border-amber-200/60">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Newsletters</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 p-2.5 rounded-xl border border-amber-200/60">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Partner websites</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/register?role=organizer"
                  className="px-7 py-3 rounded-full text-xs font-bold text-slate-800 bg-white hover:bg-amber-50 border border-slate-300 transition-all inline-block shadow-sm"
                >
                  Promote Your Event
                </Link>
              </div>
            </div>

            {/* Right Chart Card */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-3xl bg-white border border-amber-200/80 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">USERS</span>
                    <p className="text-2xl font-black text-slate-900">2,138 <span className="text-xs font-bold text-emerald-600">+28%</span></p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                      <span>Direct Event Traffic</span>
                    </span>
                    <span className="font-bold text-slate-900">68%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full w-[68%]" />
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600 pt-1">
                    <span className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span>Organic Search</span>
                    </span>
                    <span className="font-bold text-slate-900">32%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full w-[32%]" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. PRICING PROPOSITION: Increase Sales By 30%                */}
      {/* ============================================================ */}
      <section id="fees" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Increase Sales By 30% With <br />
            Reduced Ticket Prices
          </h2>
        </div>

        {/* 4 Column Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-800">
              <DollarSign className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">How We Are Free</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We keep our ticketing solution free by passing a tiny service fee to ticket buyers at checkout so you can keep 100% of your revenue. You can also choose to absorb the small fee without worrying about taking away too much from your profits.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-800">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Passed On Fees</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The difference between us and other ticketing solutions that pass their fees on to customers is that their service fees are between 7-15%, while we proudly have the lowest fees on the market at only 3.5%!
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-800">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">How Fees Affect Sales</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The higher the pass-on fees are, the more money customers will have to pay for the order. The more they have to pay than they originally expected, the greater the chance they won't complete the purchase.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-800">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Increase Sales By 30%</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              By applying only a 3.5% fee, we dramatically reduce the final ticket order price compared to other solutions. This, combined with our marketing tools, can increase your ticket sales by 30%.
            </p>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. INTERACTIVE FEE COMPARISON CALCULATOR                     */}
      {/* ============================================================ */}
      <section id="calculator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            See The Amount Of Fees Added By Other <br />
            Ticketing Providers Vs <span className="text-blue-600">TicketsCandy</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Adjust the slider or values below to compare checkout fees instantly.
          </p>
        </div>

        {/* Calculator White Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl text-slate-900">
          
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-slate-200">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Your Ticket Price ($)
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="5"
                  max="300"
                  step="5"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="w-24 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-sm text-slate-900 shadow-sm">
                  ${ticketPrice}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Average Number Of Tickets Per Order
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={ticketQty}
                  onChange={(e) => setTicketQty(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="w-24 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-sm text-slate-900 shadow-sm">
                  {ticketQty}
                </div>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="pt-8 overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider">
                  <th className="pb-4 font-bold">Metrics</th>
                  <th className="pb-4 font-bold text-blue-600">TicketsCandy</th>
                  <th className="pb-4 font-medium">Eventbrite</th>
                  <th className="pb-4 font-medium">Ticketmaster</th>
                  <th className="pb-4 font-medium">Showclix</th>
                  <th className="pb-4 font-medium">FareHarbor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold">
                <tr>
                  <td className="py-4 text-slate-500">SUBTOTAL</td>
                  <td className="py-4 text-slate-900 font-bold">${subtotal.toFixed(2)}</td>
                  <td className="py-4 text-slate-600">${subtotal.toFixed(2)}</td>
                  <td className="py-4 text-slate-600">${subtotal.toFixed(2)}</td>
                  <td className="py-4 text-slate-600">${subtotal.toFixed(2)}</td>
                  <td className="py-4 text-slate-600">${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-4 text-slate-500">TOTAL AFTER FEES</td>
                  <td className="py-4 text-blue-600 font-bold">${(subtotal + happyCoreFee).toFixed(2)}</td>
                  <td className="py-4 text-slate-600">${(subtotal + eventbriteFee).toFixed(2)}</td>
                  <td className="py-4 text-slate-600">${(subtotal + ticketmasterFee).toFixed(2)}</td>
                  <td className="py-4 text-slate-600">${(subtotal + showclixFee).toFixed(2)}</td>
                  <td className="py-4 text-slate-600">${(subtotal + fareHarborFee).toFixed(2)}</td>
                </tr>
                <tr className="bg-blue-50/80 rounded-xl">
                  <td className="py-4 pl-3 text-blue-700 font-extrabold">PASSED ON FEES</td>
                  <td className="py-4 text-blue-600 font-extrabold text-base sm:text-lg">
                    ${happyCoreFee.toFixed(2)} <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-bold">Lowest!</span>
                  </td>
                  <td className="py-4 text-slate-600">${eventbriteFee.toFixed(2)}</td>
                  <td className="py-4 text-rose-600">${ticketmasterFee.toFixed(2)}</td>
                  <td className="py-4 text-slate-600">${showclixFee.toFixed(2)}</td>
                  <td className="py-4 text-slate-600">${fareHarborFee.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-center text-[10px] text-slate-400 uppercase tracking-widest font-mono">
            * THE CALCULATIONS ARE BASED ON AVERAGE PUBLISHED THIRD-PARTY SERVICE FEES.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 11. 2x2 FEATURE QUADRANT                                     */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Sell Anywhere Online */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Sell Tickets Anywhere Online</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Run your box office from your own website by embedding a small piece of code into your web page or create a beautiful event page complete with tickets, text, and media.
              </p>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center justify-between text-xs font-mono text-slate-600">
              <span>&lt;iframe src="tickets.candy/embed" /&gt;</span>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold font-sans">Ready</span>
            </div>
          </div>

          {/* Card 2: Manage Appointments */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Manage Appointments & Attendees</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                You have full control over managing your attendees and orders. View upcoming appointments, check in attendees, create custom bookings, and much more.
              </p>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 flex items-center justify-between text-xs text-slate-700">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">✓</div>
                <span className="font-semibold">328 Check-ins Today</span>
              </div>
              <span className="text-blue-600 font-bold hover:underline cursor-pointer">View Roster →</span>
            </div>
          </div>

          {/* Card 3: Mobile App Ticket Scanner */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Mobile App Ticket Scanner</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Use our dedicated, easy-to-use mobile app to scan and check-in people on the day of the event. You can scan tickets directly from your customers' mobile phones.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center space-x-2">
                <span> App Store</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center space-x-2">
                <span>▶ Google Play</span>
              </div>
            </div>
          </div>

          {/* Card 4: Trusted Payment Partner */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Trusted Payment Partner</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ticket buyers can use credit cards or digital wallets to pay in any currency through our verified partner network. Your funds will be deposited directly into your bank account on a daily basis.
              </p>
            </div>
            <div className="flex items-center space-x-4 text-xs font-bold text-slate-700">
              <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200">Square</div>
              <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200">Stripe</div>
              <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200">Apple Pay</div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 12. STRATEGIC PARTNER STATS BANNER                           */}
      {/* ============================================================ */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-[#fbf7ed] border border-amber-200/60 p-8 sm:p-12 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Your Strategic Partner In <br />
                Growth & Success
              </h2>
              <div>
                <Link
                  to="/register?role=organizer"
                  className="px-6 py-3 rounded-full text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 transition-all inline-block shadow-sm"
                >
                  Get Started for Free
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-white border border-amber-200/50 shadow-sm space-y-1">
                <p className="text-2xl sm:text-3xl font-black text-slate-900">17M+</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tickets Sold</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-amber-200/50 shadow-sm space-y-1">
                <p className="text-2xl sm:text-3xl font-black text-amber-600">30K+</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Organizers</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-amber-200/50 shadow-sm space-y-1">
                <p className="text-2xl sm:text-3xl font-black text-blue-600">7+</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Countries</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 13. LIVE UPCOMING EVENTS (Database Integration)              */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 space-y-4 md:space-y-0">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              <Calendar className="w-4 h-4" />
              <span>Trending Live Events</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Featured Upcoming Events</h2>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center space-x-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loadingEvents ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 rounded-3xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : featuredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-3xl border border-slate-200">
            <p className="text-slate-500 text-sm">No live events posted at the moment.</p>
            <Link
              to="/register?role=organizer"
              className="mt-3 inline-block text-xs font-bold text-blue-600 hover:underline"
            >
              Host the first event now →
            </Link>
          </div>
        )}
      </section>

    </div>
  );
};
