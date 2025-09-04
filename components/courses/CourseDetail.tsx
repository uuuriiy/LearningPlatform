import { useCourseBySlug } from '@/hooks/useContentful';
import Image from 'next/image';

interface CourseDetailProps {
  slug: string;
}

export function CourseDetail({ slug }: CourseDetailProps) {
  const {
    data: course,
    isLoading,
    error,
    refetch,
  } = useCourseBySlug(slug);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg mb-6" />
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-red-900 mb-2">Error Loading Course</h2>
          <p className="text-red-700 mb-4">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Course Not Found</h2>
        <p className="text-gray-600 mt-2">The course you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  // Extract description text from rich text JSON
  const getDescriptionText = (description: typeof course.description) => {
    try {
      const firstParagraph = description?.json?.content?.[0];
      const firstTextNode = firstParagraph?.content?.[0];
      return firstTextNode?.value || 'No description available';
    } catch {
      return 'No description available';
    }
  };

  const lessonCount = course.linkedFrom?.lessonCollection?.items?.length || 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Course Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {course.image && (
          <div className="relative h-64 w-full">
            <Image
              src={course.image.url}
              alt={course.courseTitle}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {course.difficulty}
            </span>
            <span className="text-sm text-gray-500">
              {lessonCount} lesson{lessonCount !== 1 ? 's' : ''}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {course.courseTitle}
          </h1>
          
          <p className="text-gray-600 text-lg leading-relaxed">
            {getDescriptionText(course.description)}
          </p>
        </div>
      </div>

      {/* Course Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Ready to start learning?
            </h2>
            <p className="text-gray-600">
              Join thousands of students already enrolled in this course.
            </p>
          </div>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Start Course
          </button>
        </div>
      </div>
    </div>
  );
}
