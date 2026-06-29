import React from 'react';
import { Donation } from '../../types/donation';
import StatusBadge from '../ui/StatusBadge';

interface RecentDonationProps {
  donation: Donation & { restaurantName?: string };
}

export default function RecentDonationCard({ donation }: RecentDonationProps) {
  const formatTime = (timeStr: string) => {
    try {
      const date = new Date(timeStr);
      return date.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return timeStr;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border border-gray-100 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 gap-4">
      <div className="space-y-1.5">
        <div className="flex items-center gap-3">
          <h4 className="text-base font-extrabold text-[#1A1F2B] line-clamp-1">
            {donation.foodName}
          </h4>
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[#FFF4E6] text-[#F5A623] border border-[#F5A623]/20 shadow-sm">
            {donation.quantity} meals
          </span>
        </div>
        <p className="text-xs text-gray-500 font-medium">
          from <span className="font-bold text-gray-700">{donation.restaurantName || 'Partner Restaurant'}</span> • {formatTime(donation.createdAt)}
        </p>
      </div>

      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto shrink-0 gap-4 border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
        <StatusBadge status={donation.status} />
        <a
          href={`/donations/${donation.donationId}`}
          className="text-xs font-extrabold px-4 py-2 bg-white hover:bg-[#FFF4E6] text-gray-600 hover:text-[#F5A623] rounded-2xl border border-gray-200 hover:border-[#F5A623] shadow-sm hover:shadow-md transition-all duration-200 shrink-0"
        >
          View Details
        </a>
      </div>
    </div>
  );
}