# React Course Architecture

## Executive Summary

This project implements a **Hub-and-Spoke** monorepo architecture for an interactive React course built with Slidev and Sandpack. Each module is an independent presentation that loads lazily, ensuring optimal performance and maintainability.

## Key Features

- 🎯 **Modular Design** - Independent presentations with shared infrastructure
- 🔥 **Live Code Editors** - Browser-based React execution via Sandpack
- 📦 **Lazy Loading** - Each module loads only when accessed
- 🚀 **Production Ready** - Automated build pipeline and GitHub Pages deployment
- 🎨 **Consistent Theming** - Shared components and styling across all modules

## Directory Structure

```
react-course/
├── common/                      # Shared infrastructure
│   ├── components/
│   │   └── LiveReact.vue       # Live React editor wrapper
│   ├── setup/
│   │   └── main.ts             # Global component registration
│   └── theme/
│       └── style.css           # Shared styling
│
├── slides/                      # Presentation modules
│   ├── 00-hub/                 # Navigation hub
│   │   ├── slides.md
│   │   ├── setup/
│   │   │   └── main.ts
│   │   └── package.json
│   │
│   ├── 01-fundamentals/        # Module 1: Fundamentals
│   │   ├── slides.md
│   │   ├── components/
│   │   │   └── LiveReact.vue  # Local import wrapper
│   │   ├── setup/
│   │   │   └── main.ts
│   │   └── package.json
│   │
│   └── 02-hooks/               # Module 2: Hooks
│       ├── slides.md
│       ├── components/
│       ├── setup/
│       └── package.json
│
├── scripts/
│   └── build.mjs               # Multi-deck build orchestrator
│
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated deployment
│
├── pnpm-workspace.yaml         # Monorepo configuration
└── package.json                # Root workspace config
```

## Technology Stack

### Core Technologies

