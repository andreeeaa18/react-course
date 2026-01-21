# Quick Start Guide

Get your React course up and running in 5 minutes!

## Step 1: Install Dependencies

Install all dependencies (sandpack-vue3 is already in package.json):

```bash
pnpm install
```

## Step 2: Start Development

Launch the Hub to see the course navigation:

```bash
pnpm dev:hub
```

Open [http://localhost:3030](http://localhost:3030) in your browser.

## Step 3: Start a Module

In a new terminal, start Module 1:

```bash
pnpm dev:fundamentals
```

Open [http://localhost:3031](http://localhost:3031) to see the module.

## Step 4: Navigate Between Modules

From the Hub, click on any module card. The links point to:
- `/01-fundamentals/` → http://localhost:3031
- `/02-hooks/` → http://localhost:3032

**Note:** In development, you need to start each module's dev server for the links to work. In production, all modules are built into a single `dist/` directory.

## Step 5: Edit Content

Edit any `slides.md` file and see instant hot reload:

```bash
# Example: Edit Module 1
code slides/01-fundamentals/slides.md
```

The changes appear immediately in your browser.

## Testing the LiveReact Component

Add this to any slide to test the live code editor:

```markdown
<LiveReact :code="\`import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Click me!
      </button>
    </div>
  );
}\`" />
```

## Building for Production

```bash
# Build all modules
pnpm run build

# Preview the build
pnpm run preview
```

Open [http://localhost:3000](http://localhost:3000) to see the production build.

## Common Issues

### Issue: "Cannot find module 'sandpack-vue3'"

**Solution:** Install the missing dependency:
```bash
pnpm install sandpack-vue3
```

### Issue: Module links don't work in development

**Solution:** Each module needs its own dev server running:
```bash
# Terminal 1
pnpm dev:hub

# Terminal 2
pnpm dev:fundamentals

# Terminal 3
pnpm dev:hooks
```

Or update the Hub links to point to the correct ports during development.

### Issue: LiveReact component not found

**Solution:** Ensure each module has:
1. `components/LiveReact.vue` (local wrapper)
2. `setup/main.ts` (imports shared setup)

### Issue: Build fails

**Solution:**
1. Check that all `slides.md` files are valid
2. Ensure `sandpack-vue3` is installed
3. Try clearing node_modules and reinstalling:
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

## Next Steps

- Read [README.md](./README.md) for complete usage guide
- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
- Add your own modules following the patterns
- Deploy to GitHub Pages

## Useful Commands

```bash
# Development
pnpm dev:hub           # Start Hub
pnpm dev:fundamentals  # Start Module 1
pnpm dev:hooks         # Start Module 2

# Production
pnpm run build         # Build all modules
pnpm run preview       # Preview production build

# Adding a new module (example)
mkdir -p slides/03-advanced/{setup,components}
# Then follow the structure from existing modules
```

## Tips

1. **Hot Reload**: Changes to `.md` files appear instantly
2. **Component Changes**: Changes to `.vue` components also hot reload
3. **Shared Components**: Edit `common/components/LiveReact.vue` to change all modules
4. **Styling**: Edit `common/theme/style.css` for global styles
5. **Build Script**: Automatically discovers new modules in `slides/`

---

Ready to build your course? Start editing the slides!
