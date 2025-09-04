'use client';

import { useState, useEffect } from 'react';

interface CourseFiltersProps {
  categories: string[];
  selectedCategory: string;
  selectedDifficulty: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export function CourseFilters({
  categories,
  selectedCategory,
  selectedDifficulty,
  searchQuery,
  onCategoryChange,
  onDifficultyChange,
  onSearchChange,
  onClearFilters,
}: CourseFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const hasActiveFilters = selectedCategory !== 'All' || selectedDifficulty !== 'All' || searchQuery.trim() !== '';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="flex items-center justify-between w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span>Filters</span>
          <svg
            className={`w-4 h-4 transform transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filters */}
      <div className={`${isFiltersOpen ? 'block' : 'hidden'} md:block`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="block w-full px-5 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => onDifficultyChange(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'All' ? 'All Levels' : difficulty}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="w-full md:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                {selectedCategory}
                <button
                  onClick={() => onCategoryChange('All')}
                  className="ml-2 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            )}
            {selectedDifficulty !== 'All' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                {selectedDifficulty}
                <button
                  onClick={() => onDifficultyChange('All')}
                  className="ml-2 hover:text-green-600"
                >
                  ×
                </button>
              </span>
            )}
            {searchQuery.trim() !== '' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                "{searchQuery}"
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-2 hover:text-purple-600"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
