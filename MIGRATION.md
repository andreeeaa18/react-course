# Migration to Hub-and-Spoke Architecture

This document explains what changed in the transition to the new monorepo architecture.

## What Was Removed

### Old Files and Folders
- ❌ `components/` - Old Veaury-based components
- ❌ `pages/` - Old single-deck slide files
- ❌ `snippets/` - Old external snippets
- ❌ `slides.md` - Old root slides file
- ❌ `netlify.toml` - Replaced by GitHub Actions
- ❌ `vercel.json` - No longer needed
- ❌ `SANDPACK_GUIDE.md` - Replaced by new docs

### Why These Were Removed
The old structure used:
- **Veaury** to bridge React components into Vue (complex, limited)
- **Single deck** approach with pages (not modular)
- **Manual build scripts** for each topic (not scalable)

## What Was Added

### New Structure
```
react-course/
├── common/                  # ✨ Shared infrastructure
│   ├── components/
│   │   └── LiveReact.vue   # Sandpack wrapper
│   ├── setup/
│   │   └── main.ts         # Global component registration
│   └── theme/
│       └── style.css       # Shared styling
│
├── slides/                  # ✨ Modular presentations
│   ├── 00-hub/             # Navigation hub
│   ├── 01-fundamentals/    # Module 1
│   └── 02-hooks/           # Module 2
│
├── scripts/
│   └── build.mjs           # ✨ Multi-deck build orchestrator
│
└── .github/workflows/
    └── deploy.yml          # ✨ Automated deployment
```

### New Components

#### LiveReact Component
**Location:** `common/components/LiveReact.vue`

**Old way (Veaury):**
```vue
<SandpackBridge template="react" :files="..." />
```

**New way (sandpack-vue3):**
```vue
<LiveReact :code="`...`" :dependencies="{}" />
```

**Benefits:**
- ✅ Native sandpack-vue3 integration
- ✅ Cleaner API with sensible defaults
- ✅ Centralized configuration
- ✅ Better error isolation

### New Scripts

#### Development
**Old:**
```json
"dev": "slidev slides.md --port 3002"
```

**New:**
```json
"dev:hub": "cd slides/00-hub && slidev slides.md --port 3030",
"dev:fundamentals": "cd slides/01-fundamentals && slidev slides.md --port 3031",
"dev:hooks": "cd slides/02-hooks && slidev slides.md --port 3032"
```

**Benefits:**
- ✅ Independent dev servers
- ✅ Hot reload per module
- ✅ No port conflicts

#### Build
**Old:**
```json
"build": "slidev build slides.md --out dist"
```

**New:**
```json
"build": "node scripts/build.mjs"
```

The new build script:
- ✅ Automatically discovers all modules
- ✅ Builds each with correct base path
- ✅ Creates unified dist/ directory
- ✅ Adds deployment artifacts (.nojekyll)

## Key Architecture Changes

### 1. From Veaury to sandpack-vue3

**Old approach:**
- Used Veaury to wrap React components
- Required pre-built React components
- Complex setup with manual compilation

**New approach:**
- Uses sandpack-vue3 (official Vue wrapper)
- Sandpack runs in iframe (isolated)
- Code is passed as strings (dynamic)
- Browser-based bundling

### 2. From Single Deck to Hub-and-Spoke

**Old approach:**
- One slides.md with all content
- Pages imported via iframe
- Heavy initial load
- Difficult to navigate

**New approach:**
- Hub at root (/)
- Modules at /<name>/
- Hard navigation between modules
- Lazy loading (only active module loads)

### 3. From Manual to Automated Builds

**Old approach:**
```bash
npm run build:hub
npm run build:topic-a
npm run build:topic-b
```

**New approach:**
```bash
pnpm run build
# Automatically discovers and builds all modules
```

## Migration Checklist

If you're migrating existing content:

- [ ] Move slides to `slides/0X-name/slides.md`
- [ ] Create `package.json` for each module
- [ ] Add `setup/main.ts` importing shared setup
- [ ] Add `components/LiveReact.vue` wrapper
- [ ] Update Hub links to new modules
- [ ] Replace old components with `<LiveReact>`
- [ ] Test dev servers for each module
- [ ] Run build script and verify output
- [ ] Update GitHub repo settings for Actions

## Component Migration

### Old Component Usage
```vue
<!-- Old: Using Veaury bridge -->
<SandpackBridge
  template="react"
  :files="{
    '/App.js': `code here`
  }"
  :options="{ showLineNumbers: true }"
/>
```

### New Component Usage
```vue
<!-- New: Using LiveReact wrapper -->
<LiveReact :code="`
import React from 'react';

export default function App() {
  return <h1>Hello!</h1>;
}
`" />
```

**Simpler and cleaner!**

## Dependencies Changed

### Removed
- `veaury` - No longer needed
- `@codesandbox/sandpack-react` - Not used directly
- Old React versions (19.x was overkill)

### Added
- `sandpack-vue3` - Official Vue 3 wrapper for Sandpack

### Kept
- `@slidev/cli` - Core presentation engine
- `vue` - Required by Slidev
- `slidev-theme-neversink` - Theme

## Benefits of New Architecture

### For Developers
- ✅ Easier to add new modules
- ✅ Better code organization
- ✅ Shared components without duplication
- ✅ Faster hot reload (per module)
- ✅ Automated builds

### For Students
- ✅ Faster load times (lazy loading)
- ✅ Better navigation (Hub system)
- ✅ More stable (isolated execution)
- ✅ Consistent experience across modules

### For Instructors
- ✅ Modular curriculum design
- ✅ Easy to update individual topics
- ✅ Reusable course components
- ✅ Professional deployment pipeline

## Deployment Changes

### Old Deployment
Manual builds to Netlify/Vercel with custom config files.

### New Deployment
Automated GitHub Actions workflow:
1. Push to main
2. GitHub Actions builds all modules
3. Deploys to GitHub Pages
4. Done!

**No manual intervention required.**

## Troubleshooting Migration Issues

### Issue: Old components not working
**Solution:** Replace with `<LiveReact>` component

### Issue: Missing dependencies
**Solution:** Run `pnpm install`

### Issue: Build errors
**Solution:** Check that each module has:
- `setup/main.ts`
- `components/LiveReact.vue`
- Valid `slides.md`

### Issue: Navigation broken
**Solution:** Update Hub links to match module names

## Next Steps

1. Read [QUICKSTART.md](./QUICKSTART.md) for setup
2. Read [README.md](./README.md) for usage
3. Read [ARCHITECTURE.md](./ARCHITECTURE.md) for details
4. Start creating content in `slides/`

---

**Welcome to the new architecture!** 🎉
