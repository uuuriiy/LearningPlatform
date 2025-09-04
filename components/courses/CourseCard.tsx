import Link from 'next/link';
import Image from 'next/image';
import type { Course } from '@/lib/contentful';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  // Extract lesson count from linkedFrom structure
  const lessonCount = course.linkedFrom?.lessonCollection?.items?.length || 0;
  
  // Extract description text from rich text JSON
  const getDescriptionText = (description: Course['description']) => {
    try {
      const firstParagraph = description?.json?.content?.[0];
      const firstTextNode = firstParagraph?.content?.[0];
      return firstTextNode?.value || 'No description available';
    } catch {
      return 'No description available';
    }
  };

  const imageUrl = course.image?.url 
    ? `${course.image.url}`
    : '/images/course-placeholder.svg';

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Generate random pricing for demonstration
  const getRandomPrice = () => {
    const prices = ['Free', '$29', '$49', '$79', '$99', '$129'];
    return prices[Math.floor(Math.random() * prices.length)];
  };
  
  const price = getRandomPrice();
  const isFree = price === 'Free';
  const isPremium = !isFree && Math.random() > 0.6;

  return (
    <Link 
      href={`/courses/${course.slug}`}
      className="group block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={course.courseTitle}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        
        {/* Price Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            isFree 
              ? 'bg-green-500 text-white' 
              : isPremium 
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
          }`}>
            {isFree ? 'Free' : isPremium ? 'Premium' : price}
          </span>
        </div>
        
        {/* Difficulty Badge */}
        {course.difficulty && (
          <div className="absolute top-3 right-3">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
              {course.difficulty}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-4 line-clamp-2 leading-tight">
          {course.courseTitle}
        </h3>
        
        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
          {getDescriptionText(course.description)}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {lessonCount} lesson{lessonCount !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {Math.floor(Math.random() * 10) + 2}h
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs text-gray-600 font-medium">
              {(4.0 + Math.random()).toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
