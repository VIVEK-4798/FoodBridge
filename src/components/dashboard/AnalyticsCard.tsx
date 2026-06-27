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
    <div className={`bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-700/50 rounded-2xl p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition duration-300 flex items-start justify-between gap-4 group ${className}`}>
      <div className="space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          {title}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            {value}
          </span>
          {trend && (
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${
              trend.isPositive 
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400' 
                : 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400'
            }`}>
              {trend.value}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
            {description}
          </p>
        )}
      </div>

      {icon && (
        <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl text-blue-600 dark:text-blue-400 group-hover:scale-105 transition shrink-0">
          {icon}
        </div>
      )}
    </div>
  );
}
