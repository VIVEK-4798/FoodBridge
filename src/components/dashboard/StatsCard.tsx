import React from 'react';

export default function StatsCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 border rounded shadow-sm">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
