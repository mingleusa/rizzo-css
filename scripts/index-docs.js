#!/usr/bin/env node

/**
 * Script to index documentation for Algolia search
 * 
 * This script reads all documentation pages and markdown files
 * and creates a search index that can be uploaded to Algolia.
 * 
 * Usage:
 *   node scripts/index-docs.js
 * 
 * Requires:
 *   - ALGOLIA_APP_ID environment variable
 *   - ALGOLIA_API_KEY environment variable (Admin API Key)
 *   - ALGOLIA_INDEX_NAME environment variable (default: rizzo-css-docs)
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Try to load dotenv if available (optional dependency)
let dotenvLoaded = false;
try {
  const dotenv = await import('dotenv');
  const envPath = join(rootDir, '.env');
  if (existsSync(envPath)) {
    dotenv.config({ path: envPath });
    dotenvLoaded = true;
  }
} catch (e) {
  // dotenv not installed, that's okay
}

// Configuration - supports both .env file and environment variables
// Priority: process.env > .env file
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || process.env.PUBLIC_ALGOLIA_APP_ID || '';
const ALGOLIA_API_KEY = process.env.ALGOLIA_ADMIN_KEY || process.env.ALGOLIA_API_KEY || '';
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME || process.env.PUBLIC_ALGOLIA_INDEX_NAME || 'rizzo-css-docs';

if (!ALGOLIA_APP_ID || !ALGOLIA_API_KEY) {
  console.error('Error: Algolia credentials are required');
  console.error('\nTo set up Algolia:');
  console.error('1. Create an account at https://www.algolia.com/');
  console.error('2. Create a new application');
  console.error('3. Get your Application ID and Admin API Key');
  console.error('\nOption 1: Create a .env file (recommended)');
  console.error('   Copy .env.example to .env and fill in your credentials:');
  console.error('   ALGOLIA_APP_ID=your-app-id');
  console.error('   ALGOLIA_ADMIN_KEY=your-admin-api-key');
  console.error('   ALGOLIA_INDEX_NAME=rizzo-css-docs');
  console.error('\nOption 2: Set environment variables');
  console.error('   export ALGOLIA_APP_ID="your-app-id"');
  console.error('   export ALGOLIA_ADMIN_KEY="your-admin-api-key"');
  console.error('   export ALGOLIA_INDEX_NAME="rizzo-css-docs"');
  console.error('\nNote: Install dotenv for .env file support:');
  console.error('   pnpm add -D dotenv');
  process.exit(1);
}

// Documentation structure
const docsPages = [
  { title: 'Getting Started', url: '/docs/getting-started', file: 'docs/GETTING_STARTED.md', category: 'Documentation' },
  { title: 'Design System', url: '/docs/design-system', file: 'docs/DESIGN_SYSTEM.md', category: 'Documentation' },
  { title: 'Theming', url: '/docs/theming', file: 'docs/THEMING.md', category: 'Documentation' },
  { title: 'Colors', url: '/docs/colors', file: 'docs/COLORS.md', category: 'Documentation' },
  { title: 'Components', url: '/docs/components', file: 'docs/COMPONENTS.md', category: 'Components' },
  { title: 'Accessibility', url: '/docs/accessibility', file: 'docs/ACCESSIBILITY.md', category: 'Documentation' },
];

// Component pages with descriptions
const componentPages = [
  { 
    title: 'Navbar', 
    url: '/docs/components/navbar', 
    category: 'Components',
    description: 'Responsive, accessible navigation bar with integrated settings button, dropdown menus, mobile menu, and full keyboard navigation'
  },
  { 
    title: 'Settings', 
    url: '/docs/components/settings', 
    category: 'Components',
    description: 'Comprehensive settings panel for theme switching, font size adjustment, and accessibility options with smooth animations'
  },
  { 
    title: 'Theme Switcher', 
    url: '/docs/components/theme-switcher', 
    category: 'Components',
    description: 'Accessible theme switcher with theme icons, keyboard navigation, and automatic theme grouping (dark/light)'
  },
  { 
    title: 'Button', 
    url: '/docs/components/button', 
    category: 'Components',
    description: 'Semantic button component with variants (primary, success, warning, error, info, outline) using theme variables'
  },
  { 
    title: 'Forms', 
    url: '/docs/components/forms', 
    category: 'Components',
    description: 'Comprehensive set of accessible form components including FormGroup, Input, Textarea, Select, Checkbox, and Radio with validation states'
  },
  { 
    title: 'Cards', 
    url: '/docs/components/cards', 
    category: 'Components',
    description: 'Flexible card component with variants (default, elevated, outlined, filled), sections, and image support'
  },
  { 
    title: 'Modal', 
    url: '/docs/components/modal', 
    category: 'Components',
    description: 'Accessible modal/dialog component with focus trapping, keyboard navigation, backdrop overlay, and responsive design'
  },
  { 
    title: 'Alert', 
    url: '/docs/components/alert', 
    category: 'Components',
    description: 'Accessible alert component with variants (success, error, warning, info) and optional dismissible functionality'
  },
  { 
    title: 'Search', 
    url: '/docs/components/search', 
    category: 'Components',
    description: 'Search component with Algolia integration, keyboard shortcuts (Ctrl+K/Cmd+K), live filtering, and client-side fallback'
  },
  { 
    title: 'CopyToClipboard', 
    url: '/docs/components/copy-to-clipboard', 
    category: 'Components',
    description: 'Copy to clipboard component with visual feedback, icon change (copy to checkmark), and accessible ARIA labels'
  },
  { 
    title: 'Icons', 
    url: '/docs/components/icons', 
    category: 'Components',
    description: 'Reusable SVG icon components using Tabler Icons and Devicons (MIT licensed) with interactive card grid, copy functionality, and theme-aware styling'
  },
  { 
    title: 'Badge', 
    url: '/docs/components/badge', 
    category: 'Components',
    description: 'Small labels and tags for displaying status, categories, or counts with variants (primary, success, warning, error, info), sizes (sm, md, lg), and pill option'
  },
  { 
    title: 'Dropdown', 
    url: '/docs/components/dropdown', 
    category: 'Components',
    description: 'Accessible dropdown menu component with keyboard navigation, nested submenus (up to 3 levels), menu items, separators, and custom click handlers'
  },
  { 
    title: 'Tooltip', 
    url: '/docs/components/tooltip', 
    category: 'Components',
    description: 'Accessible tooltip component with four position options (top, bottom, left, right), keyboard support, and theme-aware styling'
  },
  { 
    title: 'Tabs', 
    url: '/docs/components/tabs', 
    category: 'Components',
    description: 'Accessible tabs component with keyboard navigation, ARIA tab pattern, and three variants (default, pills, underline)'
  },
  { 
    title: 'Toast', 
    url: '/docs/components/toast', 
    category: 'Components',
    description: 'Fixed position toast notifications with auto-dismiss and programmatic control. Available globally via window.showToast() with six position options'
  },
];

const themePages = [
  { title: 'Shades of Purple', url: '/docs/themes/shades-of-purple', category: 'Themes' },
  { title: 'Sandstorm Classic', url: '/docs/themes/sandstorm-classic', category: 'Themes' },
  { title: 'Red Velvet Cupcake', url: '/docs/themes/red-velvet-cupcake', category: 'Themes' },
  { title: 'Rocky Blood Orange', url: '/docs/themes/rocky-blood-orange', category: 'Themes' },
  { title: 'Orangy One Light', url: '/docs/themes/orangy-one-light', category: 'Themes' },
  { title: 'Minimal Dark Neon Yellow', url: '/docs/themes/minimal-dark-neon-yellow', category: 'Themes' },
  { title: 'Sunflower', url: '/docs/themes/sunflower', category: 'Themes' },
];

// Extract text content from markdown
function extractContent(markdown) {
  // Remove code blocks
  let content = markdown.replace(/```[\s\S]*?```/g, '');
  // Remove inline code
  content = content.replace(/`[^`]+`/g, '');
  // Remove links but keep text
  content = content.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
  // Remove headers
  content = content.replace(/^#+\s+/gm, '');
  // Remove emphasis
  content = content.replace(/\*\*([^\*]+)\*\*/g, '$1');
  content = content.replace(/\*([^\*]+)\*/g, '$1');
  // Clean up whitespace
  content = content.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
  return content;
}

