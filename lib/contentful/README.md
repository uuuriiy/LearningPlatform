# Contentful GraphQL Integration

This directory contains the complete Contentful GraphQL integration for the Learning Platform.

## 🚀 Setup Instructions

### 1. Environment Variables

Add these variables to your `.env.local` file:

```env
# Contentful Configuration
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token_here  
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_api_token_here
CONTENTFUL_ENVIRONMENT=master
```

**Note:** The app will automatically use sample data if Contentful environment variables are not configured, making it easy to test the UI without setting up Contentful first.

### 2. Contentful Content Models

Create these content models in your Contentful space:

#### Course
- **Title** (Short text) - Required
- **Slug** (Short text) - Required, Unique
- **Description** (Long text) - Required
- **Image** (Media) - Optional
- **Category** (Short text) - Required
- **Prerequisites** (Short text, List) - Optional
- **Difficulty** (Short text, Limited to: Beginner, Intermediate, Advanced) - Required
- **Duration** (Integer) - Optional (in hours)

#### Lesson
- **Title** (Short text) - Required
- **Slug** (Short text) - Required, Unique
- **Content** (Rich text) - Required
- **Video URL** (Short text) - Optional
- **Resources** (Short text, List) - Optional
- **Order** (Integer) - Required
- **Duration** (Integer) - Optional (in minutes)
- **Course** (Reference to Course) - Required

#### Quiz
- **Title** (Short text) - Required
- **Description** (Long text) - Optional
- **Lesson** (Reference to Lesson) - Optional
- **Passing Score** (Integer) - Optional
- **Time Limit** (Integer) - Optional (in minutes)

#### Question
- **Question Text** (Long text) - Required
- **Question Type** (Short text, Limited to: multiple-choice, true-false, single-choice) - Required
- **Options** (Short text, List) - Required
- **Correct Answer** (Short text) - Required
- **Explanation** (Long text) - Optional
- **Points** (Integer) - Optional
- **Order** (Integer) - Required

### 3. Content Relationships

Set up these references in Contentful:
- Course → Lessons (Reference, Many)
- Lesson → Course (Reference, One)
- Lesson → Quizzes (Reference, Many)
- Quiz → Questions (Reference, Many)

## 📝 Usage

### Basic Usage

```typescript
import { contentfulApi } from '@/lib/contentful';

// Get all courses
const { courses, total } = await contentfulApi.getCourses({ limit: 10 });

// Get course by slug
const course = await contentfulApi.getCourseBySlug('javascript-fundamentals');

// Search courses
const { courses: searchResults } = await contentfulApi.searchCourses('React');
```

### With Error Handling

```typescript
import { contentfulApi } from '@/lib/contentful';

async function fetchCourses() {
  try {
    const { courses } = await contentfulApi.getCourses({ limit: 6 });
    return courses;
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return [];
  }
}
```

## 📁 File Structure

- `client.ts` - GraphQL client configuration
- `types.ts` - TypeScript interfaces for all content types
- `queries.ts` - GraphQL queries and fragments
- `api.ts` - API client wrapper with methods
- `usage-examples.ts` - Example usage patterns
- `index.ts` - Main export file

## 🔧 Features

- ✅ Full TypeScript support
- ✅ GraphQL with fragments for efficient queries
- ✅ Error handling with try/catch blocks
- ✅ Preview mode support for draft content
- ✅ Pagination and filtering
- ✅ Search functionality
- ✅ Rich text content support
- ✅ Asset/image handling

## 🎯 Next Steps

1. Set up your Contentful space with the content models above
2. Add some sample content (courses, lessons, quizzes)
3. Configure your environment variables
4. Start using the API in your components!

## 🔍 GraphQL Playground

You can test queries directly in Contentful's GraphQL playground:
`https://graphql.contentful.com/content/v1/spaces/YOUR_SPACE_ID/explore`
