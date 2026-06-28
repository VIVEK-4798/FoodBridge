import React from 'react';
import { 
  PlusCircle, 
  UserCheck, 
  Truck, 
  CheckCircle2 
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  type: 'donation_created' | 'donation_claimed' | 'donation_picked_up' | 'donation_completed';
  title: string;
  description: string;
  timestamp: string;
}

interface ActivityTimelineProps {
  events: TimelineEvent[];
}

export default function ActivityTimeline({ events }: ActivityTimelineProps) {
  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'donation_created':
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100/40 dark:border-emerald-900/30 shrink-0">
            <PlusCircle className="w-5 h-5" />
          </div>
        );
      case 'donation_claimed':
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-100/40 dark:border-amber-900/30 shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
        );
      case 'donation_picked_up':
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border border-blue-100/40 dark:border-blue-900/30 shrink-0">
            <Truck className="w-5 h-5" />
          </div>
        );
      case 'donation_completed':
        return (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        );
    }
  };

  const formatTime = (timeStr: string) => {
    try {
      const date = new Date(timeStr);
      const diffMs = new Date().getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch {
      return timeStr;
    }
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400 dark:text-gray-500 text-sm font-semibold">
        No platform activity recorded yet.
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span
                  className="absolute top-5 left-4.5 -ml-px h-full w-0.5 bg-gray-150 dark:bg-gray-850"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start space-x-3.5">
                {getEventIcon(event.type)}
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div className="space-y-0.5">
                    <p className="text-sm font-extrabold text-gray-900 dark:text-white tracking-tight leading-snug">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {event.description}
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-xs text-gray-400 dark:text-gray-500 font-bold shrink-0">
                    <time dateTime={event.timestamp}>{formatTime(event.timestamp)}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
