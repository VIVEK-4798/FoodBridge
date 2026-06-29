import React from 'react';

export default function DonationListItem({ donation }: { donation: any }) {
  return (
    <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="space-y-1.5">
        <div className="font-extrabold text-[#1A1F2B] tracking-tight text-lg">
          {donation.foodName || 'Food Item'}
        </div>
        <div className="text-sm font-medium text-gray-500">
          {donation.quantity ? `${donation.quantity} meals` : '—'}
        </div>
      </div>
      <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
        <a 
          className="inline-flex w-full sm:w-auto justify-center text-xs font-extrabold px-4 py-2 bg-[#FFF4E6] hover:bg-white text-[#F5A623] hover:text-[#F5A623] rounded-2xl border border-[#F5A623]/20 hover:border-[#F5A623] shadow-sm hover:shadow-md transition-all duration-200"
          href={`/donations/${donation.donationId}`}
        >
          View
        </a>
      </div>
    </div>
  );
}