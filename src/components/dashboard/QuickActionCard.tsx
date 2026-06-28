import React from 'react';
import { 
  PlusCircle, 
  Search, 
  User, 
  ClipboardList 
} from 'lucide-react';

interface QuickActionItem {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  primary?: boolean;
}

interface QuickActionProps {
  role: 'restaurant' | 'ngo';
}

export default function QuickActionCard({ role }: QuickActionProps) {
  const getActions = (): QuickActionItem[] => {
    if (role === 'restaurant') {
      return [
        {
          title: 'List Surplus Food',
          description: 'Post a new meals donation for NGOs to claim.',
          href: '/donations/new',
          primary: true,
          icon: <PlusCircle className="w-5 h-5" />,
        },
        {
          title: 'Manage My Postings',
          description: 'View active listings and update pickup status.',
          href: '/donations',
          icon: <ClipboardList className="w-5 h-5" />,
        },
        {
          title: 'View Profile Settings',
          description: 'Check contact emails and organization names.',
          href: '/profile',
          icon: <User className="w-5 h-5" />,
        },
      ];
    } else {
      return [
        {
          title: 'Browse Available Food',
          description: 'View active surplus listings from restaurants.',
          href: '/donations',
          primary: true,
          icon: <Search className="w-5 h-5" />,
        },
        {
          title: 'Track Claimed Pickups',
          description: 'Manage items you claimed and coordinate transport.',
          href: '/profile/claims',
          icon: <ClipboardList className="w-5 h-5" />,
        },
        {
          title: 'View Profile Settings',
          description: 'Check contact emails and organization names.',
          href: '/profile',
          icon: <User className="w-5 h-5" />,
        },
      ];
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {getActions().map((action) => (
        <a
          key={action.title}
          href={action.href}
          className={`flex items-start gap-4 p-4.5 rounded-2xl border transition duration-300 group hover:-translate-y-0.5 hover:shadow-xs ${
            action.primary
              ? 'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-500'
              : 'bg-white dark:bg-slate-900 border-gray-150/70 dark:border-gray-800/80 text-gray-900 dark:text-white hover:border-emerald-600 dark:hover:border-emerald-500'
          }`}
        >
          <div className={`p-2.5 rounded-xl shrink-0 ${
            action.primary
              ? 'bg-white/10 text-white'
              : 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 group-hover:scale-105 transition shadow-2xs'
          }`}>
            {action.icon}
          </div>
          <div>
            <h4 className="text-sm font-bold leading-snug tracking-tight">
              {action.title}
            </h4>
            <p className={`text-xs mt-0.5 leading-normal ${
              action.primary
                ? 'text-emerald-100'
                : 'text-gray-500 dark:text-gray-450'
            }`}>
              {action.description}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
