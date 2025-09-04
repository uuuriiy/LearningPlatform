// Contentful Asset type
export interface Asset {
  sys: {
    id: string;
  };
  title: string;
  description?: string;
  contentType: string;
  fileName: string;
  size: number;
  url: string;
  width?: number;
  height?: number;
}

// Rich Text Document type (for lesson content)
export interface RichTextDocument {
  json: unknown;
  links?: {
    assets?: {
      block: Asset[];
    };
    entries?: {
      block: unknown[];
    };
  };
}

// Course content type (matching actual Contentful structure)
export interface Course {
  sys: {
    id: string;
  };
  courseTitle: string;
  slug: string;
  description: {
    json: {
      nodeType: string;
      data: Record<string, unknown>;
      content: Array<{
        nodeType: string;
        data: Record<string, unknown>;
        content: Array<{
          nodeType: string;
          data: Record<string, unknown>;
          marks: unknown[];
          value: string;
        }>;
      }>;
    };
  };
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  linkedFrom?: {
    lessonCollection: {
      items: Array<{
        lessonTitle: string;
      }>;
    };
  };
  // Keep these for backward compatibility with components
  title?: string;
  category?: string;
  image?: {
    url: string;
    size: number;
    width: number;
    height: number;
    description?: string;
  };
  lessonsCollection?: {
    total: number;
  };
}

// Lesson content type (updated to match your content model)
export interface Lesson {
  sys: {
    id: string;
    publishedAt?: string;
    firstPublishedAt?: string;
  };
  title: string;
  slug: string;
  body: RichTextDocument;
  videoLink?: string;
  order: number;
  resourcesCollection?: {
    items: Asset[];
  };
  course?: {
    sys: { id: string };
    title: string;
    slug: string;
  };
}

// Quiz content type
export interface Quiz {
  sys: {
    id: string;
  };
  title: string;
  description?: string;
  lesson?: Lesson;
  questionsCollection: {
    items: Question[];
  };
  passingScore?: number;
  timeLimit?: number; // in minutes
  createdAt: string;
  updatedAt: string;
}

// Question content type
export interface Question {
  sys: {
    id: string;
  };
  questionText: string;
  questionType: 'multiple-choice' | 'true-false' | 'single-choice';
  options: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points?: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// GraphQL Query Response types
export interface CoursesResponse {
  courseCollection: {
    items: Course[];
    total: number;
  };
}

export interface CourseResponse {
  course: Course;
}

export interface LessonsResponse {
  lessonCollection: {
    items: Lesson[];
    total: number;
  };
}

export interface LessonResponse {
  lesson: Lesson;
}

export interface QuizResponse {
  quiz: Quiz;
}

// Filter and pagination types
export interface ContentfulFilter {
  limit?: number;
  skip?: number;
  where?: Record<string, unknown>;
  order?: string[];
}

export interface PaginationInfo {
  total: number;
  skip: number;
  limit: number;
}
