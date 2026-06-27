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
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-150 dark:border-gray-700/50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xs hover:shadow-xs transition duration-300 gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">
            {donation.foodName}
          </h4>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-750 dark:bg-blue-950/20 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
            {donation.quantity} meals
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          from <span className="font-semibold text-gray-700 dark:text-gray-300">{donation.restaurantName || 'Partner Restaurant'}</span> • {formatTime(donation.createdAt)}
        </p>
      </div>

      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto shrink-0 gap-3 border-t sm:border-t-0 border-gray-100 dark:border-gray-700/50 pt-2 sm:pt-0">
        <StatusBadge status={donation.status} />
        <a
          href={`/donations/${donation.donationId}`}
          className="text-xs font-bold px-3 py-1.5 bg-gray-50 dark:bg-gray-850 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl border border-gray-200 dark:border-gray-750 hover:border-blue-200 dark:hover:border-blue-900/30 transition shrink-0"
        >
          View Details
        </a>
      </div>
    </div>
  );
}
