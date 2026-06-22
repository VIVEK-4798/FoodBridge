"use client";
import React, { useState } from 'react';

export default function CreateDonationPage() {
  const [form, setForm] = useState({ foodName: '', quantity: '', pickupAddress: '', availableUntil: '', description: '' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Client-side placeholder: real submission hits /api/donations
    alert('Donation would be submitted (MVP)');
  };

  return (
    <main className="p-6 max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Create Donation</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Food name" value={form.foodName} onChange={(e) => setForm({ ...form, foodName: e.target.value })} />
        <input className="w-full p-2 border rounded" placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
        <input className="w-full p-2 border rounded" placeholder="Pickup address" value={form.pickupAddress} onChange={(e) => setForm({ ...form, pickupAddress: e.target.value })} />
        <input className="w-full p-2 border rounded" placeholder="Available until (ISO)" value={form.availableUntil} onChange={(e) => setForm({ ...form, availableUntil: e.target.value })} />
        <textarea className="w-full p-2 border rounded" placeholder="Notes / description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
      </form>
    </main>
  );
}
