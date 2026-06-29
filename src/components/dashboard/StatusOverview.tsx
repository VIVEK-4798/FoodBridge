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
      color: 'bg-[#F5A623]', // Brand Yellow
      trackColor: 'bg-gray-100',
      textColor: 'text-[#F5A623]',
    },
    {
      label: 'Claimed',
      count: stats.claimedDonations,
      percent: Math.round((stats.claimedDonations / total) * 100),
      color: 'bg-[#F5A623]', // Brand Yellow
      trackColor: 'bg-gray-100',
      textColor: 'text-[#F5A623]',
    },
    {
      label: 'Picked Up',
      count: stats.pickedUpDonations,
      percent: Math.round((stats.pickedUpDonations / total) * 100),
      color: 'bg-[#F5A623]', // Brand Yellow
      trackColor: 'bg-gray-100',
      textColor: 'text-[#F5A623]',
    },
    {
      label: 'Completed',
      count: stats.completedDonations,
      percent: Math.round((stats.completedDonations / total) * 100),
      color: 'bg-gray-300', // Neutral Gray for Finished Status
      trackColor: 'bg-gray-100',
      textColor: 'text-gray-500',
    },
  ];

  return (
    <div className="space-y-5">
      {items.map((item) => (
        <div key={item.label} className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-extrabold text-gray-400 uppercase tracking-wider text-[11px]">
              {item.label}
            </span>
            <div className="flex items-center gap-2">
              <span className={`font-extrabold text-[#1A1F2B]`}>
                {item.count}
              </span>
              <span className={`text-xs font-extrabold ${item.textColor}`}>
                {item.percent}%
              </span>
            </div>
          </div>
          <div className={`h-2.5 w-full rounded-full ${item.trackColor} overflow-hidden shadow-inner`}>
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