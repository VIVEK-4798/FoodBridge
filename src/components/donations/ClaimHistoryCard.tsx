'use client';

import React from 'react';
import { Claim } from '../../types/claim';
import { Donation } from '../../types/donation';
import StatusBadge from '../ui/StatusBadge';
import { MapPin, Clock, Calendar, CheckCircle } from 'lucide-react';

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
      <div className="bg-white dark:bg-slate-900 border border-gray-150/65 dark:border-gray-800/80 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-150/65 dark:border-gray-800/80 rounded-3xl p-6 shadow-xs hover:shadow-md transition duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group">
      <div className="space-y-3.5 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight group-hover:text-emerald-650 transition">
            {donation.foodName}
          </h3>
          <span className="text-xs font-extrabold px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-750 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
            {donation.quantity} meals
          </span>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          from <strong className="text-gray-750 dark:text-gray-300 font-bold">{donation.restaurantName || 'Partner Restaurant'}</strong>
          {donation.restaurantEmail && ` (${donation.restaurantEmail})`}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 pt-1 text-xs text-gray-500 dark:text-gray-450 border-t border-gray-100/50 dark:border-gray-800/60">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 shrink-0 text-gray-400 mt-0.5" />
            <span>Address: <strong className="text-gray-700 dark:text-gray-300 font-semibold">{donation.pickupAddress}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0 text-gray-400" />
            <span>Expiry: <strong className="text-gray-700 dark:text-gray-300 font-semibold">{formattedExpiry()}</strong></span>
          </div>
        </div>

        <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5 pt-0.5">
          <CheckCircle className="w-4 h-4 text-emerald-555 shrink-0" />
          <span>Claimed on <strong className="font-semibold text-gray-500 dark:text-gray-400">{formattedClaimedAt()}</strong></span>
        </div>
      </div>

      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto shrink-0 gap-4 border-t md:border-t-0 border-gray-100 dark:border-gray-800 pt-4 md:pt-0">
        <div className="flex flex-col items-start md:items-end">
          <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-extrabold mb-1.5 pl-0.5">Status</span>
          <StatusBadge status={donation.status} />
        </div>

        <a
          href={`/donations/${donation.donationId}`}
          className="text-xs font-bold px-4 py-2 border-2 border-gray-200 dark:border-gray-800 hover:border-emerald-555 hover:text-emerald-600 rounded-2xl text-gray-700 dark:text-gray-300 transition"
        >
          View Details
        </a>
      </div>
    </div>
  );
}
