import { NextRequest, NextResponse } from 'next/server';
import { contentfulApi } from '@/lib/contentful';

export async function GET(request: NextRequest) {
  try {
    // Debug: Log environment variables
    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID ? 'SET' : 'MISSING',
      CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN ? 'SET' : 'MISSING',
      CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT || 'master'
    });

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = parseInt(searchParams.get('skip') || '0');
    const difficulty = searchParams.get('difficulty') || undefined;
    const search = searchParams.get('search') || undefined;

    console.log('API request params:', { limit, skip, difficulty, search });

    let result;
    
    if (search) {
      result = await contentfulApi.searchCourses(search, { limit, skip });
    } else if (difficulty && difficulty !== 'All') {
      result = await contentfulApi.getCoursesByDifficulty(difficulty, { limit, skip });
    } else {
      result = await contentfulApi.getCourses({ limit, skip });
    }

    console.log('API result:', result ? 'SUCCESS' : 'NO DATA');
    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error Details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      error
    });
    return NextResponse.json(
      { 
        error: 'Failed to fetch courses',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
