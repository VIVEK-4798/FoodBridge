'use client';

import React from 'react';
import { Donation } from '../../types/donation';
import StatusBadge from '../ui/StatusBadge';
import ClaimButton from './ClaimButton';
import { MapPin, Clock } from 'lucide-react';

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
    <div className="bg-white dark:bg-slate-900 border border-gray-150/70 dark:border-gray-800/80 rounded-3xl p-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition duration-300 flex flex-col justify-between h-full group">
      <div className="space-y-4">
        {/* Top line: status and quantity */}
        <div className="flex items-center justify-between">
          <StatusBadge status={donation.status} />
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-750 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
            {donation.quantity} meals
          </span>
        </div>

        {/* Food name and restaurant */}
        <div>
          <h3 className="text-lg font-black text-gray-900 dark:text-white line-clamp-1 tracking-tight group-hover:text-emerald-600 transition">
            {donation.foodName}
          </h3>
          <p className="text-xs font-bold text-gray-450 dark:text-gray-500 mt-0.5">
            by {donation.restaurantName || 'Partner Restaurant'}
          </p>
        </div>

        {/* Description */}
        {donation.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {donation.description}
          </p>
        )}

        {/* Details list */}
        <div className="space-y-2 pt-1.5 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100/50 dark:border-gray-800/60">
          {/* Pickup Address */}
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 shrink-0 text-gray-400 mt-0.5" />
            <span className="line-clamp-1 font-semibold">{donation.pickupAddress}</span>
          </div>

          {/* Available Until */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0 text-gray-400" />
            <span className="font-semibold">Available: <strong className="text-gray-700 dark:text-gray-300 font-bold">{formattedExpiry()}</strong></span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 pt-4 border-t border-gray-100/60 dark:border-gray-800/60 flex items-center justify-between gap-3">
        <a
          href={`/donations/${donation.donationId}`}
          className="text-xs font-bold text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-450 underline transition decoration-2"
        >
          View Details
        </a>

        {userRole === 'ngo' && donation.status === 'AVAILABLE' && ngoId && onClaimSuccess && (
          <ClaimButton
            donationId={donation.donationId}
            ngoId={ngoId}
            onClaimSuccess={onClaimSuccess}
            buttonClassName="h-9 px-3.5 text-xs rounded-xl shadow-2xs font-bold"
          />
        )}
      </div>
    </div>
  );
}
