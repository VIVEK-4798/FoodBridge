'use client';

import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import { 
  ArrowRight, 
  Heart, 
  Shield, 
  Activity, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  Leaf, 
  Store, 
  Users 
} from 'lucide-react';

export default function Home() {
  const faqs = [
    {
      q: 'Is the surplus food safe to eat?',
      a: 'Absolutely. FoodBridge enforces strict listing guidelines. Restaurants only list food that is safely packaged, kept within appropriate temperature limits, and within its food safety window.',
    },
    {
      q: 'How much does it cost to use the platform?',
      a: 'FoodBridge is completely free for both restaurants and NGOs. Our mission is to eliminate food waste and support communities in need.',
    },
    {
      q: 'How does food collection work?',
      a: 'Once an NGO claims a listing, they coordinate the pickup directly with the restaurant based on the available pickup window and address provided in the listing.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-gray-150 flex flex-col justify-between">
      <Header />
      
      {/* HERO SECTION */}
      <main className="flex-1">
        <section className="relative px-4 sm:px-6 py-16 md:py-28 overflow-hidden flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-150 dark:border-emerald-900/30 text-xs font-bold uppercase tracking-widest animate-fade-in select-none">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Zero-Waste Communities
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-gray-900 dark:text-white max-w-4xl">
            Bridging the Gap Between <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Surplus Food</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">Communities</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Tone down food waste. FoodBridge provides an elegant, real-time coordination center for restaurants to donate safe, surplus food and for NGOs to claim it instantly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-4">
            <a
              href="/donations/new"
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-sm font-extrabold shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center gap-2 group select-none"
            >
              <span>Donate Food</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
            <a
              href="/donations"
              className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-850 rounded-2xl text-sm font-extrabold shadow-2xs hover:shadow-xs transition duration-200 text-center select-none"
            >
              Browse Listings
            </a>
          </div>
        </section>

        {/* METRICS SECTION (Alternating Background - White) */}
        <section className="bg-white dark:bg-slate-900/50 border-y border-gray-150/70 dark:border-gray-850 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-1">
                <p className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">12k+</p>
                <p className="text-xs font-bold text-gray-450 dark:text-gray-500 uppercase tracking-widest">Meals Distributed</p>
              </div>
              <div className="space-y-1">
                <p className="text-4xl sm:text-5xl font-black text-emerald-600 dark:text-emerald-450 tracking-tight">250+</p>
                <p className="text-xs font-bold text-gray-450 dark:text-gray-500 uppercase tracking-widest">Partner Restaurants</p>
              </div>
              <div className="space-y-1">
                <p className="text-4xl sm:text-5xl font-black text-teal-650 dark:text-teal-400 tracking-tight">180+</p>
                <p className="text-xs font-bold text-gray-450 dark:text-gray-500 uppercase tracking-widest">Local Shelters</p>
              </div>
              <div className="space-y-1">
                <p className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">98%</p>
                <p className="text-xs font-bold text-gray-450 dark:text-gray-500 uppercase tracking-widest">Coordination Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION (Alternating Background - Gray) */}
        <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Designed for Speed and Reliability
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              When it comes to redistributing fresh food, timing is everything. Our lightweight platform provides immediate, zero-friction links.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card hoverEffect className="p-8 space-y-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 rounded-2xl w-fit">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">For Restaurants</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Quickly list surplus meals at the end of the shift. Enforce pickup schedules to ensure your kitchens clear out efficiently.
              </p>
            </Card>

            <Card hoverEffect className="p-8 space-y-4">
              <div className="p-3 bg-teal-50 dark:bg-teal-950/20 text-teal-650 dark:text-teal-400 rounded-2xl w-fit">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">For NGOs & Shelters</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Scan available listings, inspect allergens or food details, and claim pickups instantly with a confirmation click.
              </p>
            </Card>

            <Card hoverEffect className="p-8 space-y-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded-2xl w-fit">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">Real-Time Status</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Track food delivery from listing creation to pickup verification and final cycle completion.
              </p>
            </Card>
          </div>
        </section>

        {/* HOW IT WORKS SECTION (Alternating Background - White) */}
        <section className="bg-white dark:bg-slate-900/50 border-y border-gray-150/70 dark:border-gray-850 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                Three Simple Steps
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Getting fresh surplus food to those who need it takes less than five minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="space-y-3 relative z-10">
                <div className="h-10 w-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-black">1</div>
                <h4 className="font-extrabold text-gray-900 dark:text-white">Restaurant Lists Food</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Enter meal type, quantity, address, and availability limits.
                </p>
              </div>

              <div className="space-y-3 relative z-10">
                <div className="h-10 w-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-black">2</div>
                <h4 className="font-extrabold text-gray-900 dark:text-white">NGO Claims Pickup</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  NGO browses details on the dashboard and locks in the claim.
                </p>
              </div>

              <div className="space-y-3 relative z-10">
                <div className="h-10 w-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-black">3</div>
                <h4 className="font-extrabold text-gray-900 dark:text-white">Distribution</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  NGO handles the transport pickup, and the listing status is marked as complete.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION (Alternating Background - Gray) */}
        <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Why Partner with FoodBridge?
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Join a community dedicated to food redistribution and zero-waste logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-extrabold text-gray-900 dark:text-white">Zero Waste & Green Rating</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  Restaurants reduce their waste disposal fees and can showcase their local community green footprint.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-extrabold text-gray-900 dark:text-white">Reliable Food Sourcing</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  NGOs gain access to high-quality, freshly prepared surplus meals from licensed partners.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-extrabold text-gray-900 dark:text-white">Corporate Responsibility</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  Showcase local volunteer efforts and build strong community relationships through food distribution.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-extrabold text-gray-900 dark:text-white">Dynamic Log Audits</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  Both partners can verify and track all claim history data easily directly from the admin panel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION (Alternating Background - White) */}
        <section className="bg-white dark:bg-slate-900/50 border-t border-gray-150/70 dark:border-gray-850 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl space-y-2 border border-gray-150/30 dark:border-gray-850">
                  <h4 className="font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    {faq.q}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 pl-6 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION BOTTOM (Gradient) */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-center py-20 px-4 sm:px-6 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
            Ready to Help Fight Food Waste?
          </h2>
          <p className="text-emerald-50 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Partner with FoodBridge today. It takes less than two minutes to get registered and start posting or claiming food.
          </p>
          <div className="pt-2">
            <a
              href="/donations"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-emerald-700 rounded-2xl text-sm font-extrabold hover:bg-emerald-50 transition shadow-md"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
