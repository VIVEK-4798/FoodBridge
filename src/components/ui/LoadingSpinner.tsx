import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#F5A623]"></div>
      <p className="mt-4 text-sm font-extrabold text-gray-400 animate-pulse tracking-wider">
        Loading...
      </p>
    </div>
  );
}