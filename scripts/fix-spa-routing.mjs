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
 * Creates a 404.html with redirect script for SPA routing
 */
function create404RedirectScript(basePath = '') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <script>
    // Single Page Apps for GitHub Pages
    // https://github.com/rafgraph/spa-github-pages
    // This script takes the current url and converts the path and query
    // string into just a query string, and then redirects the browser
    // to the new url with only a query string and hash fragment

    // Get the current path
    var pathSegmentsToKeep = ${basePath ? basePath.split('/').filter(Boolean).length : 0};

    var l = window.location;
    var newUrl = l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
      l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash;

    // Redirect to index.html with the path encoded in the query string
    window.location.replace(newUrl);
  </script>
</head>
<body>
  <p>Redirecting to the application...</p>
</body>
</html>`;
}

/**
 * Add redirect script to index.html to handle the encoded route
 */
function getIndexRedirectScript() {
  return `  <!-- Single Page Apps for GitHub Pages -->
  <script>
    // This script checks to see if a redirect is present in the query string,
    // converts it back into the correct url and adds it to the
    // browser's history using window.history.replaceState(...),
    // which won't cause the browser to attempt to load the new url.
    (function(l) {
      if (l.search[1] === '/' ) {
        var decoded = l.search.slice(1).split('&').map(function(s) {
          return s.replace(/~and~/g, '&')
        }).join('?');
        window.history.replaceState(null, null,
            l.pathname.slice(0, -1) + decoded + l.hash
        );
      }
    }(window.location))
  </script>
`;
}

/**
 * Process a single deck directory
 */
function processDeck(deckPath, basePath = '') {
  console.log(`Processing ${deckPath}...`);

  // Create 404.html with redirect
  const html404Path = path.join(deckPath, '404.html');
  const html404Content = create404RedirectScript(basePath);
  fs.writeFileSync(html404Path, html404Content, 'utf8');
  console.log(`  ✅ Created 404.html with redirect`);

  // Add redirect script to index.html
  const indexPath = path.join(deckPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf8');

    // Add the script right after <head> tag if not already present
    if (!indexContent.includes('Single Page Apps for GitHub Pages')) {
      indexContent = indexContent.replace(
        /<head>/i,
        '<head>\n' + getIndexRedirectScript()
      );
      fs.writeFileSync(indexPath, indexContent, 'utf8');
      console.log(`  ✅ Added redirect handler to index.html`);
    }
  }
}

/**
 * Main function
 */
function main() {
  console.log('🔧 Fixing SPA routing for GitHub Pages...\n');

  const basePathPrefix = process.env.BASE_PATH || '';

  // Process root (hub)
  console.log('📂 Processing root (hub)...');
  processDeck(DIST, basePathPrefix);

  // Process subdirectories (module decks)
  const entries = fs.readdirSync(DIST);
  for (const entry of entries) {
    const deckPath = path.join(DIST, entry);
    if (fs.statSync(deckPath).isDirectory() && entry !== 'assets' && entry !== 'theme') {
      console.log(`\n📂 Processing ${entry}...`);
      processDeck(deckPath, basePathPrefix + '/' + entry);
    }
  }

  console.log('\n✨ SPA routing fix complete!');
}

main();
