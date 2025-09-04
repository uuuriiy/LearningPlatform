'use client';

import * as React from 'react';
import { CourseFilters } from './CourseFilters';
import { CourseCard } from './CourseCard';
import { CourseNotFound } from './CourseNotFound';
import { useCoursesFilter } from '@/hooks/useCoursesFilter';
import { CourseError } from './CourseError';
import { CourseGridSkeleton } from './CourseCardSkeleton';

export const CourseMainContent = () => {
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
    <>
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
    </>
  )
}
