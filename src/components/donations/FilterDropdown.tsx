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
    <div className="flex flex-wrap items-end gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-md">
      {/* Availability */}
      <div className="flex flex-col gap-1.5 min-w-[150px] flex-1 sm:flex-none">
        <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest pl-1">Availability</label>
        <select
          value={availability}
          onChange={(e) => onAvailabilityChange(e.target.value as any)}
          className="block w-full text-sm rounded-2xl border border-gray-200 bg-white text-[#1A1F2B] px-3.5 py-2.5 h-12 focus:border-transparent focus:ring-2 focus:ring-[#F5A623] focus:outline-none transition shadow-sm focus:shadow-md font-extrabold cursor-pointer"
        >
          <option value="all">Any time</option>
          <option value="today">Available Today</option>
          <option value="tomorrow">Available Tomorrow</option>
        </select>
      </div>

      {/* Min Quantity */}
      <div className="flex flex-col gap-1.5 min-w-[150px] flex-1 sm:flex-none">
        <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest pl-1">Min Quantity</label>
        <select
          value={minQuantity}
          onChange={(e) => onMinQuantityChange(Number(e.target.value))}
          className="block w-full text-sm rounded-2xl border border-gray-200 bg-white text-[#1A1F2B] px-3.5 py-2.5 h-12 focus:border-transparent focus:ring-2 focus:ring-[#F5A623] focus:outline-none transition shadow-sm focus:shadow-md font-extrabold cursor-pointer"
        >
          <option value={0}>Any quantity</option>
          <option value={5}>5+ meals</option>
          <option value={10}>10+ meals</option>
          <option value={20}>20+ meals</option>
        </select>
      </div>

      {/* Sort By */}
      <div className="flex flex-col gap-1.5 min-w-[160px] flex-1 sm:flex-none">
        <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest pl-1">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as any)}
          className="block w-full text-sm rounded-2xl border border-gray-200 bg-white text-[#1A1F2B] px-3.5 py-2.5 h-12 focus:border-transparent focus:ring-2 focus:ring-[#F5A623] focus:outline-none transition shadow-sm focus:shadow-md font-extrabold cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="quantity_desc">Quantity: High to Low</option>
          <option value="quantity_asc">Quantity: Low to High</option>
        </select>
      </div>

      {/* Clear/Reset Button */}
      <div className="flex items-end h-full self-end ml-auto pb-0.5">
        {(availability !== 'all' || minQuantity > 0 || sortBy !== 'newest') && (
          <button
            onClick={() => {
              onAvailabilityChange('all');
              onMinQuantityChange(0);
              onSortChange('newest');
            }}
            className="text-xs font-extrabold text-[#F5A623] hover:bg-[#FFF4E6] border border-[#F5A623]/20 transition-colors px-4 py-2.5 rounded-2xl shadow-sm hover:shadow-md uppercase tracking-widest"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}