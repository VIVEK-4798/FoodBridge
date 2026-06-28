import React from 'react';
import { Inbox, Compass } from 'lucide-react';
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
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-slate-900 border border-gray-150/65 dark:border-gray-800/80 rounded-3xl shadow-2xs py-14 max-w-xl mx-auto space-y-5">
      <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 rounded-full w-fit shadow-3xs">
        <Compass className="w-8 h-8" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
          {description}
        </p>
      </div>

      {(actionLabel && (actionHref || onAction)) && (
        <div className="pt-2">
          {actionHref ? (
            <a
              href={actionHref}
              className="inline-flex items-center justify-center font-bold text-sm rounded-2xl px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm hover:shadow-md transition h-11"
            >
              {actionLabel}
            </a>
          ) : (
            <Button onClick={onAction} className="h-11 py-2">
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
