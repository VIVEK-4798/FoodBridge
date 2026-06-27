'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import AnalyticsCard from '../../components/dashboard/AnalyticsCard';
import StatusOverview from '../../components/dashboard/StatusOverview';
import ActivityTimeline from '../../components/dashboard/ActivityTimeline';
import QuickActionCard from '../../components/dashboard/QuickActionCard';
import RecentDonationCard from '../../components/dashboard/RecentDonationCard';
import SkeletonCard from '../../components/dashboard/SkeletonCard';
import SearchBar from '../../components/donations/SearchBar';
import EmptyState from '../../components/ui/EmptyState';
import PageContainer from '../../components/ui/PageContainer';
import Card from '../../components/ui/Card';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/dashboard');
      if (!response.ok) {
        throw new Error('Failed to load dashboard statistics.');
      }
      const resData = await response.json();
      setData(resData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setData(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
      return;
    }
    if (status === 'authenticated') {
      if (!session?.user?.role) {
        router.push('/role-selection');
        return;
      }
      fetchDashboardData();
    }
  }, [status, session, router]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getFormattedDate = () => {
    return new Date().toLocaleDateString([], {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const filteredLatestDonations = useMemo(() => {
    if (!data?.latestDonations) return [];
    if (!searchQuery.trim()) return data.latestDonations;

    const query = searchQuery.toLowerCase();
    return data.latestDonations.filter((d: any) => {
      return (
        d.foodName.toLowerCase().includes(query) ||
        (d.restaurantName || '').toLowerCase().includes(query) ||
        d.pickupAddress.toLowerCase().includes(query)
      );
    });
  }, [data?.latestDonations, searchQuery]);

  if (status === 'loading' || status === 'unauthenticated' || !session?.user?.role) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-between">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <SkeletonCard variant="stat" count={4} />
        </main>
        <Footer />
      </div>
    );
  }

  const role = session.user.role;
  const name = session.user.name || 'User';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-between">
      <Header />
      
      <PageContainer>
        {/* Welcome Section */}
        <Card className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
              {getGreeting()}, <span className="text-blue-650 dark:text-blue-400">{name}</span>
            </h1>
            <p className="text-xs text-gray-400 dark:text-gray-500 font-extrabold uppercase tracking-widest leading-none mt-1 inline-block">
              Role: {role === 'restaurant' ? 'Restaurant Provider' : 'NGO Recipient'}
            </p>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              {getFormattedDate()}
            </span>
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase mt-0.5 tracking-wider">
              FoodBridge Operations Center
            </p>
          </div>
        </Card>

        {error && (
          <div className="p-4 text-sm text-red-750 bg-red-50 dark:bg-red-955/20 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-xl flex items-center justify-between">
            <span>Error: {error}</span>
            <button onClick={fetchDashboardData} className="text-xs font-bold underline hover:no-underline">
              Refresh Dashboard
            </button>
          </div>
        )}

        {/* Dashboard Search */}
        {!error && !loading && (
          <div className="w-full">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search recent listings by food name, restaurant, or pickup address..."
            />
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <div className="space-y-6">
            <SkeletonCard variant="stat" count={4} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
                <SkeletonCard variant="list" count={3} />
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
                <SkeletonCard variant="timeline" count={4} />
              </div>
            </div>
          </div>
        )}

        {/* Live Content */}
        {!loading && !error && data && (
          <>
            {/* Primary Statistics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <AnalyticsCard
                title="Total Donations"
                value={data.stats.totalDonations}
                description="Overall food listings posted"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5-6h7.5m-7.5 3h7.5m-7.5 3h7.5m-.008 5.25h-.007v.008H18v-.008Zm-2.25 0h-.008v.008h.008v-.008Zm-2.25 0h-.007v.008h.007v-.008Zm-.007-2.25h-.008v.008h.008v-.008Zm-.007-2.25H9.75v.008H9.75v-.008Zm-2.25 0H7.5v.008h.008v-.008Zm-.008-2.25h-.007v.008h.007v-.008Zm-.007-2.25H5.25v.008h.008v-.008Z" />
                  </svg>
                }
              />
              <AnalyticsCard
                title="Available Donations"
                value={data.stats.availableDonations}
                description="Listings open to claim"
                className="border-l-4 border-l-emerald-500"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                }
              />
              <AnalyticsCard
                title="Claimed Pickups"
                value={data.stats.claimedDonations}
                description="Currently claimed by NGOs"
                className="border-l-4 border-l-amber-500"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                }
              />
              <AnalyticsCard
                title="Completed Cycles"
                value={data.stats.completedDonations}
                description="Successfully delivered donations"
                className="border-l-4 border-l-gray-400"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                }
              />
            </div>

            {/* Platform Summary Row */}
            <Card className="p-5">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-550 uppercase tracking-widest mb-4">Platform Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="space-y-1">
                  <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{data.stats.totalMeals}</p>
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Meals Shared</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{data.stats.totalNgos}</p>
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Partner NGOs</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{data.stats.totalRestaurants}</p>
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Active Restaurants</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{data.stats.totalClaims}</p>
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Claims Made</p>
                </div>
              </div>
            </Card>

            {/* Split Section Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Recent Listings & Activity Timeline */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Latest Listings */}
                <Card className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                      Recent Surplus Postings
                    </h3>
                    <a
                      href="/donations"
                      className="text-xs font-bold text-blue-600 dark:text-blue-450 hover:underline"
                    >
                      View All Listings
                    </a>
                  </div>
                  
                  {filteredLatestDonations.length === 0 ? (
                    <EmptyState
                      title="No listings matched"
                      description={
                        searchQuery 
                          ? "Try searching for a different keyword." 
                          : "There are no surplus postings listed yet."
                      }
                    />
                  ) : (
                    <div className="space-y-3">
                      {filteredLatestDonations.map((donation: any) => (
                        <RecentDonationCard key={donation.donationId} donation={donation} />
                      ))}
                    </div>
                  )}
                </Card>

                {/* Timeline Events */}
                <Card className="p-5 space-y-4">
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                    Operations Feed
                  </h3>
                  <div className="pt-2">
                    <ActivityTimeline events={data.recentActivity} />
                  </div>
                </Card>

              </div>

              {/* Right Column: Status Summary & Quick Actions */}
              <div className="space-y-6">
                
                {/* Status Progress Summary */}
                <Card className="p-5 space-y-4">
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                    Donations Allocation
                  </h3>
                  <StatusOverview stats={data.stats} />
                </Card>

                {/* Quick Actions */}
                <Card className="p-5 space-y-4">
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                    Operations Controls
                  </h3>
                  <QuickActionCard role={role} />
                </Card>

              </div>
            </div>
          </>
        )}
      </PageContainer>

      <Footer />
    </div>
  );
}
