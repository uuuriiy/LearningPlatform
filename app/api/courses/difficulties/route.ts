import { NextResponse } from 'next/server';
import { contentfulApi } from '@/lib/contentful';

export async function GET() {
  try {
    // Debug: Log environment variables
    console.log('Difficulties API - Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID ? 'SET' : 'MISSING',
      CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN ? 'SET' : 'MISSING',
      CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT || 'master'
    });

    const difficulties = await contentfulApi.getDifficulties();
    console.log('Difficulties result:', difficulties);
    return NextResponse.json(difficulties);
  } catch (error) {
    console.error('Difficulties API Error Details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      error
    });
    return NextResponse.json(
      { 
        error: 'Failed to fetch difficulties',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
