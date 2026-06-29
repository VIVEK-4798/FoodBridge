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
import { LayoutDashboard, ShoppingBag, ClipboardCheck, CheckCircle2 } from 'lucide-react';

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
      <div className="min-h-screen bg-[#F8F9FC] flex flex-col justify-between">
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
    <div className="min-h-screen bg-[#F8F9FC] text-[#1A1F2B] flex flex-col justify-between">
      <Header />
      
      <PageContainer>
        {/* Welcome Section - Clean White Card */}
        <Card className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-[#1A1F2B] leading-tight">
              {getGreeting()}, <span className="text-[#F5A623]">{name}</span>
            </h1>
            <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest leading-none mt-1.5 inline-block bg-[#FFF4E6] px-3 py-1 rounded-full text-[#F5A623] border border-[#F5A623]/20">
              Role: {role === 'restaurant' ? 'Restaurant Provider' : 'NGO Recipient'}
            </p>
          </div>
          <div className="text-left sm:text-right shrink-0 bg-[#F8F9FC] p-3 rounded-2xl border border-gray-100">
            <span className="text-sm font-semibold text-[#1A1F2B] block">
              {getFormattedDate()}
            </span>
            <p className="text-[10px] font-bold text-gray-400 uppercase mt-1 tracking-wider">
              Operations Center
            </p>
          </div>
        </Card>

        {error && (
          <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-between shadow-sm">
            <span className="font-medium">Error: {error}</span>
            <button onClick={fetchDashboardData} className="text-xs font-extrabold bg-white px-4 py-2 rounded-xl shadow-sm hover:shadow transition">
              Refresh Dashboard
            </button>
          </div>
        )}

        {/* Dashboard Search - Rounded and Clean */}
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
                <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                <SkeletonCard variant="list" count={3} />
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                <SkeletonCard variant="timeline" count={4} />
              </div>
            </div>
          </div>
        )}

        {/* Live Content */}
        {!loading && !error && data && (
          <>
            {/* Primary Statistics Row - Colored Top Borders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <AnalyticsCard
                title="Total Donations"
                value={data.stats.totalDonations}
                description="Overall food listings posted"
                icon={<LayoutDashboard className="w-5 h-5" />}
                className="border-t-4 border-t-[#F5A623]"
              />
              <AnalyticsCard
                title="Available Donations"
                value={data.stats.availableDonations}
                description="Listings open to claim"
                className="border-t-4 border-t-[#F5A623]"
                icon={<ShoppingBag className="w-5 h-5" />}
              />
              <AnalyticsCard
                title="Claimed Pickups"
                value={data.stats.claimedDonations}
                description="Currently claimed by NGOs"
                className="border-t-4 border-t-[#F5A623]"
                icon={<ClipboardCheck className="w-5 h-5" />}
              />
              <AnalyticsCard
                title="Completed Cycles"
                value={data.stats.completedDonations}
                description="Successfully delivered donations"
                className="border-t-4 border-t-[#F5A623]"
                icon={<CheckCircle2 className="w-5 h-5" />}
              />
            </div>

            {/* Platform Summary Row */}
            <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-5">Platform Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="space-y-1">
                  <p className="text-4xl font-black text-[#1A1F2B] tracking-tight">{data.stats.totalMeals}</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Meals Shared</p>
                </div>
                <div className="space-y-1">
                  <p className="text-4xl font-black text-[#1A1F2B] tracking-tight">{data.stats.totalNgos}</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Partner NGOs</p>
                </div>
                <div className="space-y-1">
                  <p className="text-4xl font-black text-[#1A1F2B] tracking-tight">{data.stats.totalRestaurants}</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Active Restaurants</p>
                </div>
                <div className="space-y-1">
                  <p className="text-4xl font-black text-[#1A1F2B] tracking-tight">{data.stats.totalClaims}</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Claims Made</p>
                </div>
              </div>
            </Card>

            {/* Split Section Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Recent Listings & Activity Timeline */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Latest Listings */}
                <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-extrabold text-[#1A1F2B]">
                      Recent Surplus Postings
                    </h3>
                    <a
                      href="/donations"
                      className="text-xs font-extrabold text-[#F5A623] hover:underline bg-[#FFF4E6] px-4 py-2 rounded-xl transition-colors"
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
                    <div className="space-y-4">
                      {filteredLatestDonations.map((donation: any) => (
                        <RecentDonationCard key={donation.donationId} donation={donation} />
                      ))}
                    </div>
                  )}
                </Card>

                {/* Timeline Events */}
                <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-5">
                  <h3 className="text-xl font-extrabold text-[#1A1F2B]">
                    Operations Feed
                  </h3>
                  <div className="pt-1">
                    <ActivityTimeline events={data.recentActivity} />
                  </div>
                </Card>

              </div>

              {/* Right Column: Status Summary & Quick Actions */}
              <div className="space-y-6">
                
                {/* Status Progress Summary */}
                <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-5">
                  <h3 className="text-xl font-extrabold text-[#1A1F2B]">
                    Donations Allocation
                  </h3>
                  <StatusOverview stats={data.stats} />
                </Card>

                {/* Quick Actions */}
                <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-5">
                  <h3 className="text-xl font-extrabold text-[#1A1F2B]">
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