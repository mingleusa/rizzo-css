# Algolia Search Setup Guide

Complete guide for setting up Algolia search with Rizzo CSS.

## Overview

Rizzo CSS supports two search modes:
1. **Client-Side Search** (default) - Works immediately, no setup required
2. **Algolia Search** - Production-ready, fast, typo-tolerant search

## Quick Start

### 1. Create Algolia Account

1. Sign up at [algolia.com](https://www.algolia.com/)
2. Create a new application
3. Note your **Application ID** (found in dashboard)

### 2. Get API Keys

In your Algolia dashboard, go to **API Keys**:

- **Search-Only API Key** - Safe to expose in browser (for Search component)
- **Admin API Key** - Keep secret! (for indexing only)

**Note:** Algolia's dashboard may show a command like this in step 3:

```bash
npx create-instantsearch-app@latest instantsearch-app \
    --name 'instantsearch-app' \
    --template 'InstantSearch.js' \
    --app-id 'YOUR_APP_ID' \
    --api-key 'YOUR_SEARCH_ONLY_KEY' \
    --index-name 'rizzo-css-docs' \
    --attributes-to-display 'title' \
    --no-interactive
```

**You do NOT need to run this command.** This creates a separate InstantSearch.js demo app, which is a different approach than what Rizzo CSS uses. Rizzo CSS has its own custom Search component that integrates directly with Algolia's JavaScript client (`algoliasearch`). You can skip this and proceed to the next step.

### 3. Configure Environment Variables

#### Option A: Using .env file (Recommended)

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   # Public variables (exposed to client)
   PUBLIC_ALGOLIA_APP_ID=your-app-id-here
   PUBLIC_ALGOLIA_SEARCH_KEY=your-search-only-key-here
   PUBLIC_ALGOLIA_INDEX_NAME=rizzo-css-docs

   # Private variables (server-side only)
   ALGOLIA_APP_ID=your-app-id-here
   ALGOLIA_ADMIN_KEY=your-admin-key-here
   ALGOLIA_INDEX_NAME=rizzo-css-docs
   ```

3. Install dotenv (optional, for .env file support in scripts):
   ```bash
   pnpm add -D dotenv
   ```

#### Option B: Using Environment Variables

```bash
export PUBLIC_ALGOLIA_APP_ID="your-app-id"
export PUBLIC_ALGOLIA_SEARCH_KEY="your-search-only-key"
export PUBLIC_ALGOLIA_INDEX_NAME="rizzo-css-docs"

# For indexing script
export ALGOLIA_APP_ID="your-app-id"
export ALGOLIA_ADMIN_KEY="your-admin-key"
export ALGOLIA_INDEX_NAME="rizzo-css-docs"
```

### 4. Index Your Documentation

```bash
# Install Algolia client (if not already installed)
pnpm add algoliasearch

# Run indexing script
pnpm index:algolia
# or
node scripts/index-docs.js
```

The script will:
- Read all documentation markdown files
- Extract content and metadata
- Upload to your Algolia index

### 5. Verify Setup

The Search component will automatically use Algolia if:
- `PUBLIC_ALGOLIA_APP_ID` is set
- `PUBLIC_ALGOLIA_SEARCH_KEY` is set
- Or `PUBLIC_ALGOLIA_ENABLED=true` is set

**To verify Algolia is working:**

1. **Check Browser Console**
   - Open your site in a browser
   - Open Developer Tools (F12)
   - Look for search initialization messages:
     - `✅ Algolia search enabled` - Algolia is configured and ready
     - `ℹ️ Using client-side search` - Using fallback (Algolia not configured)

2. **Test Search**
   - Press `Ctrl+K` (or `Cmd+K` on Mac) to open search
   - Type a search query
   - Check console for:
     - `Using Algolia search for query: "your-query"` - Algolia is being used
     - `Algolia returned X results` - Search was successful
     - If you see `Using client-side search`, Algolia is not being used

3. **Verify Index**
   - Go to your Algolia dashboard
   - Navigate to your index
   - Check that records exist
   - Test a search query in the Algolia dashboard

4. **Check Network Tab**
   - Open Developer Tools → Network tab
   - Perform a search
   - Look for requests to `algolia.net` or `algolianet.com`
   - Successful requests indicate Algolia is working

## Environment Variables Reference

### Public Variables (Client-Side)

These are exposed to the browser and safe to commit (if using public keys):

| Variable | Description | Required |
|----------|-------------|----------|
| `PUBLIC_ALGOLIA_APP_ID` | Your Algolia Application ID | Yes |
| `PUBLIC_ALGOLIA_SEARCH_KEY` | Search-Only API Key | Yes |
| `PUBLIC_ALGOLIA_INDEX_NAME` | Index name (default: `rizzo-css-docs`) | No |
| `PUBLIC_ALGOLIA_ENABLED` | Force enable Algolia (`true`/`false`) | No |
| `PUBLIC_ALGOLIA_HITS_PER_PAGE` | Results per page (default: `10`) | No |

### Private Variables (Server-Side Only)

**Never commit these or expose to client:**

| Variable | Description | Required |
|----------|-------------|----------|
| `ALGOLIA_APP_ID` | Application ID (for indexing) | Yes (for indexing) |
| `ALGOLIA_ADMIN_KEY` | Admin API Key (for indexing) | Yes (for indexing) |
| `ALGOLIA_INDEX_NAME` | Index name (for indexing) | No |

## Configuration Methods

### Method 1: Automatic (Recommended)

The Search component automatically detects Algolia if credentials are provided:

```astro
---
import Search from '../components/Search.astro';
---

<!-- Automatically uses Algolia if env vars are set -->
<Search />
```

### Method 2: Explicit Configuration

```astro
---
import Search from '../components/Search.astro';
---

<Search 
  useAlgolia={true}
  algoliaAppId={import.meta.env.PUBLIC_ALGOLIA_APP_ID}
  algoliaApiKey={import.meta.env.PUBLIC_ALGOLIA_SEARCH_KEY}
  algoliaIndexName={import.meta.env.PUBLIC_ALGOLIA_INDEX_NAME || 'rizzo-css-docs'}
/>
```

### Method 3: Using Config Helper

```astro
---
import Search from '../components/Search.astro';
import { getSearchConfig } from '../config/search';

const config = getSearchConfig();
---

<Search 
  useAlgolia={config.useAlgolia}
  algoliaAppId={config.algoliaAppId}
  algoliaApiKey={config.algoliaApiKey}
  algoliaIndexName={config.algoliaIndexName}
/>
```

## Deployment

### Vercel

1. Go to Project Settings → Environment Variables
2. Add all `PUBLIC_*` variables
3. Add `ALGOLIA_ADMIN_KEY` (for indexing in CI/CD)

### Netlify

1. Go to Site Settings → Environment Variables
2. Add all `PUBLIC_*` variables
3. Add `ALGOLIA_ADMIN_KEY` (for indexing in CI/CD)

### Other Platforms

Ensure all `PUBLIC_*` variables are available at build time.

## Security Best Practices

1. ✅ **DO** use Search-Only API Key in `PUBLIC_ALGOLIA_SEARCH_KEY`
2. ✅ **DO** restrict Search-Only API Key to specific indices
3. ✅ **DO** add rate limiting in Algolia dashboard
4. ❌ **NEVER** commit `.env` file
5. ❌ **NEVER** expose Admin API Key to client
6. ❌ **NEVER** use Admin API Key in `PUBLIC_ALGOLIA_SEARCH_KEY`

## Troubleshooting

### Search not working

1. Check browser console for errors
2. Verify `PUBLIC_ALGOLIA_APP_ID` and `PUBLIC_ALGOLIA_SEARCH_KEY` are set
3. Ensure index is populated (run indexing script)
4. Check Algolia dashboard for API key restrictions

### Indexing fails

1. Verify `ALGOLIA_ADMIN_KEY` is set (not Search-Only key)
2. Check Admin API Key has write permissions
3. Ensure index name matches in both configs
4. Install `algoliasearch` package: `pnpm add algoliasearch`

### Environment variables not loading

1. Restart dev server after adding env vars
2. Ensure `.env` file is in project root
3. Install `dotenv` for .env file support: `pnpm add -D dotenv`
4. Check variable names match exactly (case-sensitive)

## Advanced Configuration

### Custom Index Settings

Configure in Algolia dashboard:
- Searchable attributes
- Ranking and sorting
- Facets and filters
- Typo tolerance

### Analytics

Enable analytics in Algolia dashboard to track:
- Search queries
- Click-through rates
- Popular content

### Rate Limiting

Configure in Algolia dashboard:
- Requests per hour
- Requests per IP
- Custom rate limits

## Support

- [Algolia Documentation](https://www.algolia.com/doc/)
- [Algolia Dashboard](https://www.algolia.com/apps/)
- [Rizzo CSS Search (in Components)](./docs/COMPONENTS.md#search-component)
