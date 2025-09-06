import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendSpeedAlert } from '@/lib/sendSpeedAlert';

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

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { latitude, longitude, speed, emailTo, emailFrom } = await req.json();
    if (
      typeof latitude !== 'number' ||
      typeof longitude !== 'number' ||
      typeof speed !== 'number'
    ) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    // Reverse geocode location name
    let locationName = '';
    try {
      const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const geoData = await geoRes.json();
      locationName = geoData.display_name || '';
    } catch {}

    // Save as m/s
    const log = await prisma.log.create({
      data: {
        latitude,
        longitude,
        speed, // already in m/s
      },
    });

    // Always send log to sender (user)
    if (emailFrom) {
      await sendSpeedAlert({
        speed,
        latitude,
        longitude,
        to: emailFrom,
        from: emailFrom,
      });
    }

    // Send alert to recipient only if speed is over limit
    const SPEED_LIMIT = 30;
    if (speed > SPEED_LIMIT && emailTo) {
      await sendSpeedAlert({
        speed,
        latitude,
        longitude,
        to: emailTo,
        from: emailFrom || emailTo,
      });
    }

    return NextResponse.json({ ...log, locationName });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
