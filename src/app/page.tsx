'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
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
  Store, 
  Users,
  Zap
} from 'lucide-react';

export default function Home() {
  const handleRestaurantLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signIn('credentials', {
      email: 'restaurant@foodbridge.org',
      name: 'Green Bistro',
      role: 'restaurant',
      callbackUrl: '/dashboard',
    });
  };

  const handleNgoLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signIn('credentials', {
      email: 'ngo@foodbridge.org',
      name: 'Hope Shelter',
      role: 'ngo',
      callbackUrl: '/donations',
    });
  };

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
    <div className="min-h-screen bg-[#F8F9FC] text-[#1A1F2B] flex flex-col justify-between font-sans">
      <Header />
      
      {/* HERO SECTION */}
      <main className="flex-1">
        <section className="relative px-4 sm:px-6 py-16 md:py-28 overflow-hidden flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
          {/* Badge - Updated to Yellow/Amber theme */}
          <div className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#FFF4E6] text-[#F5A623] border border-[#F5A623]/20 text-xs font-bold uppercase tracking-widest animate-fade-in select-none shadow-sm">
            <Zap className="w-4 h-4" />
            Empowering Zero-Waste Communities
          </div>
          
          {/* Main Title - Yellow Gradient */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-[#1A1F2B] max-w-4xl">
            Bridging the Gap Between <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] to-[#FFC107]">Surplus Food</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC107] to-[#F5A623]">Communities</span>
          </h1>
          
          {/* Subtitle - Clean gray */}
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Tone down food waste. FoodBridge provides an elegant, real-time coordination center for restaurants to donate safe, surplus food and for NGOs to claim it instantly.
          </p>
 
          {/* CTA Buttons - Modern Rounded-2xl with Soft Shadows */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-4">
            <button
              onClick={handleRestaurantLogin}
              className="w-full sm:w-auto px-10 py-4 bg-[#F5A623] hover:bg-[#e0961a] text-white rounded-2xl text-sm font-extrabold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group select-none cursor-pointer border-none"
            >
              <span>Donate Food</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleNgoLogin}
              className="w-full sm:w-auto px-10 py-4 bg-white border border-gray-200 text-[#1A1F2B] hover:bg-gray-50 rounded-2xl text-sm font-extrabold shadow-sm hover:shadow-md transition-all duration-300 text-center select-none cursor-pointer"
            >
              Browse Listings
            </button>
          </div>
        </section>

        {/* METRICS SECTION - Clean white background, spaced out */}
        <section className="bg-white border-y border-gray-100 py-20 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <p className="text-5xl font-black text-[#1A1F2B] tracking-tight">12k+</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Meals Distributed</p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl font-black text-[#F5A623] tracking-tight">250+</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Partner Restaurants</p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl font-black text-[#F5A623] tracking-tight">180+</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Local Shelters</p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl font-black text-[#1A1F2B] tracking-tight">98%</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Coordination Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION - Soft Gray Background, Rounded-2xl Cards */}
        <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-4xl font-black text-[#1A1F2B] tracking-tight">
              Designed for Speed and Reliability
            </h2>
            <p className="text-gray-500 leading-relaxed">
              When it comes to redistributing fresh food, timing is everything. Our lightweight platform provides immediate, zero-friction links.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-10 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-50 space-y-6">
              <div className="p-4 bg-[#FFF4E6] text-[#F5A623] rounded-2xl w-fit shadow-sm">
                <Store className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-[#1A1F2B] mb-2">For Restaurants</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Quickly list surplus meals at the end of the shift. Enforce pickup schedules to ensure your kitchens clear out efficiently.
                </p>
              </div>
            </Card>

            <Card className="p-10 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-50 space-y-6">
              <div className="p-4 bg-[#FFF4E6] text-[#F5A623] rounded-2xl w-fit shadow-sm">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-[#1A1F2B] mb-2">For NGOs & Shelters</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Scan available listings, inspect allergens or food details, and claim pickups instantly with a confirmation click.
                </p>
              </div>
            </Card>

            <Card className="p-10 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-50 space-y-6">
              <div className="p-4 bg-[#FFF4E6] text-[#F5A623] rounded-2xl w-fit shadow-sm">
                <Activity className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-[#1A1F2B] mb-2">Real-Time Status</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Track food delivery from listing creation to pickup verification and final cycle completion.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* HOW IT WORKS SECTION - Clean Steps */}
        <section className="bg-white border-y border-gray-100 py-24 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <h2 className="text-4xl font-black text-[#1A1F2B] tracking-tight">
                Three Simple Steps
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Getting fresh surplus food to those who need it takes less than five minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
              <div className="text-center space-y-4 p-6 bg-[#F8F9FC] rounded-2xl shadow-sm border border-gray-100 relative z-10">
                <div className="h-14 w-14 bg-[#F5A623] text-white rounded-2xl flex items-center justify-center font-black text-xl mx-auto shadow-md">1</div>
                <div>
                  <h4 className="font-extrabold text-lg text-[#1A1F2B]">Restaurant Lists Food</h4>
                  <p className="text-sm text-gray-500 leading-relaxed mt-1">
                    Enter meal type, quantity, address, and availability limits.
                  </p>
                </div>
              </div>

              <div className="text-center space-y-4 p-6 bg-[#F8F9FC] rounded-2xl shadow-sm border border-gray-100 relative z-10">
                <div className="h-14 w-14 bg-[#F5A623] text-white rounded-2xl flex items-center justify-center font-black text-xl mx-auto shadow-md">2</div>
                <div>
                  <h4 className="font-extrabold text-lg text-[#1A1F2B]">NGO Claims Pickup</h4>
                  <p className="text-sm text-gray-500 leading-relaxed mt-1">
                    NGO browses details on the dashboard and locks in the claim.
                  </p>
                </div>
              </div>

              <div className="text-center space-y-4 p-6 bg-[#F8F9FC] rounded-2xl shadow-sm border border-gray-100 relative z-10">
                <div className="h-14 w-14 bg-[#F5A623] text-white rounded-2xl flex items-center justify-center font-black text-xl mx-auto shadow-md">3</div>
                <div>
                  <h4 className="font-extrabold text-lg text-[#1A1F2B]">Distribution</h4>
                  <p className="text-sm text-gray-500 leading-relaxed mt-1">
                    NGO handles the transport pickup, and the listing status is marked as complete.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION - With Checkmarks */}
        <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-4xl font-black text-[#1A1F2B] tracking-tight">
              Why Partner with FoodBridge?
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Join a community dedicated to food redistribution and zero-waste logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <CheckCircle2 className="w-6 h-6 text-[#F5A623] shrink-0 mt-1" />
              <div>
                <h4 className="font-extrabold text-[#1A1F2B]">Zero Waste & Green Rating</h4>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  Restaurants reduce their waste disposal fees and can showcase their local community green footprint.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <CheckCircle2 className="w-6 h-6 text-[#F5A623] shrink-0 mt-1" />
              <div>
                <h4 className="font-extrabold text-[#1A1F2B]">Reliable Food Sourcing</h4>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  NGOs gain access to high-quality, freshly prepared surplus meals from licensed partners.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <CheckCircle2 className="w-6 h-6 text-[#F5A623] shrink-0 mt-1" />
              <div>
                <h4 className="font-extrabold text-[#1A1F2B]">Corporate Responsibility</h4>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  Showcase local volunteer efforts and build strong community relationships through food distribution.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <CheckCircle2 className="w-6 h-6 text-[#F5A623] shrink-0 mt-1" />
              <div>
                <h4 className="font-extrabold text-[#1A1F2B]">Dynamic Log Audits</h4>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  Both partners can verify and track all claim history data easily directly from the admin panel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION - Soft Gray Background */}
        <section className="bg-[#F8F9FC] border-t border-gray-100 py-24 shadow-inner">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
            <h2 className="text-4xl font-black text-[#1A1F2B] tracking-tight text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-2 hover:shadow-md transition-all">
                  <h4 className="font-extrabold text-[#1A1F2B] flex items-center gap-3 text-lg">
                    <HelpCircle className="w-6 h-6 text-[#F5A623] shrink-0" />
                    {faq.q}
                  </h4>
                  <p className="text-gray-500 pl-9 leading-relaxed text-sm">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION BOTTOM - Bold Yellow Gradient */}
        <section className="bg-gradient-to-br from-[#F5A623] to-[#FFC107] text-white text-center py-24 px-4 sm:px-6 space-y-8 shadow-lg">
          <h2 className="text-5xl font-black tracking-tight leading-none">
            Ready to Help Fight Food Waste?
          </h2>
          <p className="text-[#FFF4E6] max-w-xl mx-auto text-lg leading-relaxed">
            Partner with FoodBridge today. It takes less than two minutes to get registered and start posting or claiming food.
          </p>
          <div className="pt-4">
            <a
              href="/donations"
              className="inline-flex items-center gap-2 px-12 py-5 bg-white text-[#F5A623] rounded-2xl text-lg font-extrabold hover:bg-gray-50 transition shadow-xl hover:shadow-2xl hover:-translate-y-1 transform duration-300"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}