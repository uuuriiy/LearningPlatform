'use client';

import { CourseCard } from '@/components/courses/CourseCard';
import { CourseFilters } from '@/components/courses/CourseFilters';
import { CourseGridSkeleton } from '@/components/courses/CourseCardSkeleton';
import { useCoursesFilter } from '@/hooks/useCoursesFilter';
import { CourseError } from '@/components/courses/CourseError';
import { CourseNotFound } from '@/components/courses/CourseNotFound';

export default function CoursesPage() {
    const { 
        courses,
        selectedCategory, selectedDifficulty, 
        searchQuery, filteredCourses, categories, 
        loading, error, handleCategoryChange, 
        handleDifficultyChange, handleSearchChange, 
        handleClearFilters 
    } = useCoursesFilter();

    if (error) return <CourseError error={error} />

    if (loading) return <CourseGridSkeleton count={6} />

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Explore Our Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover a wide range of courses designed to help you learn new skills and advance your career.
            Filter by category, difficulty level, or search for specific topics.
          </p>
        </section>

        <section className="mb-8">
          <CourseFilters
            categories={categories}
            selectedCategory={selectedCategory}
            selectedDifficulty={selectedDifficulty}
            searchQuery={searchQuery}
            onCategoryChange={handleCategoryChange}
            onDifficultyChange={handleDifficultyChange}
            onSearchChange={handleSearchChange}
            onClearFilters={handleClearFilters}
          />
        </section>

        <section>
          {!loading && (
            <div className="mb-8 flex justify-between items-center">
              <p className="text-gray-600 text-lg">
                Showing <span className="font-semibold text-gray-900">{filteredCourses.length}</span> of <span className="font-semibold text-gray-900">{courses.length}</span> courses
              </p>
            </div>
          )}

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard key={course.sys.id} course={course} />
              ))}
            </div>
          ) : (
            <CourseNotFound handleClearFilters={handleClearFilters} />
          )}
        </section>
    </main>
  );
}
