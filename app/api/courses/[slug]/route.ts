import { NextRequest, NextResponse } from 'next/server';
import { contentfulApi } from '@/lib/contentful';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const course = await contentfulApi.getCourseBySlug(params.slug);
    
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}
