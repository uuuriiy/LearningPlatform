import { gql } from 'graphql-request';

// Fragment for Asset fields (updated to match actual structure)
const ASSET_FRAGMENT = gql`
  fragment AssetFragment on Asset {
    url
    size
    width
    height
    description
  }
`;

// Fragment for Course fields (updated to match actual Contentful structure)
const COURSE_FRAGMENT = gql`
  fragment CourseFragment on Course {
    sys {
      id
    }
    courseTitle
    slug
    description {
      json
    }
    difficulty
    image {
      ...AssetFragment
    }
    linkedFrom {
      lessonCollection(limit: 1) {
        items {
          lessonTitle
        }
      }
    }
  }
  ${ASSET_FRAGMENT}
`;

// Fragment for Lesson fields (updated to match your content model)
const LESSON_FRAGMENT = gql`
  fragment LessonFragment on Lesson {
    sys {
      id
      publishedAt
      firstPublishedAt
    }
    title
    slug
    body {
      json
      links {
        assets {
          block {
            ...AssetFragment
          }
        }
      }
    }
    videoLink
    order
    resourcesCollection {
      items {
        ...AssetFragment
      }
    }
    course {
      sys {
        id
      }
      title
      slug
    }
  }
  ${ASSET_FRAGMENT}
`;

// Fragment for Question fields
const QUESTION_FRAGMENT = gql`
  fragment QuestionFragment on Question {
    sys {
      id
    }
    questionText
    questionType
    options
    correctAnswer
    explanation
    points
    order
    sys {
      publishedAt
      firstPublishedAt
    }
  }
`;

// Fragment for Quiz fields
const QUIZ_FRAGMENT = gql`
  fragment QuizFragment on Quiz {
    sys {
      id
    }
    title
    description
    passingScore
    timeLimit
    questionsCollection(limit: 50, order: order_ASC) {
      items {
        ...QuestionFragment
      }
    }
    sys {
      publishedAt
      firstPublishedAt
    }
  }
  ${QUESTION_FRAGMENT}
`;

// Query to get all courses with basic info
export const GET_COURSES = gql`
  query GetCourses($limit: Int = 20, $skip: Int = 0) {
    courseCollection(limit: $limit, skip: $skip) {
      total
      items {
        ...CourseFragment
      }
    }
  }
  ${COURSE_FRAGMENT}
`;

// Query to get a single course by slug
export const GET_COURSE_BY_SLUG = gql`
  query GetCourseBySlug($slug: String!) {
    courseCollection(where: { slug: $slug }, limit: 1) {
      items {
        ...CourseFragment
      }
    }
  }
  ${COURSE_FRAGMENT}
`;

// Query to get a single lesson with course context
export const GET_LESSON_BY_SLUG = gql`
  query GetLessonBySlug($slug: String!) {
    lessonCollection(where: { slug: $slug }, limit: 1) {
      items {
        ...LessonFragment
        course {
          ...CourseFragment
          lessonsCollection(limit: 50, order: order_ASC) {
            items {
              sys {
                id
              }
              title
              slug
              order
            }
          }
        }
        quizCollection(limit: 5) {
          items {
            ...QuizFragment
          }
        }
      }
    }
  }
  ${COURSE_FRAGMENT}
  ${LESSON_FRAGMENT}
  ${QUIZ_FRAGMENT}
`;

// Query to get lessons for a specific course
export const GET_COURSE_LESSONS = gql`
  query GetCourseLessons($courseId: String!, $limit: Int = 50, $skip: Int = 0) {
    lessonCollection(
      where: { course: { sys: { id: $courseId } } }
      limit: $limit
      skip: $skip
      order: order_ASC
    ) {
      total
      items {
        ...LessonFragment
      }
    }
  }
  ${LESSON_FRAGMENT}
`;

// Query to get a quiz by ID
export const GET_QUIZ_BY_ID = gql`
  query GetQuizById($id: String!) {
    quiz(id: $id) {
      ...QuizFragment
      lesson {
        sys {
          id
        }
        title
        slug
        course {
          sys {
            id
          }
          title
          slug
        }
      }
    }
  }
  ${QUIZ_FRAGMENT}
`;

// Query to search courses by title or category
export const SEARCH_COURSES = gql`
  query SearchCourses($query: String!, $limit: Int = 20, $skip: Int = 0) {
    courseCollection(
      where: {
        OR: [
          { courseTitle_contains: $query }
          { slug_contains: $query }
        ]
      }
      limit: $limit
      skip: $skip
      order: [sys_publishedAt_DESC]
    ) {
      total
      items {
        ...CourseFragment
      }
    }
  }
  ${COURSE_FRAGMENT}
`;

// Query to get courses by difficulty
export const GET_COURSES_BY_DIFFICULTY = gql`
  query GetCoursesByDifficulty($difficulty: String!, $limit: Int = 20, $skip: Int = 0) {
    courseCollection(
      where: { difficulty: $difficulty }
      limit: $limit
      skip: $skip
      order: [sys_publishedAt_DESC]
    ) {
      total
      items {
        ...CourseFragment
      }
    }
  }
  ${COURSE_FRAGMENT}
`;

// Query to get all difficulties (distinct)
export const GET_COURSE_DIFFICULTIES = gql`
  query GetCourseDifficulties {
    courseCollection(limit: 1000) {
      items {
        difficulty
      }
    }
  }
`;