- **[Slidev](https://sli.dev/)** - Vue-based presentation framework powered by Vite
- **[Sandpack](https://sandpack.codesandbox.io/)** - Browser-based bundler for live code execution
- **[sandpack-vue3](https://www.npmjs.com/package/sandpack-vue3)** - Vue 3 wrapper for Sandpack React components
- **[pnpm](https://pnpm.io/)** - Efficient package manager with workspace support

### Why This Stack?

1. **Slidev + Vite**: Near-instant HMR during development, native ES Modules support
2. **Sandpack**: Isolated browser-based execution environment, automatic npm dependency resolution
3. **Vue + React Coexistence**: Host runs Vue (Slidev), guest runs React (Sandpack iframe)
4. **Monorepo**: Share components while maintaining independent deployable units

## Architecture Patterns

### 1. The Vue-React Bridge

The course teaches React but runs on Vue (Slidev). We solve this using **Island Architecture**:

```
┌─────────────────────────────────────┐
│  Slidev (Vue Host)                  │
│  ┌───────────────────────────────┐  │
│  │ <LiveReact>                   │  │
│  │   ┌─────────────────────────┐ │  │
│  │   │ Sandpack (Iframe)       │ │  │
│  │   │   - React Runtime       │ │  │
│  │   │   - Browser Bundler     │ │  │
│  │   │   - NPM Resolution      │ │  │
│  │   └─────────────────────────┘ │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Benefits:**
- Host and guest are completely isolated
- Student errors don't crash the presentation
- Dynamic dependency loading from npm
- No build-time JSX transpilation needed

### 2. Hub-and-Spoke Navigation

```
                    ┌──────────┐
                    │   Hub    │
                    │    /     │
                    └────┬─────┘
                         │
          ┌──────────────┼──────────────┐
          │              │              │
    ┌─────▼─────┐  ┌─────▼─────┐  ┌────▼──────┐
    │ Module 1  │  │ Module 2  │  │ Module 3  │
    │/01-.../   │  │/02-.../   │  │/03-.../   │
    └───────────┘  └───────────┘  └───────────┘
```

**Key Characteristics:**
- Hard navigation (not SPA routing) between modules
- Each module is a separate Slidev app
- Memory footprint: only active module loaded
- Hub deployed at `/`, modules at `/<name>/`

### 3. Component Sharing Strategy

Each module gets the shared `LiveReact` component via a local wrapper:

```vue
<!-- slides/01-fundamentals/components/LiveReact.vue -->
<script setup>
import LiveReactComponent from '../../../common/components/LiveReact.vue'
defineProps({ code: String, dependencies: Object, ... })
</script>

<template>
  <LiveReactComponent v-bind="props" />
</template>
```

This approach:
- ✅ Makes `<LiveReact>` available in Markdown without imports
- ✅ Centralizes configuration (theme, React version, etc.)
- ✅ Allows per-module customization if needed
- ✅ Maintains Vite's ability to resolve components

## Build Pipeline

### Development

```bash
# Start the Hub
pnpm dev:hub

# Start Module 1
pnpm dev:fundamentals

# Start Module 2
pnpm dev:hooks
```

Each module runs on a separate port with independent hot reload.

### Production Build

The `scripts/build.mjs` orchestrator:

1. **Discovers** all slide decks in `slides/`
2. **Builds Hub** with `--base /` → outputs to `dist/`
3. **Builds Modules** with `--base /<name>/` → outputs to `dist/<name>/`
4. **Creates** `.nojekyll` for GitHub Pages
5. **Generates** deployment README

```bash
pnpm run build
```

**Output:**
```
dist/
├── index.html              # Hub
├── assets/                 # Hub assets
├── 01-fundamentals/
│   ├── index.html
│   └── assets/
└── 02-hooks/
    ├── index.html
    └── assets/
```

### Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. Triggers on push to `main`
2. Installs dependencies with pnpm
3. Runs `pnpm run build`
4. Uploads `dist/` to GitHub Pages
5. Deploys to `https://<username>.github.io/<repo>/`

**Important:** If deploying to a project page (not custom domain), update base paths:
- Hub: `--base /react-course/`
- Module 1: `--base /react-course/01-fundamentals/`

## The LiveReact Component

### Purpose

Wraps Sandpack with sensible defaults for teaching React.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | String | Basic counter | React code to execute |
| `dependencies` | Object | `{}` | npm packages: `{ "lodash": "^4.0.0" }` |
| `theme` | String | `'dark'` | Editor theme |
| `editorHeight` | String/Number | `'500px'` | Editor height |
| `showLineNumbers` | Boolean | `true` | Show line numbers |
| `showInlineErrors` | Boolean | `true` | Show inline errors |
| `showTabs` | Boolean | `false` | Show file tabs |

### Usage in Slides

```markdown
---
layout: default
---

# Live Demo: Counter

<LiveReact :code="\`import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}\`" />
```

**Important:** Use backticks with `\`` for multiline strings in Markdown.

## Pedagogical Principles

### 1. Minimize Cognitive Load

- Pre-fill editors with working code
- Focus on **delta** (what changed) not boilerplate
- Use semantic variable names
- Keep examples small and focused

### 2. Immediate Feedback

- Live preview updates on every keystroke
- Inline errors show syntax mistakes
- Console logs visible in preview

### 3. Progressive Complexity

- Module 1: JSX, components, props
- Module 2: Hooks, state, effects
- Module 3: Advanced patterns
- Module 4: Ecosystem (router, state management)

### 4. Safe Experimentation

- Sandpack isolation prevents crashes
- Reset button available
- Multiple examples per concept

## Performance Considerations

### Bundle Size

- **Hub**: ~500KB (Slidev + Vue runtime)
- **Module with LiveReact**: ~2MB (adds Sandpack + React)
- **Lazy Loading**: Only active module loads

### Optimization Strategies

1. **Async Component Loading**
   ```vue
   const LiveReact = defineAsyncComponent(() =>
     import('./components/LiveReact.vue')
   )
   ```

2. **Conditional Sandpack**
   Only load Sandpack on slides that use it:
   ```vue
   <LiveReact v-if="$slidev.nav.currentPage > 5" />
   ```

3. **Shared Dependencies**
   React/ReactDOM loaded once by Sandpack, cached by browser

## Extending the Course

### Adding a New Module

1. **Create directory**:
   ```bash
   mkdir -p slides/03-advanced/{setup,components}
   ```

2. **Add package.json**:
   ```json
   {
     "name": "@react-course/advanced",
     "version": "1.0.0",
     "private": true,
     "scripts": {
       "dev": "slidev slides.md --port 3033"
     }
   }
   ```

3. **Create setup/main.ts**:
   ```ts
   import sharedSetup from '../../../common/setup/main'
   export default sharedSetup
   ```

4. **Add local LiveReact wrapper** (copy from existing module)

5. **Create slides.md** with frontmatter

6. **Update Hub** (`slides/00-hub/slides.md`) to link to new module

7. **Update root package.json**:
   ```json
   "scripts": {
     "dev:advanced": "cd slides/03-advanced && slidev slides.md --port 3033"
   }
   ```

8. **Build script auto-discovers** the new module

### Adding External Dependencies

To teach a React library (e.g., `framer-motion`):

```vue
<LiveReact
  :code="`import { motion } from 'framer-motion';

export default function App() {
  return (
    <motion.div animate={{ rotate: 360 }}>
      Spinning!
    </motion.div>
  );
}`"
  :dependencies="{ 'framer-motion': '^11.0.0' }"
/>
```

Sandpack fetches from npm automatically.

## Troubleshooting

### Issue: Components not found in slides

**Solution**: Ensure each module has:
- `components/LiveReact.vue` (local wrapper)
- `setup/main.ts` (imports shared setup)

### Issue: Base paths broken in production

**Solution**: Verify build script uses correct paths:
- Hub: `--base /`
- Modules: `--base /<module-name>/`

For GitHub project pages, prefix all with repo name.

### Issue: Sandpack dependencies not loading

**Solution**:
- Check package name/version validity
- Some packages don't work in browsers (e.g., `fs`, `child_process`)
- Use browser-compatible alternatives

### Issue: Vite build errors

**Solution**:
- Clear `node_modules` and reinstall: `pnpm install`
- Check Node version (use v18+)
- Verify all `setup/main.ts` files are valid

## Best Practices

### 1. Content Organization

- Keep slides focused (one concept per slide)
- Use `<v-click>` for progressive disclosure
- Add navigation hints in footers

### 2. Code Examples

- Always provide working code, not pseudocode
- Include comments for complex logic
- Use realistic variable names
- Keep examples under 50 lines

### 3. Accessibility

- Use high-contrast themes
- Include text descriptions of interactive demos
- Provide keyboard navigation hints

### 4. Git Workflow

- Keep `dist/` in `.gitignore` (built by CI)
- Commit only source files
- Use conventional commits
- Tag releases

## Future Enhancements

### Planned Features

- [ ] Module progress tracking with localStorage
- [ ] Checkmarks on completed modules in Hub
- [ ] Embedded quizzes with instant feedback
- [ ] Code challenge slides
- [ ] Speaker notes for instructors
- [ ] Export to PDF (via Slidev CLI)
- [ ] Dark/light theme toggle

### Advanced Integrations

- WebContainers for full Node.js environment
- Next.js examples (when Sandpack supports it)
- TypeScript mode with live type checking
- Integration with LMS platforms

## References

### Documentation

- [Slidev Docs](https://sli.dev/)
- [Sandpack Docs](https://sandpack.codesandbox.io/)
- [sandpack-vue3](https://github.com/jerrywu001/sandpack-vue3)
- [pnpm Workspaces](https://pnpm.io/workspaces)

### Academic Context

This architecture implements principles from:
- "The Presentation-IDE Hybrid" pattern
- Cognitive Load Theory (Sweller)
- Active Learning pedagogy
- Immediate Feedback principle

## License

This courseware architecture is open source. Modify and extend as needed for your educational context.

---

**Built with ❤️ using Slidev, Vue, and React**
