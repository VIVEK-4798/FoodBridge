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
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/40';
      case 'CLAIMED':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/40';
      case 'PICKED_UP':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/40';
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-650 border-gray-250 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
    }
  };

  const formatText = (text: string) => {
    return text.replace('_', ' ');
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border tracking-wide select-none ${getStyles()} ${className}`}>
      {formatText(status)}
    </span>
  );
}
