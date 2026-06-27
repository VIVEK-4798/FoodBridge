'use client';

import React from 'react';
import { Claim } from '../../types/claim';
import { Donation } from '../../types/donation';
import StatusBadge from '../ui/StatusBadge';

interface ClaimHistoryCardProps {
  claim: Claim;
  donation?: Donation & { restaurantName?: string; restaurantEmail?: string };
}

export default function ClaimHistoryCard({ claim, donation }: ClaimHistoryCardProps) {
  const formattedClaimedAt = () => {
    try {
      const date = new Date(claim.claimedAt);
      return date.toLocaleString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return claim.claimedAt;
    }
  };

  const formattedExpiry = () => {
    if (!donation) return '';
    try {
      const date = new Date(donation.availableUntil);
      return date.toLocaleString([], {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return donation.availableUntil;
    }
  };

  if (!donation) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700/50 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700/50 rounded-2xl p-5 shadow-xs hover:shadow-md transition duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {donation.foodName}
          </h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
            {donation.quantity} meals
          </span>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          from <strong className="text-gray-700 dark:text-gray-300 font-semibold">{donation.restaurantName || 'Partner Restaurant'}</strong>
          {donation.restaurantEmail && ` (${donation.restaurantEmail})`}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pt-1 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-start gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 shrink-0 text-gray-400 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span>Pickup Address: <strong className="text-gray-700 dark:text-gray-300 font-medium">{donation.pickupAddress}</strong></span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 shrink-0 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span>Expiry limit: <strong className="text-gray-700 dark:text-gray-300 font-medium">{formattedExpiry()}</strong></span>
          </div>
        </div>

        <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5 pt-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span>Claimed on {formattedClaimedAt()}</span>
        </div>
      </div>

      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto shrink-0 gap-3 border-t md:border-t-0 border-gray-100 dark:border-gray-700/50 pt-3 md:pt-0">
        <div className="flex flex-col items-start md:items-end">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Status</span>
          <StatusBadge status={donation.status} />
        </div>

        <a
          href={`/donations/${donation.donationId}`}
          className="text-xs font-semibold px-3.5 py-1.5 border border-gray-300 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500 rounded-xl text-gray-750 dark:text-gray-250 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          View Details
        </a>
      </div>
    </div>
  );
}
