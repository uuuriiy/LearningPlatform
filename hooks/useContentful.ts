import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { contentfulApi } from '@/lib/contentful';
import { queryKeys } from '@/lib/react-query';
import type { Course, Lesson, Quiz, ContentfulFilter } from '@/lib/contentful';

// Courses Hooks
export function useCourses(
  options: ContentfulFilter = {},
  queryOptions?: Omit<UseQueryOptions<{ courses: Course[]; total: number }>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.coursesList(options),
    queryFn: () => contentfulApi.getCourses(options),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...queryOptions,
  });
}

export function useCourseBySlug(
  slug: string,
  queryOptions?: Omit<UseQueryOptions<Course | null>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.courseBySlug(slug),
    queryFn: () => contentfulApi.getCourseBySlug(slug),
    enabled: Boolean(slug),
    ...queryOptions,
  });
}

export function useCourseDifficulties(
  queryOptions?: Omit<UseQueryOptions<string[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.courseDifficulties,
    queryFn: () => contentfulApi.getDifficulties(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    ...queryOptions,
  });
}

export function useCoursesByDifficulty(
  difficulty: string,
  options: { limit?: number; skip?: number } = {},
  queryOptions?: Omit<UseQueryOptions<{ courses: Course[]; total: number }>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.coursesByDifficulty(difficulty, options),
    queryFn: () => contentfulApi.getCoursesByDifficulty(difficulty, options),
    enabled: Boolean(difficulty),
    ...queryOptions,
  });
}

export function useSearchCourses(
  query: string,
  options: { limit?: number; skip?: number } = {},
  queryOptions?: Omit<UseQueryOptions<{ courses: Course[]; total: number }>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.searchCourses(query, options),
    queryFn: () => contentfulApi.searchCourses(query, options),
    enabled: Boolean(query?.trim()),
    ...queryOptions,
  });
}

// Lessons Hooks
export function useLessonBySlug(
  slug: string,
  queryOptions?: Omit<UseQueryOptions<Lesson | null>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.lessonBySlug(slug),
    queryFn: () => contentfulApi.getLessonBySlug(slug),
    enabled: Boolean(slug),
    ...queryOptions,
  });
}

export function useCourseLessons(
  courseId: string,
  options: { limit?: number; skip?: number } = {},
  queryOptions?: Omit<UseQueryOptions<{ lessons: Lesson[]; total: number }>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.courseLessons(courseId, options),
    queryFn: () => contentfulApi.getCourseLessons(courseId, options),
    enabled: Boolean(courseId),
    ...queryOptions,
  });
}

// Quiz Hooks
export function useQuizById(
  id: string,
  queryOptions?: Omit<UseQueryOptions<Quiz | null>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.quizById(id),
    queryFn: () => contentfulApi.getQuizById(id),
    enabled: Boolean(id),
    ...queryOptions,
  });
}
