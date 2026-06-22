import React from 'react';

export default function DonationDetailsPage({ params }: { params: { id: string } }) {
  // Placeholder: would fetch /api/donations/[id]
  return (
    <main className="p-6 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">Donation Details</h1>
      <div className="p-4 border rounded">
        <div className="text-lg font-medium">Donation ID: {params.id}</div>
        <div className="text-gray-600">Details would be loaded from the API.</div>
      </div>
    </main>
  );
}
