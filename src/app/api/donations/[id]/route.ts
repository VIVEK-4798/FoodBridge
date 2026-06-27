import { NextResponse } from 'next/server';
import { getDonationById, updateDonationStatus } from '../../../../lib/services/donation-service';

import { getUserById } from '../../../../lib/services/user-service';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const donation = await getDonationById(id);
    if (!donation) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
    let restaurantName = 'Partner Restaurant';
    let restaurantEmail = '';
    try {
      const restaurant = await getUserById(donation.restaurantId);
      if (restaurant) {
        restaurantName = restaurant.name;
        restaurantEmail = restaurant.email;
      }
    } catch {}

    return NextResponse.json({
      ...donation,
      restaurantName,
      restaurantEmail,
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;
    if (!status) return NextResponse.json({ error: 'Missing status' }, { status: 400 });

    await updateDonationStatus(id, status);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
