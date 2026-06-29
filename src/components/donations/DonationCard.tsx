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
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group">
      <div className="space-y-4">
        {/* Top line: status and quantity */}
        <div className="flex items-center justify-between">
          <StatusBadge status={donation.status} />
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[#FFF4E6] text-[#F5A623] border border-[#F5A623]/20 shadow-sm">
            {donation.quantity} meals
          </span>
        </div>

        {/* Food name and restaurant */}
        <div>
          <h3 className="text-xl font-black text-[#1A1F2B] line-clamp-1 tracking-tight group-hover:text-[#F5A623] transition-colors duration-200">
            {donation.foodName}
          </h3>
          <p className="text-xs font-medium text-gray-500 mt-1">
            by {donation.restaurantName || 'Partner Restaurant'}
          </p>
        </div>

        {/* Description */}
        {donation.description && (
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed font-medium">
            {donation.description}
          </p>
        )}

        {/* Details list */}
        <div className="space-y-2.5 pt-2 text-xs text-gray-500 border-t border-gray-100">
          {/* Pickup Address */}
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 shrink-0 text-gray-400 mt-0.5" />
            <span className="line-clamp-1 font-medium text-gray-600">{donation.pickupAddress}</span>
          </div>

          {/* Available Until */}
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 shrink-0 text-gray-400" />
            <span className="font-medium text-gray-600">Available: <strong className="text-[#1A1F2B] font-extrabold">{formattedExpiry()}</strong></span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
        <a
          href={`/donations/${donation.donationId}`}
          className="text-xs font-extrabold px-4 py-2 bg-white hover:bg-[#FFF4E6] text-gray-600 hover:text-[#F5A623] rounded-2xl border border-gray-200 hover:border-[#F5A623] shadow-sm hover:shadow-md transition-all duration-200"
        >
          View Details
        </a>

        {userRole === 'ngo' && donation.status === 'AVAILABLE' && ngoId && onClaimSuccess && (
          <ClaimButton
            donationId={donation.donationId}
            ngoId={ngoId}
            onClaimSuccess={onClaimSuccess}
            buttonClassName="h-9 px-4 text-xs rounded-2xl shadow-md font-extrabold bg-[#F5A623] hover:bg-[#e0961a] text-white border-none"
          />
        )}
      </div>
    </div>
  );
}