import React from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function SectionHeader({ title, description, action, className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 ${className}`}>
      <div className="space-y-1.5">
        <h1 className="text-2xl md:text-3xl font-black text-[#1A1F2B] tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0 self-start sm:self-auto">{action}</div>}
    </div>
  );
}