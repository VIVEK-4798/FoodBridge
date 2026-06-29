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
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group">
      <div className="space-y-4 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-black text-[#1A1F2B] tracking-tight group-hover:text-[#F5A623] transition-colors duration-200">
            {donation.foodName}
          </h3>
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[#FFF4E6] text-[#F5A623] border border-[#F5A623]/20 shadow-sm">
            {donation.quantity} meals
          </span>
        </div>

        <p className="text-xs text-gray-500 font-medium">
          from <strong className="text-gray-700 font-bold">{donation.restaurantName || 'Partner Restaurant'}</strong>
          {donation.restaurantEmail && ` (${donation.restaurantEmail})`}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 pt-2 text-xs text-gray-500 border-t border-gray-100">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 shrink-0 text-gray-400 mt-0.5" />
            <span className="font-medium">Address: <strong className="text-[#1A1F2B] font-extrabold">{donation.pickupAddress}</strong></span>
          </div>

          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 shrink-0 text-gray-400" />
            <span className="font-medium">Expiry: <strong className="text-[#1A1F2B] font-extrabold">{formattedExpiry()}</strong></span>
          </div>
        </div>

        <div className="text-xs text-gray-500 font-medium flex items-center gap-2 pt-0.5 bg-[#F8F9FC] px-3 py-1.5 rounded-full w-fit border border-gray-100">
          <CheckCircle className="w-4 h-4 text-[#F5A623] shrink-0" />
          <span>Claimed on <strong className="font-extrabold text-[#1A1F2B]">{formattedClaimedAt()}</strong></span>
        </div>
      </div>

      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto shrink-0 gap-4 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
        <div className="flex flex-col items-start md:items-end">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-extrabold mb-1.5 pl-0.5">Status</span>
          <StatusBadge status={donation.status} />
        </div>

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