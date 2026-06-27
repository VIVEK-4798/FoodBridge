'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import SectionHeader from '../../../components/ui/SectionHeader';
import PageContainer from '../../../components/ui/PageContainer';
import Toast from '../../../components/ui/Toast';

export default function CreateDonationPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    foodName: '',
    quantity: '',
    pickupAddress: '',
    availableUntil: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated' && session?.user?.role !== 'restaurant') {
      router.push('/dashboard');
    }
  }, [status, session, router]);

  if (status === 'loading' || status === 'unauthenticated' || session?.user?.role !== 'restaurant') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-between">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </main>
        <Footer />
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.foodName || !form.quantity || !form.pickupAddress || !form.availableUntil) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantId: session.user.id,
          foodName: form.foodName,
          quantity: Number(form.quantity),
          pickupAddress: form.pickupAddress,
          availableUntil: new Date(form.availableUntil).toISOString(),
          description: form.description,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create donation listing.');
      }

      setShowToast(true);
      setForm({
        foodName: '',
        quantity: '',
        pickupAddress: '',
        availableUntil: '',
        description: '',
      });
      
      // Navigate to listings after delay
      setTimeout(() => {
        router.push('/donations');
      }, 1500);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-between">
      <Header />
      
      <PageContainer className="max-w-xl">
        <SectionHeader
          title="Create Food Donation"
          description="Fill out the details below to share your restaurant's surplus food with local shelters."
        />

        <Card className="p-6 md:p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            {error && (
              <div className="p-3 text-sm text-red-800 bg-red-50 dark:bg-red-950/20 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-900/50">
                {error}
              </div>
            )}

            <Input
              label="Food Name *"
              placeholder="e.g. 20 Boxed Lunches (Chicken & Veg)"
              value={form.foodName}
              onChange={(e) => setForm({ ...form, foodName: e.target.value })}
              required
              disabled={loading}
            />

            <Input
              label="Quantity (meals) *"
              type="number"
              min="1"
              placeholder="e.g. 20"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              required
              disabled={loading}
            />

            <Input
              label="Pickup Address *"
              placeholder="e.g. 123 Main Street, Suite 4B"
              value={form.pickupAddress}
              onChange={(e) => setForm({ ...form, pickupAddress: e.target.value })}
              required
              disabled={loading}
            />

            <Input
              label="Available Until *"
              type="datetime-local"
              value={form.availableUntil}
              onChange={(e) => setForm({ ...form, availableUntil: e.target.value })}
              required
              disabled={loading}
            />

            <Input
              label="Notes / Description"
              isTextArea
              placeholder="List ingredients, allergen details, packaging details, etc."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              disabled={loading}
            />

            <div className="pt-2">
              <Button
                type="submit"
                loading={loading}
                className="w-full py-3"
              >
                Submit Donation
              </Button>
            </div>
          </form>
        </Card>
      </PageContainer>

      {showToast && (
        <Toast
          message="Donation listed successfully! Redirecting..."
          onClose={() => setShowToast(false)}
        />
      )}

      <Footer />
    </div>
  );
}
