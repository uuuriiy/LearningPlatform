import { GraphQLClient } from 'graphql-request';

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID || process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const CONTENTFUL_PREVIEW_ACCESS_TOKEN = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN;
const CONTENTFUL_ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || 'master';

// Only throw error if we're actually trying to use the client
const hasContentfulConfig = CONTENTFUL_SPACE_ID && CONTENTFUL_ACCESS_TOKEN;

// Create clients only if config is available
let contentfulClient: GraphQLClient | null = null;
let previewClient: GraphQLClient | null = null;

if (hasContentfulConfig) {
  // GraphQL endpoint for Contentful
  
  const GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}`;

  // Create GraphQL client for published content
  contentfulClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
    },
  });

  // Create GraphQL client for preview content (draft/unpublished)
  if (CONTENTFUL_PREVIEW_ACCESS_TOKEN) {
    previewClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
      },
    });
  }
}

export { contentfulClient, previewClient, hasContentfulConfig };

// Helper function to get the appropriate client
export const getContentfulClient = (preview = false) => {
  if (!hasContentfulConfig) {
    throw new Error(
      'Contentful is not configured. Please add CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN to your environment variables.'
    );
  }
  
  if (preview && !previewClient) {
    throw new Error(
      'Contentful preview is not configured. Please add CONTENTFUL_PREVIEW_ACCESS_TOKEN to your environment variables.'
    );
  }
  
  return preview ? previewClient! : contentfulClient!;
};
