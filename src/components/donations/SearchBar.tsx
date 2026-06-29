import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search by food name, address, or description..." }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search className="w-5 h-5 text-gray-400 shrink-0" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-2xl border border-gray-200 pl-11 pr-4 py-3 text-sm bg-white text-[#1A1F2B] placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#F5A623] focus:outline-none transition-all duration-200 h-12 shadow-sm focus:shadow-md"
        placeholder={placeholder}
      />
    </div>
  );
}