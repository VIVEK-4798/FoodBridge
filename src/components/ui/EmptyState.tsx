import React from 'react';
import { Compass } from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white border border-gray-100 rounded-2xl shadow-sm py-14 max-w-xl mx-auto space-y-6">
      <div className="p-4 bg-[#FFF4E6] text-[#F5A623] rounded-2xl w-fit shadow-sm border border-[#F5A623]/10">
        <Compass className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-black text-[#1A1F2B] tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-gray-500 font-medium max-w-sm leading-relaxed">
          {description}
        </p>
      </div>

      {(actionLabel && (actionHref || onAction)) && (
        <div className="pt-2">
          {actionHref ? (
            <a
              href={actionHref}
              className="inline-flex items-center justify-center font-extrabold text-sm rounded-2xl px-6 py-3 bg-[#F5A623] hover:bg-[#e0961a] text-white shadow-md hover:shadow-lg transition-all duration-200 h-12 min-w-[100px]"
            >
              {actionLabel}
            </a>
          ) : (
            <Button onClick={onAction} className="h-12 min-w-[100px]">
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}