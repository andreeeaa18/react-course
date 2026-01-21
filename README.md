# React Course - Interactive Learning Platform

A modern, interactive React course built with Slidev and Sandpack. Learn React by writing and running code directly in your browser.

## ✨ Features

- 🔥 **Live Code Editors** - Write and execute React code in real-time
- 📦 **Browser-Based** - No local setup required, everything runs in the browser
- 🎯 **Modular Architecture** - Independent presentations with lazy loading
- 🚀 **Production Ready** - Automated builds and GitHub Pages deployment
- 🎨 **Beautiful UI** - Powered by Slidev with custom React theming
- 📚 **Comprehensive** - From fundamentals to advanced patterns

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm 9+ (install with `npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd react-course

# Install dependencies
pnpm install
```

### Development

Start individual modules during development:

```bash
# Start the Hub (navigation)
pnpm dev:hub

# Start Module 1: Fundamentals
pnpm dev:fundamentals

# Start Module 2: Hooks
pnpm dev:hooks
```

Each module runs on a separate port:
- Hub: [http://localhost:3030](http://localhost:3030)
- Fundamentals: [http://localhost:3031](http://localhost:3031)
- Hooks: [http://localhost:3032](http://localhost:3032)

### Production Build

Build all presentations for deployment:

```bash
# Build all modules
pnpm run build

# Preview the built site
pnpm run preview
```

The build output is in the `dist/` directory, ready for deployment to any static hosting service.

## 📖 Course Structure

### Module 0: Hub
**Navigation and Table of Contents**
- Course overview
- Module selection
- Navigation instructions

### Module 1: React Fundamentals
**Learn the Basics**
- What is React?
- Your first component
- JSX syntax
- Props and composition
- Interactive counter example

### Module 2: React Hooks
**Master State and Effects**
- Introduction to Hooks
- useState for state management
- useEffect for side effects
- Custom hooks
- Practical examples (timer, todo list)

### Coming Soon
- **Module 3**: Advanced Patterns
- **Module 4**: React Ecosystem (Router, State Management)

## 🏗️ Architecture

This project uses a **Hub-and-Spoke monorepo architecture**:

```
react-course/
├── common/              # Shared components and setup
├── slides/              # Individual presentation modules
│   ├── 00-hub/         # Navigation hub
│   ├── 01-fundamentals/
│   ├── 02-hooks/
│   └── ...
├── scripts/            # Build automation
└── .github/workflows/  # CI/CD
```

Each module is an independent Slidev presentation that loads lazily for optimal performance.

**Key Benefits:**
- 🎯 Only loads what you need
- 🔧 Easy to maintain and extend
- 📦 Shared components without duplication
- 🚀 Fast development with hot reload

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed technical documentation.

## 🎓 Using the Course

### As a Student

1. Navigate to the deployed course (or run locally)
2. Start with the Hub to see all available modules
3. Click on any module to begin learning
4. Interact with live code editors to experiment
5. Complete all slides in a module before moving to the next

### As an Instructor

1. Fork this repository
2. Customize the content in `slides/` directories
3. Add your own modules following the patterns
4. Deploy to GitHub Pages or your preferred host
5. Share the URL with your students

### Live Coding in Presentations

The `<LiveReact>` component lets you embed executable React code:

```markdown
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

Students can edit and run the code directly in the slide.

## 🛠️ Adding a New Module

1. **Create directory structure:**
   ```bash
   mkdir -p slides/03-advanced/{setup,components}
   ```

2. **Create `package.json`:**
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

3. **Create `setup/main.ts`:**
   ```typescript
   import sharedSetup from '../../../common/setup/main'
   export default sharedSetup
   ```

4. **Copy `components/LiveReact.vue`** from an existing module

5. **Create `slides.md`** with your content

6. **Update the Hub** to link to your new module

7. **Add dev script** to root `package.json`:
   ```json
   "dev:advanced": "cd slides/03-advanced && slidev slides.md --port 3033"
   ```

The build script will automatically discover and build your new module.

## 🌐 Deployment

### GitHub Pages (Recommended)

This repository includes automated deployment via GitHub Actions.

**Setup:**

1. Push your code to GitHub
2. Go to Settings → Pages
3. Source: "GitHub Actions"
4. The workflow will automatically build and deploy on push to `main`

**Custom Domain:**
- Add a `CNAME` file to `dist/` during build
- Configure DNS to point to GitHub Pages

### Other Platforms

The built `dist/` directory works with any static hosting:

- **Vercel**: `vercel --prod dist`
- **Netlify**: Drag and drop `dist/` folder
- **Cloudflare Pages**: Connect to GitHub repo
- **AWS S3**: Sync `dist/` to bucket

**Important:** Update base paths in `scripts/build.mjs` if not deploying to root.

## 🎨 Customization

### Theming

Edit `common/theme/style.css` to customize:
- Colors and branding
- Typography
- Slide layouts
- Component styling

Changes apply to all modules automatically.

### Code Editor Settings

Customize `LiveReact` defaults in `common/components/LiveReact.vue`:
- Theme (light/dark)
- Editor height
- Line numbers
- Inline errors
- Dependencies

### Slidev Configuration

Each module's `slides.md` supports full Slidev frontmatter:
```yaml
---
theme: neversink
transition: slide-left
layout: cover
---
```

See [Slidev docs](https://sli.dev/) for all options.

## 📚 Tech Stack

- **[Slidev](https://sli.dev/)** - Vue-based presentation framework
- **[Sandpack](https://sandpack.codesandbox.io/)** - Browser-based code bundler
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test locally with `pnpm dev:*`
5. Build to verify (`pnpm run build`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Content Contributions

We especially welcome:
- New modules or topics
- Improved examples
- Bug fixes in code samples
- Better explanations
- Accessibility improvements

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Slidev** team for the amazing presentation framework
- **CodeSandbox** team for Sandpack
- **React** team for the excellent documentation that inspired this course
- All contributors and students who use this course

## 📞 Support

- 📖 [Full Documentation](./ARCHITECTURE.md)
- 🐛 [Report Issues](https://github.com/your-username/react-course/issues)
- 💬 [Discussions](https://github.com/your-username/react-course/discussions)

## 🗺️ Roadmap

- [x] Hub-and-Spoke architecture
- [x] Live code editors with Sandpack
- [x] Module 1: Fundamentals
- [x] Module 2: Hooks
- [x] Automated builds
- [x] GitHub Pages deployment
- [ ] Module 3: Advanced Patterns
- [ ] Module 4: React Ecosystem
- [ ] Progress tracking
- [ ] Interactive quizzes
- [ ] TypeScript examples
- [ ] Mobile-responsive improvements

---

**Happy Learning! 🎉**

Built with ❤️ using Slidev, Vue, and React
