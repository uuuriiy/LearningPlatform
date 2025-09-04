import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// Query Keys
export const queryKeys = {
  courses: ['courses'] as const,
  coursesList: (filters?: { limit?: number; skip?: number }) => 
    [...queryKeys.courses, 'list', filters] as const,
  courseBySlug: (slug: string) => 
    [...queryKeys.courses, 'detail', slug] as const,
  courseDifficulties: ['courses', 'difficulties'] as const,
  coursesByDifficulty: (difficulty: string, options?: { limit?: number; skip?: number }) =>
    [...queryKeys.courses, 'difficulty', difficulty, options] as const,
  searchCourses: (query: string, options?: { limit?: number; skip?: number }) =>
    ['courses', 'search', query, options] as const,
  
  lessons: ['lessons'] as const,
  lessonBySlug: (slug: string) => 
    [...queryKeys.lessons, 'detail', slug] as const,
  courseLessons: (courseId: string, options?: { limit?: number; skip?: number }) =>
    [...queryKeys.lessons, 'course', courseId, options] as const,
    
  quizzes: ['quizzes'] as const,
  quizById: (id: string) => 
    [...queryKeys.quizzes, 'detail', id] as const,
} as const;
