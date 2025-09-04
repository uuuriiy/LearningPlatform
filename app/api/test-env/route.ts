import { NextResponse } from 'next/server';
import { hasContentfulConfig } from '@/lib/contentful/client';

export async function GET() {
  try {
    const envStatus = {
      NODE_ENV: process.env.NODE_ENV,
      CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID ? 'SET' : 'MISSING',
      CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN ? 'SET' : 'MISSING',
      CONTENTFUL_PREVIEW_ACCESS_TOKEN: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN ? 'SET' : 'MISSING',
      CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT || 'master',
      hasContentfulConfig,
      timestamp: new Date().toISOString()
    };

    console.log('Environment status:', envStatus);
    return NextResponse.json(envStatus);
  } catch (error) {
    console.error('Test env error:', error);
    return NextResponse.json({
      error: 'Failed to check environment',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
