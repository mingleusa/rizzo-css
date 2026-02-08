# Search Component

Rizzo CSS includes a powerful search component with Algolia integration for fast, relevant search results across all documentation.

## Features

- **Full-Screen Overlay** - When open, a full-screen overlay covers the viewport; the search modal is centered inside it both horizontally and vertically. The search closes when you click the backdrop, the **X button**, or press **Escape**; **Cmd+K** / **Ctrl+K** toggles open or close (including when focus is in the search box). Clicking inside the modal (input, results) does not close it.
- **Close Button (X)** - Bordered style (matches design system); stays visible on hover (accent border and icon).
- **Modal UX** - Bottom padding and list spacer so the last result is fully visible when scrolled to the end; compact padding for the "Start typing…" / loading / no-results state.
- **Live Search** - Results filter as you type
- **Algolia Integration** - Fast, typo-tolerant search powered by Algolia
- **Client-Side Fallback** - Works without Algolia for development
- **Keyboard Navigation** - Full keyboard support (Arrow keys, Enter, Escape)
- **Keyboard Shortcut** - **Cmd+K** / **Ctrl+K** toggles search open or close; **Escape** closes
- **Accessible** - ARIA attributes and screen reader support
- **Theme-Aware** - Adapts to all themes

## Usage

The Search component is automatically included in the Navbar. To use it standalone:

```astro
---
import Search from '../components/Search.astro';
---

<Search 
  useAlgolia={true}
  algoliaAppId="YOUR_APP_ID"
  algoliaApiKey="YOUR_SEARCH_API_KEY"
  algoliaIndexName="rizzo-css-docs"
/>
```

### Props

- `useAlgolia` (boolean, optional) - Enable Algolia search (default: `false`)
- `algoliaAppId` (string, optional) - Algolia Application ID
- `algoliaApiKey` (string, optional) - Algolia Search-Only API Key (not Admin API Key)
- `algoliaIndexName` (string, optional) - Algolia index name (default: `"rizzo-css-docs"`)

## Setup

### Option 1: Client-Side Search (Default)

The Search component works out of the box with a built-in client-side search index. No setup required!

### Option 2: Algolia Search

For production use with Algolia:

1. **Create an Algolia Account**
   - Sign up at [algolia.com](https://www.algolia.com/)
   - Create a new application

2. **Get Your Credentials**
   - Application ID: Found in your Algolia dashboard
   - Search-Only API Key: Found in API Keys section (use this, not the Admin API Key)
   - Admin API Key: Needed for indexing (keep this secret!)

3. **Index Your Documentation**
   ```bash
   # Install Algolia client
   pnpm add algoliasearch
   
   # Set environment variables
   export ALGOLIA_APP_ID="your-app-id"
   export ALGOLIA_API_KEY="your-admin-api-key"
   export ALGOLIA_INDEX_NAME="rizzo-css-docs"
   
   # Run indexing script
   node scripts/index-docs.js
   ```

4. **Configure Your Component**
   ```astro
   <Search 
     useAlgolia={true}
     algoliaAppId={import.meta.env.PUBLIC_ALGOLIA_APP_ID}
     algoliaApiKey={import.meta.env.PUBLIC_ALGOLIA_SEARCH_KEY}
     algoliaIndexName="rizzo-css-docs"
   />
   ```

5. **Set Environment Variables**
   Create a `.env` file:
   ```
   PUBLIC_ALGOLIA_APP_ID=your-app-id
   PUBLIC_ALGOLIA_SEARCH_KEY=your-search-only-api-key
   ```

## Keyboard Shortcuts

- **Ctrl+K** / **Cmd+K** - Toggle search (open when closed, close when open—including when focus is in the search box)
- **Escape** - Close search
- `Arrow Down` - Navigate to next result
- `Arrow Up` - Navigate to previous result
- `Enter` - Navigate to selected result
- `Tab` - Navigate through results

## Accessibility

The Search component includes:

- **ARIA Roles** - `role="dialog"`, `role="listbox"`, `role="option"`
- **ARIA Labels** - Descriptive labels for all interactive elements
- **Keyboard Navigation** - Full keyboard support
- **Focus Management** - Focus trapping and restoration
- **Screen Reader Support** - Proper announcements and labels

## Customization

### Styling

The Search component uses semantic theme variables and can be customized via CSS. **Always use design system variables** for consistency and framework portability.

The search modal is rendered inside the overlay and centered with `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)`. The overlay is full-screen (`position: fixed; inset: 0`).

```css
/* Customize search panel using design system variables */
.search__panel {
  max-width: var(--spacing-200); /* 50rem / 800px - wider search panel */
}

/* Customize result items using spacing variables */
.search__result-item {
  padding: var(--spacing-4); /* More padding using design system spacing */
}
```

### Search Index

To customize the client-side search index, edit the `searchIndex` array in `Search.astro`:

```javascript
const searchIndex = [
  { 
    title: 'Your Page', 
    url: '/docs/your-page', 
    category: 'Documentation', 
    content: 'Page description...' 
  },
  // ... more pages
];
```

## Indexing Script

The `scripts/index-docs.js` script automatically:

1. Reads all markdown documentation files
2. Extracts content and metadata
3. Creates search records
4. Uploads to Algolia

### Running the Indexing Script

```bash
# With environment variables
ALGOLIA_APP_ID="your-id" \
ALGOLIA_API_KEY="your-admin-key" \
ALGOLIA_INDEX_NAME="rizzo-css-docs" \
node scripts/index-docs.js

# Or use .env file
node scripts/index-docs.js
```

### Customizing the Index

Edit `scripts/index-docs.js` to:
- Add more pages to index
- Customize content extraction
- Add custom metadata
- Filter pages

## Search Results

Search results include:
- **Title** - Page title
- **Category** - Documentation, Components, Themes, Reference
- **Content** - Relevant excerpt or description
- **URL** - Direct link to the page

Results are sorted by relevance (title matches first, then category, then content).

## Performance

- **Client-Side Search** - Instant results, no network requests
- **Algolia Search** - Fast, typo-tolerant, handles large indexes
- **Debounced Input** - 300ms delay to reduce unnecessary searches
- **Lazy Loading** - Algolia client loaded only when needed

## Troubleshooting

### Search Not Working

1. Check browser console for errors
2. Verify Algolia credentials (if using Algolia)
3. Ensure search index is populated
4. Check network requests in browser DevTools

### Algolia Integration Issues

1. Verify API keys are correct
2. Check index name matches
3. Ensure index has been created and populated
4. Verify Search-Only API Key is used (not Admin API Key)

### Results Not Showing

1. Check search query is at least 2 characters
2. Verify pages are in the search index
3. Check for JavaScript errors
4. Ensure CSS is loaded correctly
