/**
 * Client-side API wrapper that calls our Next.js API routes
 * This keeps Contentful tokens secure on the server-side
 */

import type { Course, ContentfulFilter } from './contentful/types';

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NODE_ENV === 'production' 
      ? (process.env.NEXT_PUBLIC_APP_URL || 'https://learning-platform-six-pink.vercel.app').replace(/\/$/, '')
      : 'http://localhost:3000';
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}/api${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async getCourses(options: ContentfulFilter = {}): Promise<{ courses: Course[]; total: number }> {
    const params = new URLSearchParams();
    
    if (options.limit) params.append('limit', options.limit.toString());
    if (options.skip) params.append('skip', options.skip.toString());
    if (options.difficulty) params.append('difficulty', options.difficulty);
    if (options.search) params.append('search', options.search);

    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<{ courses: Course[]; total: number }>(`/courses${query}`);
  }

  async getCourseBySlug(slug: string): Promise<Course | null> {
    try {
      return await this.request<Course>(`/courses/${slug}`);
    } catch (error: any) {
      if (error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  async getDifficulties(): Promise<string[]> {
    return this.request<string[]>('/courses/difficulties');
  }

  async searchCourses(query: string, options: { limit?: number; skip?: number } = {}): Promise<{ courses: Course[]; total: number }> {
    const params = new URLSearchParams();
    params.append('search', query);
    
    if (options.limit) params.append('limit', options.limit.toString());
    if (options.skip) params.append('skip', options.skip.toString());

    return this.request<{ courses: Course[]; total: number }>(`/courses?${params.toString()}`);
  }

  async getCoursesByDifficulty(difficulty: string, options: { limit?: number; skip?: number } = {}): Promise<{ courses: Course[]; total: number }> {
    const params = new URLSearchParams();
    params.append('difficulty', difficulty);
    
    if (options.limit) params.append('limit', options.limit.toString());
    if (options.skip) params.append('skip', options.skip.toString());

    return this.request<{ courses: Course[]; total: number }>(`/courses?${params.toString()}`);
  }
}

export const apiClient = new ApiClient();
