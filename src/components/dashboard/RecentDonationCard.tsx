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
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4.5 border border-gray-150/65 dark:border-gray-800/80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xs hover:shadow-xs transition duration-300 gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2.5">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">
            {donation.foodName}
          </h4>
          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
            {donation.quantity} meals
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          from <span className="font-semibold text-gray-700 dark:text-gray-300">{donation.restaurantName || 'Partner Restaurant'}</span> • {formatTime(donation.createdAt)}
        </p>
      </div>

      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto shrink-0 gap-3 border-t sm:border-t-0 border-gray-100 dark:border-gray-800 pt-2.5 sm:pt-0">
        <StatusBadge status={donation.status} />
        <a
          href={`/donations/${donation.donationId}`}
          className="text-xs font-bold px-3 py-1.5 bg-slate-50 dark:bg-slate-850 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl border border-gray-200 dark:border-gray-750 hover:border-emerald-250 dark:hover:border-emerald-900/30 transition shrink-0"
        >
          View Details
        </a>
      </div>
    </div>
  );
}
