'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import DonationCard from '../../components/donations/DonationCard';
import SearchBar from '../../components/donations/SearchBar';
import FilterDropdown from '../../components/donations/FilterDropdown';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import PageContainer from '../../components/ui/PageContainer';
import SectionHeader from '../../components/ui/SectionHeader';
import { Donation } from '../../types/donation';
import { Plus } from 'lucide-react';

export default function DonationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [donations, setDonations] = useState<(Donation & { restaurantName?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [availability, setAvailability] = useState<'all' | 'today' | 'tomorrow'>('all');
  const [minQuantity, setMinQuantity] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'quantity_desc' | 'quantity_asc'>('newest');

  const fetchDonations = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/donations');
      if (!response.ok) {
        throw new Error('Failed to fetch donations.');
      }
      const data = await response.json();
      setDonations(data);
    } catch (err) {
      setError((err as Error).message || 'An error occurred while fetching data.');
    } finally {
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
      fetchDonations();
    }
  }, [status, session, router]);

  if (status === 'loading' || status === 'unauthenticated' || !session?.user?.role) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex flex-col justify-between">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </main>
        <Footer />
      </div>
    );
  }

  const role = session.user.role;
  const userId = session.user.id;

  const roleFilteredDonations = donations.filter((d) => {
    if (role === 'restaurant') {
      return d.restaurantId === userId;
    } else {
      return d.status === 'AVAILABLE';
    }
  });

  const processedDonations = roleFilteredDonations
    .filter((d) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesFood = d.foodName.toLowerCase().includes(query);
        const matchesAddress = d.pickupAddress.toLowerCase().includes(query);
        const matchesDesc = (d.description || '').toLowerCase().includes(query);
        if (!matchesFood && !matchesAddress && !matchesDesc) return false;
      }

      // 2. Availability Date
      if (availability !== 'all') {
        const expiryDate = new Date(d.availableUntil);
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        const isSameDay = (d1: Date, d2: Date) =>
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate();

        if (availability === 'today' && !isSameDay(expiryDate, today)) return false;
        if (availability === 'tomorrow' && !isSameDay(expiryDate, tomorrow)) return false;
      }

      // 3. Min Quantity
      if (minQuantity > 0 && d.quantity < minQuantity) return false;

      return true;
    })
    .sort((a, b) => {
      // 4. Sorting
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === 'quantity_desc') {
        return b.quantity - a.quantity;
      }
      if (sortBy === 'quantity_asc') {
        return a.quantity - b.quantity;
      }
      return 0;
    });

  const headerAction = role === 'restaurant' ? (
    <a
      href="/donations/new"
      className="inline-flex items-center justify-center px-6 py-3 text-sm font-extrabold text-white bg-[#F5A623] hover:bg-[#e0961a] rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
    >
      <Plus className="w-4 h-4 mr-2" />
      Create Donation
    </a>
  ) : undefined;

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#1A1F2B] flex flex-col justify-between">
      <Header />
      
      <PageContainer>
        <SectionHeader
          title={role === 'restaurant' ? 'My Donations' : 'Available Donations'}
          description={
            role === 'restaurant'
              ? 'Manage your posted surplus food donations and track status.'
              : 'Browse surplus food from partner restaurants and claim for your NGO.'
          }
          action={headerAction}
        />

        {error && (
          <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-between shadow-sm">
            <span className="font-medium">{error}</span>
            <button onClick={fetchDonations} className="text-xs font-extrabold text-[#F5A623] underline hover:no-underline">
              Retry
            </button>
          </div>
        )}

        {!error && !loading && (
          <div className="space-y-5">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            {role === 'ngo' && (
              <FilterDropdown
                availability={availability}
                onAvailabilityChange={setAvailability}
                minQuantity={minQuantity}
                onMinQuantityChange={setMinQuantity}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            )}
          </div>
        )}

        {loading ? (
          <div className="py-12">
            <LoadingSpinner />
          </div>
        ) : processedDonations.length === 0 ? (
          <div className="py-8">
            {searchQuery || availability !== 'all' || minQuantity > 0 ? (
              <EmptyState
                title="No search results"
                description="Try adjusting your filters or search keywords to find other available donations."
                actionLabel="Reset Filters"
                onAction={() => {
                  setSearchQuery('');
                  setAvailability('all');
                  setMinQuantity(0);
                  setSortBy('newest');
                }}
              />
            ) : role === 'restaurant' ? (
              <EmptyState
                title="No donations created yet"
                description="Start posting your surplus meals to connect with local shelters and NGOs."
                actionLabel="Create Donation"
                actionHref="/donations/new"
              />
            ) : (
              <EmptyState
                title="No donations available"
                description="There are currently no active surplus food listings. Please check back later!"
              />
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedDonations.map((donation) => (
              <DonationCard
                key={donation.donationId}
                donation={donation}
                userRole={role}
                ngoId={userId}
                onClaimSuccess={fetchDonations}
              />
            ))}
          </div>
        )}
      </PageContainer>

      <Footer />
    </div>
  );
}