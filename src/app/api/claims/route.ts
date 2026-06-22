import { NextResponse } from 'next/server';
import { createClaim, getClaims } from '../../../lib/services/claim-service';
import { Claim } from '../../../types/claim';

export async function GET() {
  try {
    const claims = await getClaims();
    return NextResponse.json(claims);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const required = ['donationId', 'ngoId'];
    for (const k of required) if (!body[k]) return NextResponse.json({ error: `Missing ${k}` }, { status: 400 });

    const claim: Claim = {
      claimId: crypto.randomUUID(),
      donationId: String(body.donationId),
      ngoId: String(body.ngoId),
      claimedAt: new Date().toISOString(),
    };
    const created = await createClaim(claim);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
