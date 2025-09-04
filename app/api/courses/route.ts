import { NextRequest, NextResponse } from 'next/server';
import { contentfulApi } from '@/lib/contentful';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = parseInt(searchParams.get('skip') || '0');
    const difficulty = searchParams.get('difficulty') || undefined;
    const search = searchParams.get('search') || undefined;

    let result;
    
    if (search) {
      result = await contentfulApi.searchCourses(search, { limit, skip });
    } else if (difficulty && difficulty !== 'All') {
      result = await contentfulApi.getCoursesByDifficulty(difficulty, { limit, skip });
    } else {
      result = await contentfulApi.getCourses({ limit, skip });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
