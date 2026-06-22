import React from 'react';
import DonationListItem from '../../components/donations/DonationListItem';

export default function DonationsPage() {
  // Placeholder list
  const donations: any[] = [];

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Available Donations</h1>
        <a href="/donations/new" className="text-sm text-blue-600">Create Donation</a>
      </div>

      <div className="space-y-4">
        {donations.length === 0 ? (
          <div className="text-gray-500">No donations yet.</div>
        ) : (
          donations.map((d) => <DonationListItem key={d.donationId} donation={d} />)
        )}
      </div>
    </main>
  );
}
