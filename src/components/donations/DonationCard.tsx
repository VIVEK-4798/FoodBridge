'use client';

import React from 'react';
import { Donation } from '../../types/donation';
import StatusBadge from '../ui/StatusBadge';
import ClaimButton from './ClaimButton';

interface DonationCardProps {
  donation: Donation & { restaurantName?: string };
  userRole: 'restaurant' | 'ngo' | null;
  ngoId?: string;
  onClaimSuccess?: () => void;
}

export default function DonationCard({ donation, userRole, ngoId, onClaimSuccess }: DonationCardProps) {
  const formattedExpiry = () => {
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

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700/50 rounded-2xl p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition duration-300 flex flex-col justify-between h-full">
      <div className="space-y-3">
        {/* Top line: status and quantity */}
        <div className="flex items-center justify-between">
          <StatusBadge status={donation.status} />
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
            {donation.quantity} meals
          </span>
        </div>

        {/* Food name and restaurant */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
            {donation.foodName}
          </h3>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            by {donation.restaurantName || 'Partner Restaurant'}
          </p>
        </div>

        {/* Description */}
        {donation.description && (
          <p className="text-sm text-gray-650 dark:text-gray-350 line-clamp-2">
            {donation.description}
          </p>
        )}

        {/* Details list */}
        <div className="space-y-1.5 pt-1 text-xs text-gray-500 dark:text-gray-400">
          {/* Pickup Address */}
          <div className="flex items-start gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 shrink-0 text-gray-400 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span className="line-clamp-1">{donation.pickupAddress}</span>
          </div>

          {/* Available Until */}
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 shrink-0 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span>Available until: <strong className="text-gray-700 dark:text-gray-300 font-semibold">{formattedExpiry()}</strong></span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between gap-3">
        <a
          href={`/donations/${donation.donationId}`}
          className="text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 underline transition"
        >
          View Details
        </a>

        {userRole === 'ngo' && donation.status === 'AVAILABLE' && ngoId && onClaimSuccess && (
          <ClaimButton
            donationId={donation.donationId}
            ngoId={ngoId}
            onClaimSuccess={onClaimSuccess}
            buttonClassName="py-1 px-3 text-xs"
          />
        )}
      </div>
    </div>
  );
}
