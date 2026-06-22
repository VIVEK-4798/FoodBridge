import React from 'react';

export default function Header() {
  return (
    <header className="w-full p-4 border-b bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="font-bold">FoodBridge</div>
        <nav className="space-x-4">
          <a href="/" className="text-sm text-gray-700">Home</a>
          <a href="/donations" className="text-sm text-gray-700">Donations</a>
          <a href="/dashboard" className="text-sm text-gray-700">Dashboard</a>
        </nav>
      </div>
    </header>
  );
}
