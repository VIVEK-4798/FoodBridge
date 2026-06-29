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
          className={`flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 group hover:-translate-y-0.5 ${
            action.primary
              ? 'bg-[#F5A623] border-[#F5A623] text-white shadow-md hover:shadow-lg'
              : 'bg-white border-gray-100 text-[#1A1F2B] shadow-sm hover:border-[#F5A623] hover:shadow-md'
          }`}
        >
          <div className={`p-3 rounded-2xl shrink-0 transition-transform duration-300 ${
            action.primary
              ? 'bg-white/20 text-white group-hover:scale-105'
              : 'bg-[#FFF4E6] text-[#F5A623] shadow-sm group-hover:scale-105'
          }`}>
            {action.icon}
          </div>
          <div>
            <h4 className="text-sm font-extrabold leading-snug tracking-tight">
              {action.title}
            </h4>
            <p className={`text-xs mt-1 leading-normal font-medium ${
              action.primary
                ? 'text-[#FFF4E6]'
                : 'text-gray-500'
            }`}>
              {action.description}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}