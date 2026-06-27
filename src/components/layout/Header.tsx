'use client';

import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showDevLoginDropdown, setShowDevLoginDropdown] = useState(false);

  const handleMockLogin = async (role: 'restaurant' | 'ngo') => {
    setShowDevLoginDropdown(false);
    const email = role === 'restaurant' ? 'restaurant@foodbridge.org' : 'ngo@foodbridge.org';
    const name = role === 'restaurant' ? 'Green Bistro' : 'Hope Shelter';
    await signIn('credentials', {
      email,
      name,
      role,
      callbackUrl: '/dashboard',
    });
  };

  const handleGoogleLogin = async () => {
    setShowDevLoginDropdown(false);
    await signIn('google', { callbackUrl: '/role-selection' });
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-150 dark:border-gray-800 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <a href={session ? '/dashboard' : '/'} className="flex items-center gap-2 group">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:bg-blue-500 transition">
            F
          </div>
          <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 transition">
            FoodBridge
          </span>
        </a>

        {/* Navigation & User controls */}
        <div className="flex items-center gap-6">
          {/* Navigation Links */}
          {status === 'authenticated' && session?.user?.role && (
            <nav className="hidden md:flex items-center gap-1">
              <a
                href="/dashboard"
                className="px-3 py-2 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-850 transition"
              >
                Dashboard
              </a>
              <a
                href="/donations"
                className="px-3 py-2 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-850 transition"
              >
                {session.user.role === 'restaurant' ? 'My Donations' : 'Available Donations'}
              </a>
              {session.user.role === 'ngo' && (
                <a
                  href="/profile/claims"
                  className="px-3 py-2 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-850 transition"
                >
                  My Claims
                </a>
              )}
              {session.user.role === 'restaurant' && (
                <a
                  href="/donations/new"
                  className="px-3 py-2 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-850 transition"
                >
                  Create Donation
                </a>
              )}
            </nav>
          )}

          {/* User profile / Login trigger */}
          <div className="relative">
            {status === 'loading' ? (
              <div className="h-8 w-24 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl"></div>
            ) : status === 'authenticated' ? (
              <div className="flex items-center gap-3">
                {/* User info */}
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                    {session.user.name}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 leading-none mt-0.5">
                    {session.user.role || 'No Role'}
                  </span>
                </div>
                {/* Sign out button */}
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-950/20 text-gray-700 dark:text-gray-350 hover:text-red-650 dark:hover:text-red-400 rounded-xl text-xs font-bold transition border border-transparent hover:border-red-200 dark:hover:border-red-900/30"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowDevLoginDropdown(!showDevLoginDropdown)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-xs hover:shadow transition"
                >
                  Sign In
                </button>

                {showDevLoginDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-150 dark:border-gray-700 py-2.5 z-50">
                    <div className="px-4 py-1.5 border-b border-gray-100 dark:border-gray-700 mb-2">
                      <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Choose login method</span>
                    </div>
                    {/* Google OAuth Login */}
                    <button
                      onClick={handleGoogleLogin}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-250 hover:bg-gray-50 dark:hover:bg-gray-750 flex items-center gap-2.5 transition"
                    >
                      <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Google Account
                    </button>
                    {/* Mock Restaurant */}
                    <button
                      onClick={() => handleMockLogin('restaurant')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-250 hover:bg-gray-50 dark:hover:bg-gray-750 flex items-center gap-2.5 transition"
                    >
                      <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                      Mock Restaurant (Dev)
                    </button>
                    {/* Mock NGO */}
                    <button
                      onClick={() => handleMockLogin('ngo')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-250 hover:bg-gray-50 dark:hover:bg-gray-750 flex items-center gap-2.5 transition"
                    >
                      <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
                      Mock NGO (Dev)
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile nav indicator bar */}
      {status === 'authenticated' && session?.user?.role && (
        <div className="flex md:hidden bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 justify-around py-2.5 px-4 text-xs font-bold text-gray-550">
          <a href="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 px-2 py-1">Dashboard</a>
          <a href="/donations" className="hover:text-blue-600 dark:hover:text-blue-400 px-2 py-1">
            {session.user.role === 'restaurant' ? 'My Donations' : 'Available Donations'}
          </a>
          {session.user.role === 'ngo' && (
            <a href="/profile/claims" className="hover:text-blue-600 dark:hover:text-blue-400 px-2 py-1">My Claims</a>
          )}
          {session.user.role === 'restaurant' && (
            <a href="/donations/new" className="hover:text-blue-600 dark:hover:text-blue-400 px-2 py-1">Create</a>
          )}
        </div>
      )}
    </header>
  );
}
