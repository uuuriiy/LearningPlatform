import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    NODE_ENV: process.env.NODE_ENV,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID ? 'SET' : 'MISSING',
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN ? 'SET' : 'MISSING',
    CONTENTFUL_PREVIEW_ACCESS_TOKEN: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN ? 'SET' : 'MISSING',
    CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT || 'master',
    timestamp: new Date().toISOString()
  });
}
