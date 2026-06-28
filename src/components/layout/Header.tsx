'use client';

import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Inbox, 
  ClipboardList, 
  User as UserIcon, 
  PlusCircle, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search,
  Globe
} from 'lucide-react';

export default function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [showDevLoginDropdown, setShowDevLoginDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navLinks = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard className="w-5 h-5 shrink-0" />,
      roles: ['restaurant', 'ngo'],
    },
    {
      title: session?.user?.role === 'restaurant' ? 'My Donations' : 'Available Food',
      href: '/donations',
      icon: <Inbox className="w-5 h-5 shrink-0" />,
      roles: ['restaurant', 'ngo'],
    },
    {
      title: 'My Claims',
      href: '/profile/claims',
      icon: <ClipboardList className="w-5 h-5 shrink-0" />,
      roles: ['ngo'],
    },
    {
      title: 'Create Listing',
      href: '/donations/new',
      icon: <PlusCircle className="w-5 h-5 shrink-0" />,
      roles: ['restaurant'],
    },
    {
      title: 'My Profile',
      href: '/profile',
      icon: <UserIcon className="w-5 h-5 shrink-0" />,
      roles: ['restaurant', 'ngo'],
    },
  ];

  const filteredLinks = navLinks.filter(
    (link) => session?.user?.role && link.roles.includes(session.user.role)
  );

  const getInitials = (userName?: string | null) => {
    if (!userName) return 'U';
    return userName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  };

  // If user is authenticated, we show the Left Sidebar + Top Navbar template.
  // If user is anonymous, we show the standard Hero Marketing Navbar.
  const isAuth = status === 'authenticated';

  return (
    <>
      {isAuth ? (
        <>
          {/* TOP NAVBAR (Authenticated) */}
          <nav className="fixed top-0 right-0 left-0 md:left-64 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-150 dark:border-gray-800 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              {/* Mobile Hamburger menu */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-gray-850"
                aria-label="Open navigation sidebar"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Rounded search placeholder */}
              <div className="hidden sm:flex items-center gap-2 bg-gray-50 dark:bg-slate-950 px-3.5 py-1.5 rounded-full border border-gray-200 dark:border-gray-850 text-xs text-gray-400 w-64">
                <Search className="w-4 h-4 shrink-0" />
                <span>Search dashboard actions...</span>
              </div>
            </div>

            {/* Icons & User indicator */}
            <div className="flex items-center gap-4">
              <button
                className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-850 transition"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
              </button>

              <div className="h-8 w-px bg-gray-200 dark:bg-gray-800"></div>

              {/* Mini User Tag */}
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-black shadow-xs uppercase select-none">
                  {getInitials(session.user.name)}
                </div>
                <div className="hidden lg:flex flex-col items-start leading-none text-left">
                  <span className="text-xs font-bold text-gray-900 dark:text-white">{session.user.name}</span>
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {session.user.role}
                  </span>
                </div>
              </div>
            </div>
          </nav>

          {/* LEFT SIDEBAR (Desktop Authenticated) */}
          <aside className="hidden md:flex fixed top-0 bottom-0 left-0 w-64 bg-slate-50 dark:bg-slate-950 border-r border-gray-150 dark:border-gray-850 flex-col justify-between p-6 z-40">
            <div className="space-y-8">
              {/* Brand Logo */}
              <a href="/dashboard" className="flex items-center gap-2.5 group">
                <div className="h-9 w-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-extrabold text-lg group-hover:bg-emerald-500 transition duration-300 shadow-sm">
                  F
                </div>
                <span className="font-black text-xl tracking-tight text-gray-900 dark:text-white group-hover:text-emerald-600 transition">
                  FoodBridge
                </span>
              </a>

              {/* Navigation links */}
              <nav className="space-y-1.5">
                {filteredLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <a
                      key={link.title}
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold tracking-tight transition duration-200 ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/15'
                      }`}
                    >
                      {link.icon}
                      <span>{link.title}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Bottom logout / User Profile */}
            <div className="space-y-4 border-t border-gray-200/80 dark:border-gray-850 pt-4">
              <div className="flex items-center gap-3 px-2">
                <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 flex items-center justify-center font-bold text-sm select-none uppercase">
                  {getInitials(session.user.name)}
                </div>
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{session.user.name}</span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 mt-1 dark:text-emerald-400">
                    {session.user.role}
                  </span>
                </div>
              </div>

              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-655 hover:text-red-750 hover:bg-red-50 dark:hover:bg-red-950/20 transition duration-200"
              >
                <LogOut className="w-5 h-5 shrink-0" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>

          {/* MOBILE SIDEBAR DRAW (Overlay drawer) */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 md:hidden flex">
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-slate-900/35 backdrop-blur-xs transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              ></div>

              {/* Drawer Container */}
              <div className="relative flex flex-col justify-between w-64 max-w-xs bg-slate-50 dark:bg-slate-950 p-6 border-r border-gray-150 dark:border-gray-850 animate-slide-in h-full z-10">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <a href="/dashboard" className="flex items-center gap-2.5">
                      <div className="h-9 w-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-lg">
                        F
                      </div>
                      <span className="font-black text-xl tracking-tight text-gray-900 dark:text-white">
                        FoodBridge
                      </span>
                    </a>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <nav className="space-y-1.5">
                    {filteredLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <a
                          key={link.title}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold tracking-tight transition duration-200 ${
                            isActive
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/15'
                          }`}
                        >
                          {link.icon}
                          <span>{link.title}</span>
                        </a>
                      );
                    })}
                  </nav>
                </div>

                <div className="space-y-4 border-t border-gray-200 dark:border-gray-800 pt-4">
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-655 hover:text-red-750 hover:bg-red-50 dark:hover:bg-red-950/20 transition duration-200"
                  >
                    <LogOut className="w-5 h-5 shrink-0" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Global padding spacing spacer for top navbar */}
          <div className="h-16 w-full"></div>
        </>
      ) : (
        /* MARKETING LANDING NAV (Anonymous) */
        <header className="w-full bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-gray-150/70 dark:border-gray-850 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-extrabold text-lg group-hover:bg-emerald-500 transition duration-300 shadow-sm">
                F
              </div>
              <span className="font-black text-xl tracking-tight text-gray-900 dark:text-white group-hover:text-emerald-600 transition">
                FoodBridge
              </span>
            </a>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowDevLoginDropdown(!showDevLoginDropdown)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition duration-200"
                >
                  Sign In
                </button>

                {showDevLoginDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-150 dark:border-gray-800 py-2.5 z-50">
                    <div className="px-4 py-1.5 border-b border-gray-100 dark:border-gray-800 mb-2">
                      <span className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">Choose sign in</span>
                    </div>
                    {/* Google Login */}
                    <button
                      onClick={handleGoogleLogin}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-250 hover:bg-gray-50 dark:hover:bg-gray-850 flex items-center gap-2.5 transition"
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
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-250 hover:bg-gray-50 dark:hover:bg-gray-850 flex items-center gap-2.5 transition"
                    >
                      <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0"></span>
                      Mock Restaurant (Dev)
                    </button>
                    {/* Mock NGO */}
                    <button
                      onClick={() => handleMockLogin('ngo')}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-250 hover:bg-gray-50 dark:hover:bg-gray-850 flex items-center gap-2.5 transition"
                    >
                      <span className="h-2 w-2 rounded-full bg-teal-500 shrink-0"></span>
                      Mock NGO (Dev)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
