import { NextResponse } from 'next/server';
import { contentfulApi } from '@/lib/contentful';

export async function GET() {
  try {
    const difficulties = await contentfulApi.getDifficulties();
    return NextResponse.json(difficulties);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch difficulties' },
      { status: 500 }
    );
  }
}
