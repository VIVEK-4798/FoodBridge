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
    // Unified Yellow/Amber theme for all timeline icons
    const iconClass = "flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF4E6] text-[#F5A623] border border-[#F5A623]/20 shadow-sm shrink-0";
    
    switch (type) {
      case 'donation_created':
        return (
          <div className={iconClass}>
            <PlusCircle className="w-5 h-5" />
          </div>
        );
      case 'donation_claimed':
        return (
          <div className={iconClass}>
            <UserCheck className="w-5 h-5" />
          </div>
        );
      case 'donation_picked_up':
        return (
          <div className={iconClass}>
            <Truck className="w-5 h-5" />
          </div>
        );
      case 'donation_completed':
        return (
          <div className={iconClass}>
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
      <div className="text-center py-10 text-gray-400 text-sm font-extrabold">
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
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start space-x-4">
                {getEventIcon(event.type)}
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div className="space-y-0.5">
                    <p className="text-sm font-extrabold text-[#1A1F2B] tracking-tight leading-snug">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-500 font-bold">
                      {event.description}
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-xs text-gray-400 font-extrabold shrink-0 pt-1">
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