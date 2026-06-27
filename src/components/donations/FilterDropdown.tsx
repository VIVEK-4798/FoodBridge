import React from 'react';

interface FilterProps {
  availability: 'all' | 'today' | 'tomorrow';
  onAvailabilityChange: (val: 'all' | 'today' | 'tomorrow') => void;
  minQuantity: number;
  onMinQuantityChange: (val: number) => void;
  sortBy: 'newest' | 'oldest' | 'quantity_desc' | 'quantity_asc';
  onSortChange: (val: 'newest' | 'oldest' | 'quantity_desc' | 'quantity_asc') => void;
}

export default function FilterDropdown({
  availability,
  onAvailabilityChange,
  minQuantity,
  onMinQuantityChange,
  sortBy,
  onSortChange,
}: FilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-gray-50 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-200/55 dark:border-gray-800">
      {/* Availability */}
      <div className="flex flex-col gap-1.5 min-w-[140px]">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Availability</label>
        <select
          value={availability}
          onChange={(e) => onAvailabilityChange(e.target.value as any)}
          className="block w-full text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 focus:border-blue-500 focus:outline-none"
        >
          <option value="all">Any time</option>
          <option value="today">Available Today</option>
          <option value="tomorrow">Available Tomorrow</option>
        </select>
      </div>

      {/* Min Quantity */}
      <div className="flex flex-col gap-1.5 min-w-[140px]">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Min Quantity</label>
        <select
          value={minQuantity}
          onChange={(e) => onMinQuantityChange(Number(e.target.value))}
          className="block w-full text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 focus:border-blue-500 focus:outline-none"
        >
          <option value={0}>Any quantity</option>
          <option value={5}>5+ meals</option>
          <option value={10}>10+ meals</option>
          <option value={20}>20+ meals</option>
        </select>
      </div>

      {/* Sort By */}
      <div className="flex flex-col gap-1.5 min-w-[140px]">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as any)}
          className="block w-full text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 focus:border-blue-500 focus:outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="quantity_desc">Quantity: High to Low</option>
          <option value="quantity_asc">Quantity: Low to High</option>
        </select>
      </div>

      {/* Clear/Reset Button */}
      <div className="flex items-end h-full self-end ml-auto">
        {(availability !== 'all' || minQuantity > 0 || sortBy !== 'newest') && (
          <button
            onClick={() => {
              onAvailabilityChange('all');
              onMinQuantityChange(0);
              onSortChange('newest');
            }}
            className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}
