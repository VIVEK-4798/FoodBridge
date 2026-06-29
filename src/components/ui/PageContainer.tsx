'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({ children, className = '' }: PageContainerProps) {
  const { status } = useSession();
  const pathname = usePathname();
  
  // Apply padding left on desktop for authenticated layout (except home and role selection)
  const isAuthRoute = status === 'authenticated' && pathname !== '/' && pathname !== '/role-selection';
  const paddingClass = isAuthRoute ? 'md:pl-72' : '';

  return (
    <main className={`flex-1 w-full mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fade-in ${paddingClass} ${className}`}>
      {children}
    </main>
  );
}