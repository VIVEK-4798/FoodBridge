import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full p-4 border-t mt-8 text-sm text-gray-500">
      <div className="max-w-6xl mx-auto">© {new Date().getFullYear()} FoodBridge</div>
    </footer>
  );
}
