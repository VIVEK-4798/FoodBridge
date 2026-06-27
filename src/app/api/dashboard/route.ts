import { NextResponse } from 'next/server';
import { getAllDonations } from '../../../lib/services/donation-service';
import { getClaims } from '../../../lib/services/claim-service';
import { getAllUsers } from '../../../lib/services/user-service';

export async function GET() {
  try {
    const [donations, claims, users] = await Promise.all([
      getAllDonations(),
      getClaims(),
      getAllUsers(),
    ]);

    // Create user lookup map
    const userMap: Record<string, { name: string; role: string | null }> = {};
    users.forEach((u) => {
      userMap[u.id] = { name: u.name, role: u.role };
    });

    // 1. Calculate stats
    const totalDonations = donations.length;
    const availableDonations = donations.filter((d) => d.status === 'AVAILABLE').length;
    const claimedDonations = donations.filter((d) => d.status === 'CLAIMED').length;
    const pickedUpDonations = donations.filter((d) => d.status === 'PICKED_UP').length;
    const completedDonations = donations.filter((d) => d.status === 'COMPLETED').length;
    const totalClaims = claims.length;

    const totalMeals = donations.reduce((acc, curr) => acc + (curr.quantity || 0), 0);
    const totalNgos = users.filter((u) => u.role === 'ngo').length;
    const totalRestaurants = users.filter((u) => u.role === 'restaurant').length;

    // 2. Generate latest donations (top 5 newest)
    const sortedDonations = [...donations].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const latestDonations = sortedDonations.slice(0, 5).map((d) => ({
      ...d,
      restaurantName: userMap[d.restaurantId]?.name || 'Partner Restaurant',
    }));

    // 3. Generate dynamic timeline events
    const timelineEvents: {
      id: string;
      type: 'donation_created' | 'donation_claimed' | 'donation_picked_up' | 'donation_completed';
      title: string;
      description: string;
      timestamp: string;
    }[] = [];

    // Create donation lookup for claims
    const donationMap = new Map(donations.map((d) => [d.donationId, d]));

    // Add Donation Created events
    donations.forEach((d) => {
      const restName = userMap[d.restaurantId]?.name || 'A partner restaurant';
      timelineEvents.push({
        id: `created-${d.donationId}`,
        type: 'donation_created',
        title: 'Food Donation Listed',
        description: `${d.foodName} (${d.quantity} meals) was listed by ${restName}`,
        timestamp: d.createdAt,
      });

      // Add status advancement events if they occurred
      if (d.status === 'PICKED_UP') {
        timelineEvents.push({
          id: `picked-${d.donationId}`,
          type: 'donation_picked_up',
          title: 'Meals Picked Up',
          description: `${d.foodName} has been picked up from ${restName}`,
          // Since we don't have transition logs, we use createdAt + 1 min as a fallback for sorting
          timestamp: new Date(new Date(d.createdAt).getTime() + 60000).toISOString(),
        });
      }

      if (d.status === 'COMPLETED') {
        timelineEvents.push({
          id: `completed-${d.donationId}`,
          type: 'donation_completed',
          title: 'Donation Completed',
          description: `${d.foodName} donation cycle from ${restName} is complete`,
          // Fallback timestamp for sorting
          timestamp: new Date(new Date(d.createdAt).getTime() + 120000).toISOString(),
        });
      }
    });

    // Add Donation Claimed events
    claims.forEach((c) => {
      const ngoName = userMap[c.ngoId]?.name || 'A shelter';
      const donationObj = donationMap.get(c.donationId);
      const foodName = donationObj ? donationObj.foodName : 'surplus meals';
      timelineEvents.push({
        id: `claimed-${c.claimId}`,
        type: 'donation_claimed',
        title: 'Donation Claimed',
        description: `${ngoName} claimed ${foodName}`,
        timestamp: c.claimedAt,
      });
    });

    // Sort all timeline events by timestamp descending
    const recentActivity = timelineEvents
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);

    return NextResponse.json({
      stats: {
        totalDonations,
        availableDonations,
        claimedDonations,
        pickedUpDonations,
        completedDonations,
        totalClaims,
        totalMeals,
        totalNgos,
        totalRestaurants,
      },
      recentActivity,
      latestDonations,
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
