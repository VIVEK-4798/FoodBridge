import { NextResponse } from 'next/server';
import { getDonationById, updateDonationStatus } from '../../../../lib/services/donation-service';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const donation = await getDonationById(params.id);
    if (!donation) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(donation);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { status } = body;
    if (!status) return NextResponse.json({ error: 'Missing status' }, { status: 400 });

    await updateDonationStatus(params.id, status);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
