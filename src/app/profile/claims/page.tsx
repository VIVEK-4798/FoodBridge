'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import ClaimHistoryCard from '../../../components/donations/ClaimHistoryCard';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import EmptyState from '../../../components/ui/EmptyState';
import PageContainer from '../../../components/ui/PageContainer';
import SectionHeader from '../../../components/ui/SectionHeader';
import Card from '../../../components/ui/Card';
import { Claim } from '../../../types/claim';
import { Donation } from '../../../types/donation';
import { ClipboardCheck } from 'lucide-react';

export default function MyClaimsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [claims, setClaims] = useState<Claim[]>([]);
  const [donations, setDonations] = useState<Record<string, Donation & { restaurantName?: string; restaurantEmail?: string }>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const claimsRes = await fetch('/api/claims');
      if (!claimsRes.ok) throw new Error('Failed to fetch claims.');
      const claimsData: Claim[] = await claimsRes.json();

      const donationsRes = await fetch('/api/donations');
      if (!donationsRes.ok) throw new Error('Failed to fetch donation details.');
      const donationsData: (Donation & { restaurantName?: string; restaurantEmail?: string })[] = await donationsRes.json();

      const donationsMap: Record<string, Donation & { restaurantName?: string; restaurantEmail?: string }> = {};
      donationsData.forEach((d) => {
        donationsMap[d.donationId] = d;
      });

      const myClaims = claimsData.filter((c) => c.ngoId === session?.user?.id);
      myClaims.sort((a, b) => new Date(b.claimedAt).getTime() - new Date(a.claimedAt).getTime());

      setClaims(myClaims);
      setDonations(donationsMap);
    } catch (err) {
      setError((err as Error).message || 'An error occurred while loading claims.');
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
      if (session?.user?.role !== 'ngo') {
        router.push('/dashboard');
        return;
      }
      fetchData();
    }
  }, [status, session, router]);

  if (status === 'loading' || status === 'unauthenticated' || session?.user?.role !== 'ngo') {
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

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#1A1F2B] flex flex-col justify-between">
      <Header />
      
      <PageContainer className="max-w-5xl">
        <SectionHeader
          title="My Claimed Donations"
          description="Track and coordinate pickups for food donations you have claimed."
        />

        {/* Summary Metric Card */}
        {!loading && !error && claims.length > 0 && (
          <Card className="p-6 bg-white rounded-2xl border border-gray-100 shadow-md mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FFF4E6] rounded-2xl text-[#F5A623] shadow-sm">
                  <ClipboardCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Total Active Claims</p>
                  <p className="text-3xl font-black text-[#F5A623]">{claims.length}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-gray-400 bg-[#F8F9FC] px-3 py-1 rounded-full border border-gray-100">
                Active NGO Partner
              </span>
            </div>
          </Card>
        )}

        {error && (
          <div className="p-4 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-between shadow-sm mb-6">
            <span>{error}</span>
            <button onClick={fetchData} className="text-xs font-extrabold text-[#F5A623] underline hover:no-underline">
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : claims.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-gray-100 shadow-md">
            <EmptyState
              title="No claims yet"
              description="You haven't claimed any surplus food donations. Browse the listings to claim safe, delicious food for your organization."
              actionLabel="Browse Available Donations"
              actionHref="/donations"
            />
          </div>
        ) : (
          <div className="space-y-4">
            {claims.map((claim) => (
              <ClaimHistoryCard
                key={claim.claimId}
                claim={claim}
                donation={donations[claim.donationId]}
              />
            ))}
          </div>
        )}
      </PageContainer>

      <Footer />
    </div>
  );
}