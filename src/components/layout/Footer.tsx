import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-16 py-12 text-sm text-gray-500 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="FoodBridge Logo" className="h-8 w-8 object-contain" />
          <img src="/title.png" alt="FoodBridge" className="h-5 object-contain" />
        </div>

        {/* Copyright Text */}
        <p className="text-xs font-medium text-gray-400 order-3 md:order-2">
          © {new Date().getFullYear()} FoodBridge. Empowering restaurants and NGOs to fight hunger together.
        </p>

        {/* Links Area */}
        <div className="flex gap-x-8 text-xs font-bold text-gray-400 order-2 md:order-3">
          <a href="#" className="hover:text-[#F5A623] hover:underline transition-colors duration-200">Privacy Policy</a>
          <a href="#" className="hover:text-[#F5A623] hover:underline transition-colors duration-200">Terms of Service</a>
          <a href="#" className="hover:text-[#F5A623] hover:underline transition-colors duration-200">Contact</a>
        </div>
      </div>
    </footer>
  );
}