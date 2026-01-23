/**
 * Search Configuration
 * 
 * Centralized configuration for search functionality.
 * Supports both client-side and Algolia search.
 */

export interface SearchConfig {
  useAlgolia: boolean;
  algoliaAppId: string;
  algoliaApiKey: string;
  algoliaIndexName: string;
  hitsPerPage?: number;
}

/**
 * Get search configuration from environment variables
 * 
 * In Astro, PUBLIC_* variables are available via import.meta.env
 * Private variables are only available server-side
 */
export function getSearchConfig(): SearchConfig {
  // Check if Algolia is enabled via environment variable
  const useAlgoliaEnv = import.meta.env.PUBLIC_ALGOLIA_ENABLED;
  const useAlgolia = useAlgoliaEnv === 'true' || useAlgoliaEnv === true;

  // Get Algolia credentials from environment
  const algoliaAppId = import.meta.env.PUBLIC_ALGOLIA_APP_ID || '';
  const algoliaApiKey = import.meta.env.PUBLIC_ALGOLIA_SEARCH_KEY || '';
  const algoliaIndexName = import.meta.env.PUBLIC_ALGOLIA_INDEX_NAME || 'rizzo-css-docs';
  const hitsPerPage = parseInt(import.meta.env.PUBLIC_ALGOLIA_HITS_PER_PAGE || '10', 10);

  // Auto-enable Algolia if credentials are provided
  const shouldUseAlgolia = useAlgolia || (algoliaAppId && algoliaApiKey);

  return {
    useAlgolia: shouldUseAlgolia,
    algoliaAppId,
    algoliaApiKey,
    algoliaIndexName,
    hitsPerPage: hitsPerPage > 0 ? hitsPerPage : 10,
  };
}

/**
 * Validate Algolia configuration
 * Returns true if all required Algolia variables are set
 */
export function isAlgoliaConfigured(): boolean {
  const config = getSearchConfig();
  return !!(config.algoliaAppId && config.algoliaApiKey);
}

/**
 * Get server-side Algolia configuration for indexing
 * Only available in server-side contexts (not exposed to client)
 */
export function getServerAlgoliaConfig() {
  return {
    appId: import.meta.env.ALGOLIA_APP_ID || import.meta.env.PUBLIC_ALGOLIA_APP_ID || '',
    adminKey: import.meta.env.ALGOLIA_ADMIN_KEY || '',
    indexName: import.meta.env.ALGOLIA_INDEX_NAME || import.meta.env.PUBLIC_ALGOLIA_INDEX_NAME || 'rizzo-css-docs',
  };
}
