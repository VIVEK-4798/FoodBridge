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
    <div className={`bg-white dark:bg-slate-900 border border-gray-150/65 dark:border-gray-800/80 rounded-3xl p-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-start justify-between gap-4 group ${className}`}>
      <div className="space-y-3">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500 pl-0.5">
          {title}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            {value}
          </span>
          {trend && (
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
              trend.isPositive 
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400' 
                : 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400'
            }`}>
              {trend.value}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-gray-450 dark:text-gray-400 leading-normal pl-0.5">
            {description}
          </p>
        )}
      </div>

      {icon && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl text-emerald-600 dark:text-emerald-450 group-hover:scale-105 transition shrink-0 shadow-2xs">
          {icon}
        </div>
      )}
    </div>
  );
}
