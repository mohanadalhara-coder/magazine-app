import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  
  if (!key) return NextResponse.json({ error: 'Key required' }, { status: 400 });

  const setting = await prisma.siteSetting.findUnique({
    where: { key }
  });

  return NextResponse.json(setting || { value: '' });
}
