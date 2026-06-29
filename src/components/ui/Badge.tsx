import React from 'react';
import { DonationStatus } from '../../types/donation';

interface BadgeProps {
  status: DonationStatus;
  className?: string;
}

export default function Badge({ status, className = '' }: BadgeProps) {
  const getStyles = () => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-[#FFF4E6] text-[#F5A623] border-[#F5A623]/20 shadow-sm';
      case 'CLAIMED':
        return 'bg-[#FFF4E6] text-[#E08A1A] border-[#E08A1A]/20 shadow-sm'; // Darker amber for claimed
      case 'PICKED_UP':
        return 'bg-[#FFF4E6] text-[#C07B15] border-[#C07B15]/20 shadow-sm'; // Even darker for picked up
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-500 border-gray-200 shadow-sm';
      default:
        return 'bg-gray-100 text-gray-500 border-gray-200 shadow-sm';
    }
  };

  const getIndicatorColor = () => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-[#F5A623]';
      case 'CLAIMED':
        return 'bg-[#E08A1A]';
      case 'PICKED_UP':
        return 'bg-[#C07B15]';
      case 'COMPLETED':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const formatText = (text: string) => {
    return text.replace('_', ' ');
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl text-[10px] font-extrabold border uppercase tracking-wider select-none ${getStyles()} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${getIndicatorColor()} shrink-0`}></span>
      {formatText(status)}
    </span>
  );
}