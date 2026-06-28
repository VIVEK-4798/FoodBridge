import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-gray-150 dark:border-gray-850 mt-12 py-10 text-sm text-gray-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-emerald-600 rounded-md flex items-center justify-center text-white font-extrabold text-xs">
            F
          </div>
          <span className="font-extrabold text-gray-900 dark:text-white">
            FoodBridge
          </span>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} FoodBridge. Empowering restaurants and NGOs to fight hunger together.
        </p>
        <div className="flex gap-6 text-xs text-gray-400 dark:text-gray-500">
          <a href="#" className="hover:text-emerald-600 transition">Privacy Policy</a>
          <a href="#" className="hover:text-emerald-600 transition">Terms of Service</a>
          <a href="#" className="hover:text-emerald-600 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
