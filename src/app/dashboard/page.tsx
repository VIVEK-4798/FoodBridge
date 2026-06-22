import React from 'react';
import StatsCard from '../../components/dashboard/StatsCard';

export default function DashboardPage() {
  // Placeholder values; real data fetched from /api/dashboard in future
  const stats = {
    totalDonations: 0,
    activeDonations: 0,
    completedDonations: 0,
    totalClaims: 0,
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard title="Total Donations" value={String(stats.totalDonations)} />
        <StatsCard title="Active Donations" value={String(stats.activeDonations)} />
        <StatsCard title="Completed Donations" value={String(stats.completedDonations)} />
        <StatsCard title="Total Claims" value={String(stats.totalClaims)} />
      </div>
    </main>
  );
}
