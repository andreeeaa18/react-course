#!/usr/bin/env node

/**
 * Fix SPA Routing for GitHub Pages
 *
 * GitHub Pages doesn't natively support client-side routing (SPAs).
 * This script creates a 404.html redirect mechanism that preserves the route
 * and redirects to index.html, allowing Vue Router to handle the routing.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

/**
 * Process a single deck directory
 */
function processDeck(deckPath) {
  console.log(`Processing ${deckPath}...`);

  // For subdirectories, make 404.html a copy of index.html
  // This ensures the SPA router loads properly
  const indexPath = path.join(deckPath, 'index.html');
  const html404Path = path.join(deckPath, '404.html');

  if (fs.existsSync(indexPath)) {
    // Simply copy index.html to 404.html
    // This is the most reliable solution for GitHub Pages + SPA
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    fs.writeFileSync(html404Path, indexContent, 'utf8');
    console.log(`  ✅ Created 404.html (copy of index.html)`);
  } else {
    console.log(`  ⚠️  index.html not found, skipping 404.html creation`);
  }
}

/**
 * Main function
 */
function main() {
  console.log('🔧 Fixing SPA routing for GitHub Pages...\n');

  // Process root (hub)
  console.log('📂 Processing root (hub)...');
  processDeck(DIST);

  // Process subdirectories (module decks)
  const entries = fs.readdirSync(DIST);
  for (const entry of entries) {
    const deckPath = path.join(DIST, entry);
    if (fs.statSync(deckPath).isDirectory() && entry !== 'assets' && entry !== 'theme') {
      console.log(`\n📂 Processing ${entry}...`);
      processDeck(deckPath);
    }
  }

  console.log('\n✨ SPA routing fix complete!');
}

main();
