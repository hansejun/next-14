import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  // do something with email and password

  return NextResponse.json({ ok: true });
}
