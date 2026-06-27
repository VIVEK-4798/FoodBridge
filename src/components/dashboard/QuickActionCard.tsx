import React from 'react';

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
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          ),
        },
        {
          title: 'Manage My Postings',
          description: 'View active listings and update pickup status.',
          href: '/donations',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          ),
        },
        {
          title: 'View Profile Settings',
          description: 'Check contact emails and organization names.',
          href: '/profile',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          ),
        },
      ];
    } else {
      return [
        {
          title: 'Browse Available Food',
          description: 'View active surplus listings from restaurants.',
          href: '/donations',
          primary: true,
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.608 10.608Z" />
            </svg>
          ),
        },
        {
          title: 'Track Claimed Pickups',
          description: 'Manage items you claimed and coordinate transport.',
          href: '/profile/claims',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.3 8.359.1.1m-.1-.1a1.5 1.5 0 0 1-.414-1.062v-.75a1.5 1.5 0 0 1 1.5-1.5h3.84a1.5 1.5 0 0 1 1.5 1.5v.75m-7.3 1.062h7.3m0 0a1.5 1.5 0 0 1 1.5 1.5v.75a1.5 1.5 0 0 1-1.5 1.5h-7.3a1.5 1.5 0 0 1-1.5-1.5v-.75a1.5 1.5 0 0 1 1.5-1.5Z" />
            </svg>
          ),
        },
        {
          title: 'View Profile Settings',
          description: 'Check contact emails and organization names.',
          href: '/profile',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          ),
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
          className={`flex items-start gap-4 p-4 rounded-2xl border transition duration-300 group hover:-translate-y-0.5 hover:shadow-xs ${
            action.primary
              ? 'bg-blue-600 border-blue-600 text-white hover:bg-blue-500'
              : 'bg-white dark:bg-gray-800 border-gray-150 dark:border-gray-700/50 text-gray-900 dark:text-white hover:border-blue-600 dark:hover:border-blue-500'
          }`}
        >
          <div className={`p-2.5 rounded-xl shrink-0 ${
            action.primary
              ? 'bg-white/10 text-white'
              : 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition'
          }`}>
            {action.icon}
          </div>
          <div>
            <h4 className="text-sm font-bold leading-snug">
              {action.title}
            </h4>
            <p className={`text-xs mt-0.5 ${
              action.primary
                ? 'text-blue-100'
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              {action.description}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
