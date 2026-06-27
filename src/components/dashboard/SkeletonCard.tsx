import React from 'react';

interface SkeletonProps {
  variant?: 'stat' | 'timeline' | 'list';
  count?: number;
}

export default function SkeletonCard({ variant = 'stat', count = 1 }: SkeletonProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case 'timeline':
        return (
          <div className="space-y-6">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0 animate-pulse"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'list':
        return (
          <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl animate-pulse">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 shrink-0"></div>
              </div>
            ))}
          </div>
        );
      case 'stat':
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="p-5 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl space-y-3 shadow-2xs animate-pulse">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        );
    }
  };

  return <>{renderSkeleton()}</>;
}
