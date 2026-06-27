import { NextResponse } from 'next/server';
import { getAllDonations, createDonation } from '../../../lib/services/donation-service';
import { Donation } from '../../../types/donation';

import { getUserById } from '../../../lib/services/user-service';

export async function GET() {
  try {
    const donations = await getAllDonations();
    const resolved = await Promise.all(
      donations.map(async (d) => {
        try {
          const restaurant = await getUserById(d.restaurantId);
          return {
            ...d,
            restaurantName: restaurant ? restaurant.name : 'Partner Restaurant',
          };
        } catch {
          return { ...d, restaurantName: 'Partner Restaurant' };
        }
      })
    );
    return NextResponse.json(resolved);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Basic validation
    const required = ['restaurantId', 'foodName', 'quantity', 'pickupAddress', 'availableUntil'];
    for (const key of required) {
      if (!body[key]) {
        return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 });
      }
    }

    const donation: Donation = {
      donationId: crypto.randomUUID(),
      restaurantId: String(body.restaurantId),
      foodName: String(body.foodName),
      quantity: Number(body.quantity),
      description: body.description || '',
      pickupAddress: String(body.pickupAddress),
      availableUntil: String(body.availableUntil),
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
    };

    const created = await createDonation(donation);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
