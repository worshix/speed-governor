export async function GET() {
  try {
    const logs = await prisma.log.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    return NextResponse.json(logs);
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { latitude, longitude, speed } = await req.json();
    if (
      typeof latitude !== 'number' ||
      typeof longitude !== 'number' ||
      typeof speed !== 'number'
    ) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    // Save as km/hr
    const log = await prisma.log.create({
      data: {
        latitude,
        longitude,
        speed, // already in km/hr
      },
    });
    return NextResponse.json(log);
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
