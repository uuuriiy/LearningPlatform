import { GraphQLClient } from 'graphql-request';
import { getContentfulClient, hasContentfulConfig } from './client';
import {
  GET_COURSES,
  GET_COURSE_BY_SLUG,
  GET_LESSON_BY_SLUG,
  GET_COURSE_LESSONS,
  GET_QUIZ_BY_ID,
  SEARCH_COURSES,
  GET_COURSES_BY_DIFFICULTY,
  GET_COURSE_DIFFICULTIES,
} from './queries';
import type {
  Course,
  Lesson,
  Quiz,
  CoursesResponse,
  LessonsResponse,
  QuizResponse,
  ContentfulFilter,
} from './types';

/**
 * ApiClient wrapper for Contentful GraphQL operations
 * Follows project preference for centralized API handling with try/catch blocks
 */
class ContentfulApiClient {
  private client: GraphQLClient | null = null;
  private previewMode: boolean;

  constructor(preview = false) {
    this.previewMode = preview;
    if (hasContentfulConfig) {
      this.client = getContentfulClient(preview);
    }
  }

  private ensureClient(): GraphQLClient {
    if (!this.client) {
      throw new Error(
        'Contentful is not configured. Please add CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN to your environment variables.'
      );
    }
    return this.client;
  }

  /**
   * Get all courses with optional filtering and pagination
   */
  async getCourses(options: ContentfulFilter = {}): Promise<{
    courses: Course[];
    total: number;
  }> {
    try {
      const { limit = 20, skip = 0 } = options;
      
      const client = this.ensureClient();
      const response = await client.request<CoursesResponse>(
        GET_COURSES,
        { limit, skip }
      );

      return {
        courses: response.courseCollection.items,
        total: response.courseCollection.total,
      };
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw new Error('Failed to fetch courses');
    }
  }

  /**
   * Get a single course by slug with all lessons
   */
  async getCourseBySlug(slug: string): Promise<Course | null> {
    try {
      const client = this.ensureClient();
      const response = await client.request<CoursesResponse>(
        GET_COURSE_BY_SLUG,
        { slug }
      );

      return response.courseCollection.items[0] || null;
    } catch (error) {
      console.error(`Error fetching course with slug ${slug}:`, error);
      throw new Error(`Failed to fetch course: ${slug}`);
    }
  }

  /**
   * Get a single lesson by slug with course context
   */
  async getLessonBySlug(slug: string): Promise<Lesson | null> {
    try {
      const client = this.ensureClient();
      const response = await client.request<LessonsResponse>(
        GET_LESSON_BY_SLUG,
        { slug }
      );

      return response.lessonCollection.items[0] || null;
    } catch (error) {
      console.error(`Error fetching lesson with slug ${slug}:`, error);
      throw new Error(`Failed to fetch lesson: ${slug}`);
    }
  }

  /**
   * Get lessons for a specific course
   */
  async getCourseLessons(
    courseId: string,
    options: { limit?: number; skip?: number } = {}
  ): Promise<{
    lessons: Lesson[];
    total: number;
  }> {
    try {
      const { limit = 50, skip = 0 } = options;
      
      const client = this.ensureClient();
      const response = await client.request<LessonsResponse>(
        GET_COURSE_LESSONS,
        { courseId, limit, skip }
      );

      return {
        lessons: response.lessonCollection.items,
        total: response.lessonCollection.total,
      };
    } catch (error) {
      console.error(`Error fetching lessons for course ${courseId}:`, error);
      throw new Error(`Failed to fetch lessons for course: ${courseId}`);
    }
  }

  /**
   * Get a quiz by ID
   */
  async getQuizById(id: string): Promise<Quiz | null> {
    try {
      const client = this.ensureClient();
      const response = await client.request<QuizResponse>(
        GET_QUIZ_BY_ID,
        { id }
      );

      return response.quiz || null;
    } catch (error) {
      console.error(`Error fetching quiz with ID ${id}:`, error);
      throw new Error(`Failed to fetch quiz: ${id}`);
    }
  }

  /**
   * Search courses by title, description, or category
   */
  async searchCourses(
    query: string,
    options: { limit?: number; skip?: number } = {}
  ): Promise<{
    courses: Course[];
    total: number;
  }> {
    try {
      const { limit = 20, skip = 0 } = options;
      
      const client = this.ensureClient();
      const response = await client.request<CoursesResponse>(
        SEARCH_COURSES,
        { query, limit, skip }
      );

      return {
        courses: response.courseCollection.items,
        total: response.courseCollection.total,
      };
    } catch (error) {
      console.error(`Error searching courses with query "${query}":`, error);
      throw new Error(`Failed to search courses: ${query}`);
    }
  }

  /**
   * Get courses by difficulty
   */
  async getCoursesByDifficulty(
    difficulty: string,
    options: { limit?: number; skip?: number } = {}
  ): Promise<{
    courses: Course[];
    total: number;
  }> {
    try {
      const { limit = 20, skip = 0 } = options;
      
      const client = this.ensureClient();
      const response = await client.request<CoursesResponse>(
        GET_COURSES_BY_DIFFICULTY,
        { difficulty, limit, skip }
      );

      return {
        courses: response.courseCollection.items,
        total: response.courseCollection.total,
      };
    } catch (error) {
      console.error(`Error fetching courses for difficulty "${difficulty}":`, error);
      throw new Error(`Failed to fetch courses for difficulty: ${difficulty}`);
    }
  }

  /**
   * Get all unique course difficulties
   */
  async getDifficulties(): Promise<string[]> {
    try {
      const client = this.ensureClient();
      const response = await client.request<CoursesResponse>(
        GET_COURSE_DIFFICULTIES,
        {}
      );

      const difficulties = response.courseCollection.items
        .map(course => course.difficulty)
        .filter(Boolean)
        .filter((difficulty, index, array) => array.indexOf(difficulty) === index)
        .sort();

      return difficulties;
    } catch (error) {
      console.error('Error fetching course difficulties:', error);
      throw new Error('Failed to fetch course difficulties');
    }
  }
}

// Export singleton instances
export const contentfulApi = new ContentfulApiClient(false);
export const contentfulPreviewApi = new ContentfulApiClient(true);

// Export the class for custom instances
export { ContentfulApiClient };
