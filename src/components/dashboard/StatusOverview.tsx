import React from 'react';

interface StatusStats {
  availableDonations: number;
  claimedDonations: number;
  pickedUpDonations: number;
  completedDonations: number;
}

interface StatusOverviewProps {
  stats: StatusStats;
}

export default function StatusOverview({ stats }: StatusOverviewProps) {
  const total =
    stats.availableDonations +
    stats.claimedDonations +
    stats.pickedUpDonations +
    stats.completedDonations || 1; // avoid divide by zero

  const items = [
    {
      label: 'Available',
      count: stats.availableDonations,
      percent: Math.round((stats.availableDonations / total) * 100),
      color: 'bg-emerald-500',
      trackColor: 'bg-emerald-100 dark:bg-emerald-950/20',
      textColor: 'text-emerald-700 dark:text-emerald-400',
    },
    {
      label: 'Claimed',
      count: stats.claimedDonations,
      percent: Math.round((stats.claimedDonations / total) * 100),
      color: 'bg-amber-500',
      trackColor: 'bg-amber-100 dark:bg-amber-950/20',
      textColor: 'text-amber-700 dark:text-amber-400',
    },
    {
      label: 'Picked Up',
      count: stats.pickedUpDonations,
      percent: Math.round((stats.pickedUpDonations / total) * 100),
      color: 'bg-blue-500',
      trackColor: 'bg-blue-100 dark:bg-blue-950/20',
      textColor: 'text-blue-700 dark:text-blue-400',
    },
    {
      label: 'Completed',
      count: stats.completedDonations,
      percent: Math.round((stats.completedDonations / total) * 100),
      color: 'bg-gray-400',
      trackColor: 'bg-gray-200 dark:bg-gray-800',
      textColor: 'text-gray-500 dark:text-gray-400',
    },
  ];

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.label} className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-extrabold text-gray-700 dark:text-gray-300">
              {item.label}
            </span>
            <div className="flex items-center gap-2">
              <span className={`font-bold ${item.textColor}`}>
                {item.count}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold">
                ({item.percent}%)
              </span>
            </div>
          </div>
          <div className={`h-2.5 w-full rounded-full ${item.trackColor} overflow-hidden`}>
            <div
              className={`h-full rounded-full ${item.color} transition-all duration-500`}
              style={{ width: `${item.percent}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
