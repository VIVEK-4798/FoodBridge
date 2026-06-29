import React from 'react';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    label: string;
    isPositive?: boolean;
  };
  className?: string;
}

export default function AnalyticsCard({
  title,
  value,
  description,
  icon,
  trend,
  className = '',
}: AnalyticsCardProps) {
  return (
    <div className={`bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-start justify-between gap-4 group ${className}`}>
      <div className="space-y-3">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 pl-0.5">
          {title}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-black text-[#1A1F2B] tracking-tight">
            {value}
          </span>
          {trend && (
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
              trend.isPositive 
                ? 'bg-[#FFF4E6] text-[#F5A623] border border-[#F5A623]/20' 
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}>
              {trend.value}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-gray-500 leading-normal pl-0.5">
            {description}
          </p>
        )}
      </div>

      {icon && (
        <div className="p-3 bg-[#FFF4E6] rounded-2xl text-[#F5A623] group-hover:scale-105 transition-transform duration-300 shrink-0 shadow-sm border border-[#F5A623]/10">
          {icon}
        </div>
      )}
    </div>
  );
}