// Export the API clients
export { contentfulApi, contentfulPreviewApi, ContentfulApiClient } from './api';

// Export the GraphQL client instances
export { contentfulClient, previewClient, getContentfulClient, hasContentfulConfig } from './client';

// Export all types
export type {
  Asset,
  RichTextDocument,
  Course,
  Lesson,
  Quiz,
  Question,
  CoursesResponse,
  CourseResponse,
  LessonsResponse,
  LessonResponse,
  QuizResponse,
  ContentfulFilter,
  PaginationInfo,
} from './types';

// Export GraphQL queries for custom usage
export * from './queries';
