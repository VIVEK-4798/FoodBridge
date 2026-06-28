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
    <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-150/70 dark:border-gray-800/80 shadow-2xs">
      {/* Availability */}
      <div className="flex flex-col gap-1.5 min-w-[150px] flex-1 sm:flex-none">
        <label className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Availability</label>
        <select
          value={availability}
          onChange={(e) => onAvailabilityChange(e.target.value as any)}
          className="block w-full text-sm rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 text-gray-900 dark:text-white px-3.5 py-2.5 h-12 focus:border-transparent focus:ring-2 focus:ring-emerald-500 focus:outline-none transition shadow-2xs font-semibold cursor-pointer"
        >
          <option value="all">Any time</option>
          <option value="today">Available Today</option>
          <option value="tomorrow">Available Tomorrow</option>
        </select>
      </div>

      {/* Min Quantity */}
      <div className="flex flex-col gap-1.5 min-w-[150px] flex-1 sm:flex-none">
        <label className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Min Quantity</label>
        <select
          value={minQuantity}
          onChange={(e) => onMinQuantityChange(Number(e.target.value))}
          className="block w-full text-sm rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 text-gray-900 dark:text-white px-3.5 py-2.5 h-12 focus:border-transparent focus:ring-2 focus:ring-emerald-500 focus:outline-none transition shadow-2xs font-semibold cursor-pointer"
        >
          <option value={0}>Any quantity</option>
          <option value={5}>5+ meals</option>
          <option value={10}>10+ meals</option>
          <option value={20}>20+ meals</option>
        </select>
      </div>

      {/* Sort By */}
      <div className="flex flex-col gap-1.5 min-w-[160px] flex-1 sm:flex-none">
        <label className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as any)}
          className="block w-full text-sm rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 text-gray-900 dark:text-white px-3.5 py-2.5 h-12 focus:border-transparent focus:ring-2 focus:ring-emerald-500 focus:outline-none transition shadow-2xs font-semibold cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="quantity_desc">Quantity: High to Low</option>
          <option value="quantity_asc">Quantity: Low to High</option>
        </select>
      </div>

      {/* Clear/Reset Button */}
      <div className="flex items-end h-full self-end ml-auto pt-2.5">
        {(availability !== 'all' || minQuantity > 0 || sortBy !== 'newest') && (
          <button
            onClick={() => {
              onAvailabilityChange('all');
              onMinQuantityChange(0);
              onSortChange('newest');
            }}
            className="text-xs text-emerald-650 hover:text-emerald-500 font-extrabold uppercase tracking-widest transition px-4 py-2.5 hover:bg-emerald-50/50 rounded-2xl"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}
