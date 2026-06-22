import React from 'react';

export default function DonationListItem({ donation }: { donation: any }) {
  return (
    <div className="p-4 border rounded flex items-center justify-between">
      <div>
        <div className="font-medium">{donation.foodName || 'Food Item'}</div>
        <div className="text-sm text-gray-500">{donation.quantity ? `${donation.quantity} meals` : '—'}</div>
      </div>
      <div>
        <a className="text-blue-600" href={`/donations/${donation.donationId}`}>View</a>
      </div>
    </div>
  );
}
