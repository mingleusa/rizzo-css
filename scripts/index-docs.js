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
  { title: 'Colors', url: '/docs/colors', file: 'docs/COLORS.md', category: 'Reference' },
  { title: 'Components', url: '/docs/components', file: 'docs/COMPONENTS.md', category: 'Components' },
  { title: 'Accessibility', url: '/docs/accessibility', file: 'docs/ACCESSIBILITY.md', category: 'Documentation' },
];

const componentPages = [
  { title: 'Navbar', url: '/docs/components/navbar', category: 'Components' },
  { title: 'Settings', url: '/docs/components/settings', category: 'Components' },
  { title: 'Theme Switcher', url: '/docs/components/theme-switcher', category: 'Components' },
  { title: 'Button', url: '/docs/components/button', category: 'Components' },
  { title: 'Icons', url: '/docs/components/icons', category: 'Components' },
  { title: 'CopyToClipboard', url: '/docs/components/copy-to-clipboard', category: 'Components' },
  { title: 'Forms', url: '/docs/components/forms', category: 'Components' },
  { title: 'Cards', url: '/docs/components/cards', category: 'Components' },
  { title: 'Modal', url: '/docs/components/modal', category: 'Components' },
  { title: 'Alert', url: '/docs/components/alert', category: 'Components' },
];

const themePages = [
  { title: 'Dracula At Night', url: '/docs/themes/dracula-at-night', category: 'Themes' },
  { title: 'Shades of Purple', url: '/docs/themes/shades-of-purple', category: 'Themes' },
  { title: 'Night Owl', url: '/docs/themes/night-owl', category: 'Themes' },
  { title: 'Winter is Coming', url: '/docs/themes/winter-is-coming-dark-black', category: 'Themes' },
  { title: 'Nord Light', url: '/docs/themes/nord-light', category: 'Themes' },
  { title: 'Grey Light Pro', url: '/docs/themes/grey-light-pro', category: 'Themes' },
  { title: 'Snazzy Light', url: '/docs/themes/snazzy-light', category: 'Themes' },
  { title: 'Tiny Light', url: '/docs/themes/tiny-light', category: 'Themes' },
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
    records.push({
      objectID: page.url.replace(/\//g, '_').replace(/^_/, ''), // Convert URL to valid objectID
      title: page.title,
      url: page.url,
      category: page.category,
      content: content.substring(0, 10000), // Increased limit for better search
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
    records.push({
      objectID: page.url.replace(/\//g, '_').replace(/^_/, ''),
      title: page.title,
      url: page.url,
      category: page.category,
      content: `Documentation for ${page.title} component. Learn how to use ${page.title} in your projects.`,
      type: 'component',
      hierarchy: {
        lvl0: page.category,
        lvl1: page.title,
      },
    });
  });

  // Add theme pages
  themePages.forEach((page) => {
    records.push({
      objectID: page.url.replace(/\//g, '_').replace(/^_/, ''),
      title: page.title,
      url: page.url,
      category: page.category,
      content: `Theme documentation for ${page.title}. Customize your design system with ${page.title} theme.`,
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

    console.log(`Uploading ${records.length} records to Algolia index: ${ALGOLIA_INDEX_NAME}...`);
    console.log('Processing records...\n');
    
    // Save objects using v5 API
    const response = await client.saveObjects({
      indexName: ALGOLIA_INDEX_NAME,
      objects: records,
    });

    console.log('✓ Successfully indexed documentation to Algolia!');
    console.log(`\nIndex name: ${ALGOLIA_INDEX_NAME}`);
    console.log(`Records uploaded: ${records.length}`);
    console.log(`Task ID: ${response.taskID}`);
    console.log('\nNext steps:');
    console.log('1. Configure your Algolia index settings in the Algolia dashboard');
    console.log('2. The Search component will automatically use Algolia if env vars are set');
    console.log('3. Verify your index in the Algolia dashboard');
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
  console.log('Building search index...\n');
  
  const records = buildRecords();
  
  console.log(`Found ${records.length} pages to index\n`);
  
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