// Read markdown file
function readMarkdownFile(filePath) {
  try {
    const fullPath = join(rootDir, filePath);
    const content = readFileSync(fullPath, 'utf-8');
    return extractContent(content);
  } catch (error) {
    console.warn(`Warning: Could not read ${filePath}:`, error.message);
    return '';
  }
}

// Build search records with proper structure for Algolia
function buildRecords() {
  const records = [];

  // Add documentation pages
  docsPages.forEach((page) => {
    const content = readMarkdownFile(page.file);
    
    // For design-system, truncate more aggressively to stay under 10KB limit
    // The record size includes metadata (objectID, title, url, category, type, hierarchy)
    // So we need to leave room for that (~500-1000 bytes)
    // JSON stringification adds overhead, so we use 7500 for design-system to be safe
    const maxContentLength = page.title === 'Design System' ? 7500 : 9000;
    
    records.push({
      objectID: page.url.replace(/\//g, '_').replace(/^_/, ''), // Convert URL to valid objectID
      title: page.title,
      url: page.url,
      category: page.category,
      content: content.substring(0, maxContentLength), // Truncate to stay under 10KB total record size
      type: 'documentation',
      // Hierarchy for better search results
      hierarchy: {
        lvl0: page.category,
        lvl1: page.title,
      },
    });
  });

  // Add component pages
  componentPages.forEach((page) => {
    // Try to read the component's .astro file for better content
    const astroPath = `src/pages${page.url}.astro`;
    let content = page.description || `Documentation for ${page.title} component. Learn how to use ${page.title} in your projects.`;
    
    // Try to extract content from .astro file if it exists
    try {
      const fullPath = join(rootDir, astroPath);
      if (existsSync(fullPath)) {
        const astroContent = readFileSync(fullPath, 'utf-8');
        // Extract text content from Astro file (remove frontmatter, HTML tags, code blocks)
        let extracted = astroContent
          .replace(/^---[\s\S]*?---/g, '') // Remove frontmatter
          .replace(/<script[\s\S]*?<\/script>/gi, '') // Remove script tags
          .replace(/<style[\s\S]*?<\/style>/gi, '') // Remove style tags
          .replace(/<[^>]+>/g, ' ') // Remove HTML tags
          .replace(/```[\s\S]*?```/g, '') // Remove code blocks
          .replace(/`[^`]+`/g, '') // Remove inline code
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();
        
        if (extracted.length > 100) {
          // Use extracted content if substantial, otherwise use description
          content = `${page.description} ${extracted.substring(0, 500)}`;
        }
      }
    } catch (error) {
      // If file doesn't exist or can't be read, use description
      // This is fine, we'll use the description
    }
    
    records.push({
      objectID: page.url.replace(/\//g, '_').replace(/^_/, ''),
      title: page.title,
      url: page.url,
      category: page.category,
      content: content.substring(0, 10000),
      type: 'component',
      hierarchy: {
        lvl0: page.category,
        lvl1: page.title,
      },
    });
  });

  // Add theme pages
  themePages.forEach((page) => {
    // Try to read the theme's .astro file for better content
    const astroPath = `src/pages${page.url}.astro`;
    let content = `Theme documentation for ${page.title}. Customize your design system with ${page.title} theme.`;
    
    // Try to extract content from .astro file if it exists
    try {
      const fullPath = join(rootDir, astroPath);
      if (existsSync(fullPath)) {
        const astroContent = readFileSync(fullPath, 'utf-8');
        // Extract text content from Astro file
        let extracted = astroContent
          .replace(/^---[\s\S]*?---/g, '') // Remove frontmatter
          .replace(/<script[\s\S]*?<\/script>/gi, '') // Remove script tags
          .replace(/<style[\s\S]*?<\/style>/gi, '') // Remove style tags
          .replace(/<[^>]+>/g, ' ') // Remove HTML tags
          .replace(/```[\s\S]*?```/g, '') // Remove code blocks
          .replace(/`[^`]+`/g, '') // Remove inline code
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();
        
        if (extracted.length > 50) {
          content = `${content} ${extracted.substring(0, 500)}`;
        }
      }
    } catch (error) {
      // If file doesn't exist or can't be read, use default description
    }
    
    records.push({
      objectID: page.url.replace(/\//g, '_').replace(/^_/, ''),
      title: page.title,
      url: page.url,
      category: page.category,
      content: content.substring(0, 10000),
      type: 'theme',
      hierarchy: {
        lvl0: page.category,
        lvl1: page.title,
      },
    });
  });

  return records;
}

// Upload to Algolia using JavaScript API v5
async function uploadToAlgolia(records) {
  try {
    // Import algoliasearch v5 (named import)
    const { algoliasearch } = await import('algoliasearch');
    
    // Initialize Algolia client
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

    // console.log(`Uploading ${records.length} records to Algolia index: ${ALGOLIA_INDEX_NAME}...`);
    // console.log('Processing records...\n');
    
    // Save objects using v5 API
    const response = await client.saveObjects({
      indexName: ALGOLIA_INDEX_NAME,
      objects: records,
    });

    // console.log('✓ Successfully indexed documentation to Algolia!');
    // console.log(`\nIndex name: ${ALGOLIA_INDEX_NAME}`);
    // console.log(`Records uploaded: ${records.length}`);
    // console.log(`Task ID: ${response.taskID}`);
    // console.log('\nNext steps:');
    // console.log('1. Configure your Algolia index settings in the Algolia dashboard');
    // console.log('2. The Search component will automatically use Algolia if env vars are set');
    // console.log('3. Verify your index in the Algolia dashboard');
  } catch (error) {
    console.error('Error uploading to Algolia:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
    console.error('\nMake sure you have:');
    console.error('1. Installed algoliasearch: pnpm add algoliasearch');
    console.error('2. Set correct ALGOLIA_APP_ID and ALGOLIA_ADMIN_KEY in .env');
    console.error('3. The Admin API key has write permissions');
    console.error('4. The index name is correct');
    process.exit(1);
  }
}

// Main function
async function main() {
  // console.log('Building search index...\n');
  
  const records = buildRecords();
  
  // console.log(`Found ${records.length} pages to index\n`);
  
  if (records.length === 0) {
    console.error('No records to index. Check your documentation structure.');
    process.exit(1);
  }

  await uploadToAlgolia(records);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
