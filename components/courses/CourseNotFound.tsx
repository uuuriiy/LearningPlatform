import * as React from 'react';

export const CourseNotFound = ({ handleClearFilters }: { handleClearFilters: () => void }) => {
  return (
    <div className="text-center py-20">
        <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.44-.956-5.982-2.5M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0112 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.875a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z" />
            </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">No courses found</h3>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Try adjusting your filters or search terms to discover more courses.
        </p>
        <button
            onClick={handleClearFilters}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
            Clear All Filters
        </button>
    </div>
  )
}
