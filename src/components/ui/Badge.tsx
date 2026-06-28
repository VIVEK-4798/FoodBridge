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
        return 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30';
      case 'CLAIMED':
        return 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30';
      case 'PICKED_UP':
        return 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30';
      case 'COMPLETED':
        return 'bg-gray-150 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
    }
  };

  const getIndicatorColor = () => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-emerald-500';
      case 'CLAIMED':
        return 'bg-amber-500';
      case 'PICKED_UP':
        return 'bg-blue-500';
      case 'COMPLETED':
        return 'bg-gray-450';
      default:
        return 'bg-gray-400';
    }
  };

  const formatText = (text: string) => {
    return text.replace('_', ' ');
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border uppercase tracking-wider select-none ${getStyles()} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${getIndicatorColor()} shrink-0`}></span>
      {formatText(status)}
    </span>
  );
}
